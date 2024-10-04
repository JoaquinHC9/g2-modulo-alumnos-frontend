import { Routes, Route } from 'react-router-dom';
import { Notas } from '../pages/Notas';
import  Top5Page from '../pages/Top5Page';

export const NotasRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Notas />} />
      <Route path="/top5/:cursoId/:componenteId" element={<Top5Page />} />
    </Routes>
  );
};
