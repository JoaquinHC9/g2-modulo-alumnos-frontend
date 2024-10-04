import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, CircularProgress, MenuItem } from '@mui/material';
import '../styles/Inscribir.css'; // Reutilizar el CSS existente

const AsignarGrupo = () => {
  const [alumnoId, setAlumnoId] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [grupoId, setGrupoId] = useState(''); // Mantenerlo como string para el select
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInscribir = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8080/api-grupos/v1/asignar', {
        alumnoid: Number(alumnoId), // Convertir a número
        cursoid: Number(cursoId),    // Convertir a número
        grupoid: Number(grupoId),     // Convertir a número
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

      <TextField
        variant="outlined"
        label="Alumno ID"
        value={alumnoId}
        onChange={(e) => setAlumnoId(e.target.value)}
        style={{ minWidth: 120, marginBottom: '20px' }}
      />

      <TextField
        variant="outlined"
        label="Curso ID"
        value={cursoId}
        onChange={(e) => setCursoId(e.target.value)}
        style={{ minWidth: 120, marginBottom: '20px' }}
      />

      <TextField
        variant="outlined"
        select // Asegurarse de que sea un selector
        label="Seleccionar Grupo"
        value={grupoId}
        onChange={(e) => setGrupoId(e.target.value)}
        style={{ minWidth: 120, marginBottom: '20px' }}
      >
        {Array.from({ length: 8 }, (_, index) => (
          <MenuItem key={index + 1} value={index + 1}> {/* Aquí se almacena el número directamente */}
            G{index + 1}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        color="primary"
        onClick={handleInscribir}
        disabled={loading || !grupoId}
      >
        {loading ? <CircularProgress size={24} /> : 'Inscribir'}
      </Button>

      {message && <Typography variant="h6" color="green" style={{ marginTop: '20px' }}>{message}</Typography>}
      {error && <Typography variant="h6" color="red" style={{ marginTop: '20px' }}>{error}</Typography>}
    </div>
  );
};

export default AsignarGrupo;
