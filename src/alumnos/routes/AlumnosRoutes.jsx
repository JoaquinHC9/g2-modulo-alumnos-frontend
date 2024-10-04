import { Routes, Route } from 'react-router-dom';
import AlumnoMain  from '../pages/AlumnoMain.jsx';
import {InscribirAlumno} from '../pages/InscribirAlumno';
import AsignarGrupo from '../pages/AsignarGrupo'
export const AlumnosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AlumnoMain />} />
      <Route path="/inscribir" element={<InscribirAlumno />} />
      <Route path="/asignar" element={<AsignarGrupo/>} />
    </Routes>
  );
};
