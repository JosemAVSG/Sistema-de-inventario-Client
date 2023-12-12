import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { getsells } from '../redux/actionTransaccion';
const ChartComponent = () => {
  const chartRef = useRef();
  const dispatch = useDispatch()
  const ventas = useSelector(state =>state.transacciones.ventas);
  
  useEffect(()=>{
     dispatch(getsells());

  },[])
  console.log(ventas);
  const startDate = '2023-12-01';
  const endDate = '2023-12-31';
  
  const salesWithinRange = ventas.filter((ventas) => {
    return ventas.createdAt >= startDate && ventas.createdAt <= endDate;
  });
  console.log(salesWithinRange);
  const totalSalesWithinRange = salesWithinRange.length;
  console.log(totalSalesWithinRange);
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    // Datos y opciones del gráfico
    const data = {
      labels: ['Diciembre', 'Enero', 'Febrero', 'Marzon', 'Abril'],
      datasets: [{
        label: 'Ventas Mensuales',
        data: [totalSalesWithinRange,0,0,0,0],
        backgroundColor: 'rgba(15, 18, 139, 0.795)5)',
        borderColor: '#3c4855',
        borderWidth: 1,
      },{
        label: 'Compras Mensuales',
        data: [2,0,0,0,0],
        backgroundColor: 'rgba(81, 32, 160, 0.897)',
        borderColor: '#3c4855',
        borderWidth: 1,
      }]
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Crear el gráfico usando Chart.js
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    // Limpiar el gráfico al desmontar el componente
    return () => myChart.destroy();
  }, []);

  return (
    <div className='bg-white shadow-lg rounded-lg' >
      <canvas ref={chartRef} width="600" height="440"  />
    </div>
  ) 
};

export default ChartComponent;
