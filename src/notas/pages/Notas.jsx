import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Typography, CircularProgress, Button } from '@mui/material';
import NotasList from '../slices/NotaList'; 
import '../styles/Notas.css'; 
import ArbolNotas from '../slices/ArbolNota'; // Importamos el constructor del árbol

export const Notas = () => {
  const [cursoId, setCursoId] = useState('1'); // Valor predeterminado 
  const [alumnoId, setAlumnoId] = useState('2'); // Valor predeterminado 
  const [arbolNotas, setArbolNotas] = useState(null); // Se guardará el árbol de notas
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNotas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api-notas/v1/curso/${cursoId}/alumno/${alumnoId}`);
      const notas = response.data.notas;
      // Construir el árbol de notas a partir de los datos obtenidos
      const arbol = new ArbolNotas();
      arbol.construirArbol(notas);
      
      // Guardamos el árbol en el estado
      setArbolNotas(arbol);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="circular-progress">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <Typography variant="h4" className="title" style={{ marginBottom: '20px' }}>Notas de Alumno</Typography>

      <TextField
        variant="outlined"
        label="Curso ID"
        value={cursoId}
        onChange={(e) => setCursoId(e.target.value)}
        style={{ minWidth: 120, marginBottom: '20px' }}
      />

      <TextField
        variant="outlined"
        label="Alumno ID"
        value={alumnoId}
        onChange={(e) => setAlumnoId(e.target.value)}
        style={{ minWidth: 120, marginBottom: '20px' }}
      />

      <Button variant="contained" color="primary" onClick={fetchNotas}>
        Mostrar Notas
      </Button>

      {/* Renderizamos la lista de notas en formato árbol */}
      {arbolNotas && <NotasList arbolNotas={arbolNotas} />} 
    </div>
  );
};
