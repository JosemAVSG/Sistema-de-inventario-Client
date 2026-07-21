export const cerrarDia = (fecha, ventas, compras) => ({
  type: 'CERRAR_DIA',
  payload: {
    fecha,
    ventas,
    compras,
  },
});
