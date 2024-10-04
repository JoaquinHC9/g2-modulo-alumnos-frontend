import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Button } from '@mui/material';

const Top5Page = () => {
  const { cursoId, componenteId } = useParams(); // Extraer cursoId y componenteId de la URL
  const [topAlumnos, setTopAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la petición a la API cuando el componente se monta
    axios.get(`http://localhost:8080/api-notas/v1/top5/c/${cursoId}/cc/${componenteId}`)
      .then(response => {
        setTopAlumnos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos: ", error);
        setError(error);
        setLoading(false);
      });
  }, [cursoId, componenteId]); // Se ejecutará nuevamente si cambian los parámetros
  console.log(topAlumnos)
  if (loading) {
    return (
      <div className="circular-progress">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error al cargar los datos: {error.message}
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" className="container">
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#eff1f6', borderRadius: '8px' }}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#0d0f16' }}>
          Top 5 Alumnos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Codigo</strong></TableCell>
              <TableCell><strong>Nota</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topAlumnos.map(alumno => (
              <TableRow key={alumno.id}>
                <TableCell>{alumno.nombres +"  "+ alumno.apellidos}</TableCell>
                <TableCell>{alumno.codigoalumno}</TableCell>
                <TableCell>{alumno.nota}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: '20px', backgroundColor: '#205274', color: 'white', borderRadius: '5px' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#af695c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#205274'}
        >
          Volver
        </Button>
      </Paper>
    </Container>
  );
};

export default Top5Page;
