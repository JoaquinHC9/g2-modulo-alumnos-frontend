import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Typography, CircularProgress, Button, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import NotasList from '../slices/NotaList';
import '../styles/Notas.css';
import ArbolNotas from '../slices/ArbolNota'; // Importamos el constructor del árbol

export const Notas = () => {
  const [cursoId, setCursoId] = useState('1'); // Valor predeterminado 
  const [alumnoId, setAlumnoId] = useState('2'); // Valor predeterminado 
  const [arbolNotas, setArbolNotas] = useState(null); // Se guardará el árbol de notas
  const [alumnoInfo, setAlumnoInfo] = useState(null); // Información del alumno
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNotas = async () => {
    setLoading(true);
    setError(null);

    try {
      // Realizar la petición para obtener las notas
      const notasResponse = await axios.get(`http://localhost:8080/api-notas/v1/curso/${cursoId}/alumno/${alumnoId}`);
      const notas = notasResponse.data.notas;
      const arbol = new ArbolNotas();
      arbol.construirArbol(notas);
      setArbolNotas(arbol); // Guardamos el árbol de notas

      // Realizar la petición para obtener la información del alumno
      const alumnoResponse = await axios.get(`http://localhost:8080/api-alumno/v1/alumnos/${alumnoId}`);
      setAlumnoInfo(alumnoResponse.data); // Guardamos la información del alumno

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

      {/* Mostrar la información del alumno si está disponible */}
      {alumnoInfo && (
        <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
          <Typography variant="h5" gutterBottom>Información del Alumno</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell>{alumnoInfo.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Código</strong></TableCell>
                <TableCell>{alumnoInfo.codigo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Nombre Completo</strong></TableCell>
                <TableCell>{alumnoInfo.nombres} {alumnoInfo.apellidos}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell>{alumnoInfo.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Renderizar la lista de notas en formato árbol */}
      {arbolNotas && <NotasList arbolNotas={arbolNotas} cursoId={cursoId} />}
    </div>
  );
};
