import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../../seguridad/routes/AuthRoutes';
import { CursosRoutes } from '../../cursos/routes/CursosRoutes';
import { CheckingAuth } from '../../seguridad/components';
import { useCheckAuth } from '../../seguridad/hooks';
import Sidebar from '../../general/components/Sidebar.jsx';
import { useState } from 'react';
import { NotasRoutes } from '../../notas/routes/NotasRoutes.jsx'; 
import {AlumnosRoutes} from '../../alumnos/routes/AlumnosRoutes.jsx'
export const AppRouter = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const status = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <>
      <Sidebar isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <Routes>
        {status === 'authenticated' ? (
          <Route path="/cursos/*" element={<CursosRoutes />} />
        ) : (
          <Route path="/auth/*" element={<AuthRoutes />} />
        )}
        <Route path="/*" element={<Navigate to="/auth/login" />} />
        <Route path="/notas/*" element={<NotasRoutes />} />
        <Route path="/alumnos/*" element={<AlumnosRoutes />} />
      </Routes>
    </>
  );
};
