import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const AllSemesters = () => {
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/semesters');
            const data = await response.json();
            setSemesters(data.data);
        } catch (error) {
            console.error('Error fetching semesters:', error);
        }
    };

    const handleDeleteSemester = async (name) => {
        try {
            await fetch(`http://127.0.0.1:5000/semesters/${name}`, {
                method: 'DELETE'
            });
            fetchData(); // Recarrega a página após a exclusão bem-sucedida
        } catch (error) {
            console.error('Error deleting semester:', error);
        }
    };

    return (
        <div>
            <TableContainer component={Paper} style={{width: "98%"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Semestre</TableCell>
                            <TableCell>Início</TableCell>
                            <TableCell>Fim</TableCell>
                            <TableCell></TableCell> {/* Coluna para o botão de exclusão */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {semesters.map((semester) => (
                            <TableRow key={semester.name}>
                                <TableCell>{semester.name}</TableCell>
                                <TableCell>{semester.beginning_date}</TableCell>
                                <TableCell>{semester.ending_date}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        style={{border: "solid 0.5px #F00", color: "#F00"}}
                                        onClick={() => handleDeleteSemester(semester.name)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllSemesters;
