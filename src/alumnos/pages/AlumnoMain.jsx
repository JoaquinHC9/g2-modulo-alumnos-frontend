import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Button } from '@mui/material';
import '../styles/Inscribir.css'; // Asegúrate de que este CSS esté configurado según tus necesidades

const AlumnoMain = () => {
  const [alumnoId, setAlumnoId] = useState(1); // Puedes cambiar el ID según sea necesario
  const [alumnoData, setAlumnoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlumnoData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api-alumno/v1/alumnos/${alumnoId}`);
      setAlumnoData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnoData();
  }, [alumnoId]);

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
      <Typography variant="h4" className="title" style={{ marginBottom: '20px' }}>
        Información del Alumno
      </Typography>

      {alumnoData && (
        <div className="alumno-info">
          <Typography variant="h6">ID: {alumnoData.id}</Typography>
          <Typography variant="h6">Código: {alumnoData.codigo}</Typography>
          <Typography variant="h6">Nombres: {alumnoData.nombres}</Typography>
          <Typography variant="h6">Apellidos: {alumnoData.apellidos}</Typography>
          <Typography variant="h6">Email: {alumnoData.email}</Typography>
          <Typography variant="h6">Estado: {alumnoData.estado}</Typography>
        </div>
      )}

      <Button variant="contained" color="primary" onClick={() => setAlumnoId(alumnoId + 1)}>
        Siguiente Alumno
      </Button>
    </div>
  );
};

export default AlumnoMain;
