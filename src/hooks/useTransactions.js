import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getVentas,
  getCompras,
  createTransaccionRequest,
  cerrarDiaRequest,
} from '@/services/transaccion';

export const useVentas = () =>
  useQuery({
    queryKey: ['ventas'],
    queryFn: () => getVentas().then((r) => r.data),
  });

export const useCompras = () =>
  useQuery({
    queryKey: ['compras'],
    queryFn: () => getCompras().then((r) => r.data),
  });

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createTransaccionRequest(data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ventas'] });
      queryClient.invalidateQueries({ queryKey: ['compras'] });
    },
  });
};

export const useCerrarDia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => cerrarDiaRequest(data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ventas'] });
      queryClient.invalidateQueries({ queryKey: ['compras'] });
    },
  });
};
