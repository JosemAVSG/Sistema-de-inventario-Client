import { useSelector } from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom'
import Sidebar from './components/Sidebar';
const ProtectedRoutes = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);
    
    if(loading) return <h1>Loading....</h1>

    if( !loading && !isAuthenticated) return <Navigate to={'/login'} replace/>

    return (
        <div className='flex'>
            <Sidebar></Sidebar>
        <Outlet/>
        </div>
        
    )
}

export default ProtectedRoutes;