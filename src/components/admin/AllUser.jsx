import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const AllUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/users');
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            alert('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await fetch(`http://127.0.0.1:5000/users/${id}`, {
                method: 'DELETE'
            });
            fetchData(); // Recarrega a página após a exclusão bem-sucedida
        } catch (error) {
            alert('Error deleting user:', error);
        }
    };

    return (
        <div>
            <TableContainer component={Paper} style={{ width: "98%" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Action</TableCell> {/* Coluna para o botão de exclusão */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => {
                            if (user.name !== "Admin") {
                                return (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{`(${user.ddd}) ${user.number}`}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                style={{border: "solid 0.5px #F00", color: "#F00"}}
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            } else {
                                return null; // Não exibe o usuário "Admin" na tabela
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllUser;
