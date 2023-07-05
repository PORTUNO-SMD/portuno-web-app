import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SemesterForm = () => {
    const [semesterName, setSemesterName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const semesterData = {
            beginning_date: startDate,
            ending_date: endDate,
            name: semesterName,
        };

        console.log(semesterData);

        // Limpar o formulário após o envio
        setSemesterName("");
        setStartDate("");
        setEndDate("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ maxWidth: "600px", margin: "auto" }}>
                <Box mt={2} mb={2}>
                    <h2>Cadastro de semestre</h2>
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="Nome do Semestre"
                        value={semesterName}
                        onChange={(event) => setSemesterName(event.target.value)}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="Data de Início"
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="Data de Fim"
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <Button variant="contained" type="submit">
                        Enviar
                    </Button>
                </Box>
            </div>
        </form>
    );
};

export default SemesterForm;
