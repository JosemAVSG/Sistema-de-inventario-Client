import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getsells, getbuys } from "../redux/actionTransaccion";
import { months } from "../utils/months";
import {
  filtrarYGuardarCompras,
  filtrarYGuardarVentas,
} from "../redux/actionFiltros";

const ChartComponent = () => {
  const chartRef = useRef();
  const dispatch = useDispatch();
  const ventas = useSelector((state) => state.transacciones.ventas);
  const compras = useSelector((state) => state.transacciones.compras);
  const [newData, setNewData] = useState({});
  
  const ventasFiltradas = useSelector(
    (state) => state.transacciones.VentasFiltradas
  );
  const comprasFiltradas = useSelector(
    (state) => state.transacciones.ComprasFiltradas
  );
    console.log(ventasFiltradas);
  useEffect(() => {
    dispatch(getsells());
    dispatch(getbuys());
  }, []);

  useEffect(() => {
    dispatch(filtrarYGuardarVentas(ventas, months));
    dispatch(filtrarYGuardarCompras(compras, months));
  }, [ventas, months, compras, dispatch]);

  console.log(ventasFiltradas);
  const diciembre = ventasFiltradas?.December?.length || 0;
  const enero = ventasFiltradas?.January?.length || 0;
  const febrero = ventasFiltradas?.February?.length || 0;
  const marzo = ventasFiltradas?.March?.length || 0;
  const abril = ventasFiltradas?.April?.length || 0;
  console.log(enero);
  const diciembreC = comprasFiltradas?.December?.length || 0;

  const handleClick = (interval) => {
    // Realiza la lógica para filtrar los datos según el intervalo seleccionado
    if (interval === "dia") {
      // Lógica para obtener datos del día
      // eslint-disable-next-line no-const-assign
      setNewData ({
         labels: ["Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
          {
            label: "Ventas Diarias",
            data: [2, 3, 5, 6, 7],
            backgroundColor: "rgba(143, 113, 15, 0.795)5)",
            borderColor: "#3c4855",
            borderWidth: 1,
          },
          {
            label: "Compras diarias",
            data: [1, 2, 2, 0, 0],
            backgroundColor: "rgba(22, 94, 97, 0.897)",
            borderColor: "#3c4855",
            borderWidth: 1,
          },
        ],
      }
      )
    } else if (interval === "semana") {
      // Lógica para obtener datos de la semana
      // eslint-disable-next-line no-const-assign
      setNewData ({

          labels: ["Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
          {
            label: "Ventas Semanales",
            data: [2, 3, 4, 5, 5],
            backgroundColor: "rgba(143, 113, 15, 0.795)5)",
            borderColor: "#3c4855",
            borderWidth: 1,
          },
          {
            label: "Compras Semanales",
            data: [2, 0, 0, 0, 0],
            backgroundColor: "rgba(22, 94, 97, 0.897)",
            borderColor: "#3c4855",
            borderWidth: 1,
          },
        ],
      })
      
    
    } else if (interval === "mes") {
      // Lógica para obtener datos del mes
      // eslint-disable-next-line no-const-assign
      setNewData ({

 labels: ["Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
          {
            label: "Ventas Mensuales",
            data: [diciembre, enero, febrero, marzo, abril],
            backgroundColor: "rgba(143, 113, 15, 0.795)5)",
            borderColor: "#3c4855",
            borderWidth: 1,
          },
          {
            label: "Compras Mensuales",
            data: [diciembreC, 0, 0, 0, 0],
            backgroundColor: "rgba(22, 94, 97, 0.897)",
            borderColor: "#3c4855",
            borderWidth: 1,
          },
        ],

      })
    }
  }; 
  
 
  useEffect(()=>{
    handleClick('semana');
  },[])
  useEffect(() => {
    
    const ctx = chartRef.current.getContext("2d");
    // Datos y opciones del gráfico
    const data = {
      labels: ["Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
      datasets: [
        {
          label: "Ventas Mensuales",
          data: [diciembre, enero, febrero, marzo, abril],
          backgroundColor: "rgba(15, 18, 139, 0.795)5)",
          borderColor: "#3c4855",
          borderWidth: 1,
        },
        {
          label: "Compras Mensuales",
          data: [diciembreC, 0, 0, 0, 0],
          backgroundColor: "rgba(81, 32, 160, 0.897)",
          borderColor: "#3c4855",
          borderWidth: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Crear el gráfico usando Chart.js
    const myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });
       // Actualiza los datos del gráfico con los nuevos datos filtrados
       myChart.data = newData;
       myChart.update();

    // Limpiar el gráfico al desmontar el componente
    return () => myChart.destroy();
  }, [newData]);

  return (
    <div className="bg-white flex flex-col shadow-lg chart rounded-lg">
      <div className="ml-5 p-5">
      <button className=" rounded-l-lg shadow-sm  py-2 font-semibold text-black px-5 border border-slate-500 hover:bg-slate-500 hover:text-white bg-slate-100 mt-2"  onClick={() => handleClick('dia')}>Día</button>
      <button  className=" shadow-sm text-black py-2 font-semibold px-5 border border-slate-500  hover:bg-slate-600 hover:text-white bg-slate-100 mt-2"  onClick={() => handleClick('semana')} >Semana</button>
      <button className=" rounded-r-lg shadow-sm  py-2 font-semibold border border-slate-500 text-black px-5 hover:text-white hover:bg-slate-500 bg-slate-100 mt-2"   onClick={() => handleClick('mes')}>Mes</button>
      </div>
      <div  className="flex justify-center items-center" style={{ height: '500px', position: 'relative' }} >
        <canvas ref={chartRef}      style={{
        position: 'absolute',
        maxWidth: '100%',
        maxHeight: '100%',
        heigh:'100%',
        width:'100%'
      }} />
      </div>
      
    </div>
    
  );
};

export default ChartComponent;
