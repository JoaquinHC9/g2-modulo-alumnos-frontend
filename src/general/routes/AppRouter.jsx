import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../../seguridad/routes/AuthRoutes';
import { CursosRoutes } from '../../cursos/routes/CursosRoutes';
import { CheckingAuth } from '../../seguridad/components';
import { useCheckAuth } from '../../seguridad/hooks';
import { Notas } from '../../notas/pages/Notas.jsx';
import Sidebar from '../../general/components/Sidebar.jsx';
import { useState } from 'react';
import Top5Page from '../../notas/pages/Top5Page.jsx'

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
        <Route path="/notas" element={<Notas />} />
        <Route path="/top5/:cursoId/:componenteId" element={<Top5Page/>} />
      </Routes>
    </>
  );
};
