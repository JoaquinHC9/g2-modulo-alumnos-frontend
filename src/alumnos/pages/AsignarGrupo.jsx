import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, CircularProgress, MenuItem } from '@mui/material';
import '../styles/Inscribir.css'; // Reutilizar el CSS existente

const AsignarGrupo = () => {
  const [alumnoId, setAlumnoId] = useState('');
  const [alumnoInfo, setAlumnoInfo] = useState(null); // Información del alumno
  const [cursos, setCursos] = useState([]); // Lista de cursos del alumno
  const [cursoId, setCursoId] = useState(''); // ID del curso seleccionado
  const [grupoId, setGrupoId] = useState(''); // ID del grupo seleccionado
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Obtener la información del alumno
  const handleBuscarAlumno = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Obtener la información del alumno
      const alumnoResponse = await axios.get(`http://localhost:8080/api-alumno/v1/alumnos/${alumnoId}`);
      setAlumnoInfo(alumnoResponse.data);
      setCursos([]); // Limpiar los cursos al buscar un nuevo alumno
    } catch (err) {
      setError('Error al obtener la información del alumno.');
      setAlumnoInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // Obtener los cursos del alumno
  const handleObtenerCursos = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Obtener los cursos del alumno
      const cursosResponse = await axios.get(`http://localhost:8080/api-alucur/v1/alumno/${alumnoId}`);
      setCursos(cursosResponse.data);
    } catch (err) {
      setError('Error al obtener los cursos del alumno.');
      setCursos([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInscribir = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8080/api-grupos/v1/asignar', {
        alumnoid: Number(alumnoId), // Convertir a número
        cursoid: Number(cursoId),    // Convertir a número
        grupoid: Number(grupoId),    // Convertir a número
      });
      setMessage('Inscripción exitosa: ' + response.data.message);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <Typography variant="h4" className="title" style={{ marginBottom: '20px' }}>
        Inscribir a un Grupo
      </Typography>

      {/* Campo para ingresar el ID del alumno */}
      <TextField
        variant="outlined"
        label="Alumno ID"
        value={alumnoId}
        onChange={(e) => setAlumnoId(e.target.value)}
        style={{ minWidth: 300, marginBottom: '20px' }} // Aumentar el ancho
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleBuscarAlumno}
        disabled={loading || !alumnoId}
        style={{ marginBottom: '20px', marginRight: '10px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Buscar Alumno'}
      </Button>

      {/* Botón para obtener los cursos del alumno */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleObtenerCursos}
        disabled={loading || !alumnoId}
        style={{ marginBottom: '20px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Obtener Cursos'}
      </Button>

      {/* Mostrar información del alumno si existe */}
      {alumnoInfo && (
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h6">Alumno: {alumnoInfo.nombre}</Typography>
          <Typography variant="body1">ID: {alumnoInfo.id}</Typography>
        </div>
      )}

      {/* Mostrar lista de cursos si existen */}
      {cursos.length > 0 && (
        <TextField
          variant="outlined"
          select
          label="Seleccionar Curso"
          value={cursoId}
          onChange={(e) => setCursoId(e.target.value)}
          style={{ minWidth: 300, marginBottom: '20px' }} // Aumentar el ancho
        >
          {cursos.map((curso) => (
            <MenuItem key={curso.cursoid} value={curso.cursoid}>
              {curso.nombre} {/* Actualizado para mostrar el nombre del curso */}
            </MenuItem>
          ))}
        </TextField>
      )}

      {/* Habilitar la selección de grupo solo si se ha seleccionado un curso */}
      {cursoId && (
        <TextField
          variant="outlined"
          select
          label="Seleccionar Grupo"
          value={grupoId}
          onChange={(e) => setGrupoId(e.target.value)}
          style={{ minWidth: 300, marginBottom: '20px' }} // Aumentar el ancho
        >
          {Array.from({ length: 8 }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              G{index + 1}
            </MenuItem>
          ))}
        </TextField>
      )}

      {/* Botón para inscribir al alumno en un grupo */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleInscribir}
        disabled={loading || !grupoId}
      >
        {loading ? <CircularProgress size={24} /> : 'Inscribir'}
      </Button>

      {/* Mostrar mensajes de éxito o error */}
      {message && <Typography variant="h6" color="green" style={{ marginTop: '20px' }}>{message}</Typography>}
      {error && <Typography variant="h6" color="red" style={{ marginTop: '20px' }}>{error}</Typography>}
    </div>
  );
};

export default AsignarGrupo;
