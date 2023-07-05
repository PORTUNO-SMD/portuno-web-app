import Cookies from "js-cookie";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/head";
import styles from "../styles/Permissoes.module.css";

const Permissions = () => {
    const router = useRouter();
    const sessionToken = Cookies.get('sessionToken');
    const apiUrl = 'http://localhost:5000';
    const [classrooms, setClassrooms] = useState([]);
    const [beginningDateTime, setBeginningDateTime] = useState("");
    const [endingDateTime, setEndingDateTime] = useState("");
    const [selectedClassroom, setSelectedClassroom] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const { pending, error, data } = useFetch(`${apiUrl}/classrooms`);

    useEffect(() => {
        if (data && data.data) {
            const professorClassrooms = data.data.filter(classroom => classroom.professor === Cookies.get("sessionUserName"));
            setClassrooms(professorClassrooms);
        }
    }, [data]);

    const handleBeginningDateTimeChange = (event) => {
        setBeginningDateTime(event.target.value);
    };

    const handleEndingDateTimeChange = (event) => {
        setEndingDateTime(event.target.value);
    };

    const handleClassroomChange = (event) => {
        setSelectedClassroom(event.target.value);
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/permissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    beginning_date_time: beginningDateTime,
                    ending_date_time: endingDateTime,
                    classroom: selectedClassroom,
                    user: parseInt(selectedUser),
                    professor: parseInt(Cookies.get("sessionUserId")),
                }),
            });

            if (response.ok) {
                alert("Sucesso!");
                setBeginningDateTime("");
                setEndingDateTime("");
                setSelectedClassroom("");
                setSelectedUser("");
                setSelectedProfessor("");
            } else {
                alert("Erro ao enviar permissão.");
                setBeginningDateTime("");
                setEndingDateTime("");
                setSelectedClassroom("");
                setSelectedUser("");
                setSelectedProfessor("");
            }
        } catch (error) {
            console.error("Erro ao enviar permissão:", error);
            alert("Erro ao enviar permissão.");
        }
    };

    return (
        <div>
            <Header hasFloor={false} />

            {classrooms.length === 0 ? (
                <div className={styles.alertContainer}>
                    <Alert severity="info" className={styles.alert}>
                        <AlertTitle className={styles.alertTitle}>
                            Você não possui ocupações
                        </AlertTitle>
                    </Alert>
                </div>
            ) : (
                <Box maxWidth="600px" margin="auto" marginTop={5}>
                    <form onSubmit={handleSubmit}>
                        <Box marginTop={3}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Data de Início"
                                    type="date"
                                    value={beginningDateTime}
                                    onChange={handleBeginningDateTimeChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box marginTop={2}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Data de Fim"
                                    type="date"
                                    value={endingDateTime}
                                    onChange={handleEndingDateTimeChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box marginTop={2}>
                            <FormControl fullWidth>
                                <InputLabel id="classroom-label">Sala</InputLabel>
                                <Select
                                    labelId="classroom-label"
                                    value={selectedClassroom}
                                    onChange={handleClassroomChange}
                                >
                                    {classrooms.map(classroom => (
                                        <MenuItem key={classroom.id} value={classroom.id}>
                                            {classroom.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box marginTop={2}>
                            <FormControl fullWidth>
                                <TextField
                                    label="ID do Usuário"
                                    type="number"
                                    value={selectedUser}
                                    onChange={handleUserChange}
                                />
                            </FormControl>
                        </Box>
                        <Box marginTop={2}>
                            <Button variant="contained" type="submit">
                                Enviar
                            </Button>
                        </Box>
                    </form>
                </Box>
            )}

        </div>
    );
};

export default Permissions;