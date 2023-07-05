import React, { useState } from "react";
import { TextField, Checkbox, Button, Box } from "@mui/material";

const UserForm = () => {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [ddd, setDdd] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isProfessor, setIsProfessor] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            ddd: parseInt(ddd),
            id: parseInt(userId),
            name,
            number: parseInt(phoneNumber),
            password,
        };

        console.log(userData);

        // Limpar o formulário após o envio
        setUserId("");
        setName("");
        setDdd("");
        setPhoneNumber("");
        setPassword("");
        setIsProfessor(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ maxWidth: "600px", margin: "auto" }}>
                <Box mt={2} mb={2}>
                    <h2>Cadastro de usuário</h2>
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="ID do Usuário"
                        type="number"
                        value={userId}
                        onChange={(event) => setUserId(event.target.value)}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="Nome"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="DDD"
                        value={ddd}
                        onChange={(event) => setDdd(event.target.value)}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="Número de Telefone"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <Checkbox
                        checked={isProfessor}
                        onChange={(event) => setIsProfessor(event.target.checked)}
                    />
                    <label>Usuário professor</label>
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

export default UserForm;
