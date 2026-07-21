import { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/atoms/Button';

const SCAN_TIMEOUT_MS = 10_000;

const SCANNER_STATES = {
  IDLE: 'idle',
  REQUESTING: 'requesting',
  SCANNING: 'scanning',
  DETECTED: 'detected',
  ERROR: 'error',
  TIMEOUT: 'timeout',
};

export const BarcodeScanner = ({ isOpen, onClose, onDetect }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);
  const quaggaRef = useRef(null);
  const timeoutRef = useRef(null);

  const [status, setStatus] = useState(SCANNER_STATES.IDLE);
  const [errorMessage, setErrorMessage] = useState('');

  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (quaggaRef.current) {
      try {
        quaggaRef.current.stop();
      } catch {
        // ignore stop errors
      }
      quaggaRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    detectorRef.current = null;
  }, []);

  const handleClose = useCallback(() => {
    cleanup();
    setStatus(SCANNER_STATES.IDLE);
    setErrorMessage('');
    onClose();
  }, [cleanup, onClose]);

  const handleDetect = useCallback(
    (code) => {
      if (status === SCANNER_STATES.DETECTED) return;
      setStatus(SCANNER_STATES.DETECTED);
      cleanup();
      onDetect(code);
      handleClose();
    },
    [cleanup, handleClose, onDetect, status]
  );

  const startNativeDetector = useCallback(async () => {
    if (!videoRef.current || !streamRef.current) return;

    const BarcodeDetector = window.BarcodeDetector;
    detectorRef.current = new BarcodeDetector({
      formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a'],
    });

    setStatus(SCANNER_STATES.SCANNING);

    const scan = async () => {
      if (!videoRef.current || !detectorRef.current) return;
      try {
        const results = await detectorRef.current.detect(videoRef.current);
        if (results && results.length > 0) {
          const raw = results[0].rawValue;
          if (raw) {
            handleDetect(raw);
            return;
          }
        }
      } catch {
        // detection errors are expected while camera warms up
      }
      rafRef.current = requestAnimationFrame(scan);
    };

    rafRef.current = requestAnimationFrame(scan);
  }, [handleDetect]);

  const startQuaggaFallback = useCallback(async () => {
    try {
      const Quagga = await import('@ericblade/quagga2');
      const defaultQuagga = Quagga.default || Quagga;
      quaggaRef.current = defaultQuagga;

      if (!videoRef.current) return;

      await new Promise((resolve, reject) => {
        defaultQuagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: videoRef.current,
              constraints: {
                facingMode: 'environment',
              },
            },
            decoder: {
              readers: ['ean_reader', 'ean_8_reader', 'code_128_reader', 'code_39_reader', 'upc_reader'],
            },
            locator: {
              patchSize: 'medium',
              halfSample: true,
            },
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });

      setStatus(SCANNER_STATES.SCANNING);
      defaultQuagga.start();
      defaultQuagga.onDetected((result) => {
        const code = result?.codeResult?.code;
        if (code) {
          handleDetect(code);
        }
      });
    } catch (err) {
      setStatus(SCANNER_STATES.ERROR);
      setErrorMessage('No se pudo iniciar el lector de códigos. Intenta de nuevo.');
    }
  }, [handleDetect]);

  const startCamera = useCallback(async () => {
    cleanup();
    setStatus(SCANNER_STATES.REQUESTING);
    setErrorMessage('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      timeoutRef.current = setTimeout(() => {
        if (status !== SCANNER_STATES.DETECTED) {
          cleanup();
          setStatus(SCANNER_STATES.TIMEOUT);
          setErrorMessage('No se detectó ningún código.');
        }
      }, SCAN_TIMEOUT_MS);

      if ('BarcodeDetector' in window) {
        startNativeDetector();
      } else {
        startQuaggaFallback();
      }
    } catch (err) {
      setStatus(SCANNER_STATES.ERROR);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Permiso de cámara denegado. Habilita el acceso en la configuración de tu navegador e intenta de nuevo.');
      } else {
        setErrorMessage('No se pudo acceder a la cámara. Asegúrate de tener una cámara disponible.');
      }
    }
  }, [cleanup, startNativeDetector, startQuaggaFallback, status]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      cleanup();
      setStatus(SCANNER_STATES.IDLE);
      setErrorMessage('');
    }
    return cleanup;
  }, [isOpen, cleanup, startCamera]);

  const isLoading = status === SCANNER_STATES.REQUESTING;
  const isScanning = status === SCANNER_STATES.SCANNING;
  const isError = status === SCANNER_STATES.ERROR;
  const isTimeout = status === SCANNER_STATES.TIMEOUT;
  const isIdle = status === SCANNER_STATES.IDLE;

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className="w-full max-w-md rounded-2xl bg-secondary-800 p-6 shadow-xl border border-secondary-700"
          aria-modal="true"
        >
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-white">
              Escanear código de barras
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-secondary-700 transition-colors text-gray-400 hover:text-white"
              aria-label="Close scanner"
              type="button"
            >
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
            </button>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border border-secondary-700">
            {(isLoading || isIdle) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20">
                <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-300">Iniciando cámara...</p>
              </div>
            )}

            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              playsInline
              muted
              aria-label="Camera viewfinder for barcode scanning"
            />

            {(isScanning || isLoading) && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Viewfinder corners */}
                <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-primary-400 rounded-tl-lg" />
                <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-primary-400 rounded-tr-lg" />
                <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-primary-400 rounded-bl-lg" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-primary-400 rounded-br-lg" />

                {/* Scan line */}
                <div className="absolute left-0 right-0 top-1/4 h-0.5 bg-primary-400/80 shadow-[0_0_12px_rgba(56,189,248,0.8)] animate-scan-line" />

                <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/90">
                  Apunta la cámara al código de barras
                </p>
              </div>
            )}
          </div>

          {(isError || isTimeout) && (
            <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-center">
              <p className="text-sm text-red-200 mb-3">{errorMessage}</p>
              <Button onClick={startCamera} variant="secondary">
                Reintentar
              </Button>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BarcodeScanner;
