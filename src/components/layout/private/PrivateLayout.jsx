import { Navigate, Outlet } from 'react-router-dom';
import { HeaderPriv } from './HeaderPriv';
import { Sidebar } from './Sidebar';
import useAuth from '../../../hooks/useAuth';

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <>
        {/* Cabecera y navegación*/}
        <HeaderPriv />

        <div className="container">
          {/* Contenido Principal */}
          <section className="layout__content">{auth._id ? <Outlet /> : <Navigate to="/" />}</section>

          {/* Barra Lateral */}
          <Sidebar />
        </div>
      </>
    );
  }
};
