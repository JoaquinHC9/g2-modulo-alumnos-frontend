import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Typography, CircularProgress, Button, Paper } from '@mui/material';
import '../styles/Inscribir.css'; // Reutilizar el CSS existente

export const InscribirAlumno = () => {
  const [alumnoId, setAlumnoId] = useState(''); // Almacena el ID del alumno
  const [cursoId, setCursoId] = useState('');   // Almacena el ID del curso
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const inscribirAlumnoEnCurso = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const requestBody = {
      alumnoid: alumnoId,
      cursoid: cursoId
    };

    try {
      // Realizar la petición POST a la API de inscripción
      const response = await axios.post('http://localhost:8080/api-alucur/v1/inscribir', requestBody);
      setSuccessMessage('Alumno inscrito exitosamente en el curso' + response.data.message);
    } catch (err) {
      setError('Hubo un error al inscribir al alumno. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Typography variant="h4" className="title" style={{ marginBottom: '20px' }}>Inscribir Alumno en Curso</Typography>

      <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          label="Alumno ID"
          value={alumnoId}
          onChange={(e) => setAlumnoId(e.target.value)}
          style={{ marginBottom: '20px', width: '100%' }}
        />

        <TextField
          variant="outlined"
          label="Curso ID"
          value={cursoId}
          onChange={(e) => setCursoId(e.target.value)}
          style={{ marginBottom: '20px', width: '100%' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={inscribirAlumnoEnCurso}
          disabled={loading}
          className="button"
        >
          {loading ? <CircularProgress size={24} /> : 'Inscribir'}
        </Button>

        {successMessage && (
          <Typography variant="body1" style={{ color: 'green', marginTop: '20px' }}>
            {successMessage}
          </Typography>
        )}

        {error && (
          <Typography variant="body1" style={{ color: 'red', marginTop: '20px' }}>
            {error}
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default InscribirAlumno;
