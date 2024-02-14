
export const filtrarYGuardarCompras = (compras, months) => {
    return (dispatch) => {
      const filteredByMonth = {};
      Object.entries(months).forEach(([month, { startDate, endDate }]) => {
        const comprasForMonth = compras.filter(compra => {
          return compra.createdAt >= startDate && compra.createdAt <= endDate;
        });
      
        if (comprasForMonth.length > 0) {
          filteredByMonth[month] = comprasForMonth;
        } else {
          filteredByMonth[month] = [];
        }
      });
  
      // Después de filtrar, dispara una acción para almacenar los datos filtrados en el estado
      dispatch(guardarComprasFiltradas(filteredByMonth));
    };
  };
  
  // Otra acción para guardar los datos filtrados en el estado global
  export const guardarComprasFiltradas = (datosFiltrados) => {
    return {
      type: 'GUARDAR_COMPRAS_FILTRADAS',
      payload: datosFiltrados,
    };
  };

export const filtrarYGuardarVentas = (ventas, months) => {
    return (dispatch) => {
      const filteredByMonth = {};
      Object.entries(months).forEach(([month, { startDate, endDate }]) => {
        const comprasForMonth = ventas.filter(ventas => {
          return ventas.createdAt >= startDate && ventas.createdAt <= endDate;
        });
      
        if (comprasForMonth.length > 0) {
          filteredByMonth[month] = comprasForMonth;
        } else {
          filteredByMonth[month] = [];
        }
      });
  
      // Después de filtrar, dispara una acción para almacenar los datos filtrados en el estado
      dispatch(guardarVentasFiltradas(filteredByMonth));
    };
  };
  
  // Otra acción para guardar los datos filtrados en el estado global
  export const guardarVentasFiltradas = (datosFiltrados) => {
    return {
      type: 'GUARDAR_VENTAS_FILTRADAS',
      payload: datosFiltrados,
    };
  };
  