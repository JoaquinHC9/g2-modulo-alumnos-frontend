import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import '../styles/NotaList.css';

const NotasList = ({ arbolNotas }) => {
    const [expandedNodes, setExpandedNodes] = useState({}); // Estado para controlar qué nodos están expandidos

    // Función para manejar la expansión/contracción de nodos
    const handleToggleExpand = (notaId) => {
        setExpandedNodes(prevState => ({
            ...prevState,
            [notaId]: !prevState[notaId] // Cambiar el estado de expansión de la nota con este ID
        }));
    };

    // Función recursiva para renderizar cada nodo (nota) y sus hijos
    const renderNotas = (notas, nivel = 0) => {
        return notas.map(nota => {
            const isExpanded = expandedNodes[nota.componentenotaid] || false; // Chequear si este nodo está expandido

            return (
                <React.Fragment key={nota.componentenotaid}>
                    <TableRow>
                        <TableCell style={{ paddingLeft: `${nivel * 20}px`, display: 'flex', alignItems: 'center' }}>
                            {nota.children.length > 0 && (
                                <IconButton onClick={() => handleToggleExpand(nota.componentenotaid)}>
                                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            )}
                            {nota.nombreComponente}
                        </TableCell>
                        <TableCell>
                            {nota.nota !== null ? nota.nota : <span style={{ color: '#d9534f' }}>Sin calificación</span>}
                        </TableCell>
                        <TableCell>{nota.calculado ? 'Sí' : 'No'}</TableCell>
                    </TableRow>
                    {nota.children.length > 0 && (
                        <TableRow>
                            <TableCell colSpan={3} style={{ paddingLeft: `${(nivel + 1) * 20}px`, paddingTop: 0, paddingBottom: 0 }}>
                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                    <Table>
                                        <TableBody>
                                            {renderNotas(nota.children, nivel + 1)}
                                        </TableBody>
                                    </Table>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    )}
                </React.Fragment>
            );
        });
    };

    return (
        <div className="notas-container">
            {arbolNotas.raices.map(notaRaiz => (
                <TableContainer component={Paper} key={notaRaiz.componentenotaid}  style={{width: '1200px' }}className="notas-table" >
                    <Typography variant="h6" style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
                        {notaRaiz.padreId === null ? 'Promedio Final' : `Notas para Padre ID: ${notaRaiz.padreId}`}
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre Componente</TableCell>
                                <TableCell>Nota</TableCell>
                                <TableCell>Calculado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderNotas([notaRaiz])}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </div>
    );
};

export default NotasList;
