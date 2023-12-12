
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const Sidebar = () => {
  return (
    <Wrapper>

    <aside className="w-1/8 flex bg-zinc-700 min-h-screen text-white">
      <ul className="py-4">
        <li className="px-4 py-2">
          <NavLink to="/categoria" >
            Categoria
          </NavLink>
          <NavLink exact='true' to='/categoria/new'  className='bg-indigo-700 block rounded-lg px-4 py-1 w-48 '>
                 Tarea Nueva
            </NavLink>
        </li>
        <li className="px-4 py-2">
          <NavLink to="/proveedor" >
            Proveedor
          </NavLink>
          <NavLink exact='true' to='/proveedor/new'  className='bg-indigo-700 block rounded-lg px-4 py-1 w-48'>
                 Nuevo Proveedor
            </NavLink>
        </li>
        <li className="px-4 py-2">
          <NavLink to="/products" >
            Producto
          </NavLink>
          <NavLink exact='true' to='/products/new'  className='bg-indigo-700 block rounded-lg px-4 py-1 w-48'>
                 Nuevo Producto
            </NavLink>
        </li>
        <li className="px-4 py-2">
          <NavLink to="/ventas" >
            Ventas
          </NavLink>
          <NavLink exact='true' to='/ventas/new'  className='bg-indigo-700 block rounded-lg px-4 py-1 w-48'>
                 nuevo
            </NavLink>
        </li>
        <li className="px-4 py-2">
          <NavLink to="/compras" >
            Compras
          </NavLink>
          <NavLink exact='true' to='/compras/new'  className='bg-indigo-700 block rounded-lg px-4 py-1 w-48'>
                 nuevo
            </NavLink>
        </li>
      </ul>
    </aside>
     </Wrapper>
  );
};
const Wrapper = styled.nav`
.sidebar-header {
  width: 250px;
  height: 60px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 0 15px;
  z-index: 5;
  background: #fff;
  background-clip: padding-box;
  border-bottom: 1px solid #e4e4e4;
}`;

export default Sidebar;
