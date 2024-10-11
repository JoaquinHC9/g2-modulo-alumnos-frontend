import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Typography, CircularProgress, Button, Paper } from '@mui/material';
import '../styles/Inscribir.css'; // Reutilizar el CSS existente

export const InscribirAlumno = () => {
  const [alumnoId, setAlumnoId] = useState(''); // Almacena el ID del alumno
  const [cursoCodigo, setCursoCodigo] = useState(''); // Almacena el código del curso
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const inscribirAlumnoEnCurso = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const requestBody = {
      alumnoid: alumnoId,
      codigo: cursoCodigo
    };

    try {
      // Realizar la petición POST a la API de inscripción
      const response = await axios.post('http://localhost:8080/api-alucur/v1/inscripcion', requestBody);

      // Revisar el código de estado para determinar si fue exitoso o si hay un error
      if (response.status === 201) {
        setSuccessMessage('Alumno inscrito exitosamente en el curso.');
      }
    } catch (err) {
      // Mostrar el mensaje de error personalizado desde la respuesta de la API
      if (err.response && err.response.data) {
        setError(err.response.data); // Aquí capturas el mensaje de error devuelto por la API
  
      } else {
        setError('Error desconocido. Por favor, verifica los datos e intenta de nuevo.');
      }
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
          label="Código del Curso" // Cambiado a código del curso
          value={cursoCodigo}
          onChange={(e) => setCursoCodigo(e.target.value)}
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
