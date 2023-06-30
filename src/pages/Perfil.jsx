import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import Header from "../components/head";
import Cookies from "js-cookie";
import useFetch from "../hooks/useFetch";
import { useRouter } from "next/router";

const Perfil = () => {
    const router = useRouter();
    const sessionToken = Cookies.get('sessionToken');

    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [telefone, setTelefone] = useState("");
    const [ddd, setDdd] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState();

    useEffect(() => {
        if (!sessionToken) {
            router.push('/');
        }
    }, [router]);

    const { pending, error, data } = useFetch('http://localhost:5000/users/' + Cookies.get("sessionUserId"));

    useEffect(() => {
        if (sessionToken || !isEditing) {
            if (data) {
                setNome(data.data.name)
                setMatricula(data.data.id)
                setDdd(data.data.ddd)
                setTelefone(data.data.number)
                setPassword(data.data.password)
            }
        }
    }, [data, isEditing]);

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleTelefoneChange = (event) => {
        setTelefone(event.target.value);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            setIsEditing(false);
            const id = Cookies.get("sessionUserId"); // Obtém o valor do ID do cookie
            const response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: nome,
                    number: telefone,
                    ddd: ddd,
                    id: matricula,
                    password: password
                }),
            });
            if(response.ok){
                router.reload();
            }
        } catch (error) {
            console.error("Erro ao salvar as alterações:", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <Header hasFloor={false} />
            <div style={{ maxWidth: "600px", margin: "auto", marginTop: 50 }}>
                <Box mt={2} mb={2}>
                    <TextField
                        label="Matrícula"
                        value={matricula}
                        disabled
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="Nome"
                        value={nome}
                        onChange={handleNomeChange}
                        disabled={!isEditing}
                        fullWidth
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField
                        label="DDD"
                        value={ddd}
                        onChange={(event) => setDdd(event.target.value)}
                        disabled={!isEditing}
                        style={{ width: "20%" }}
                    />
                    <TextField
                        label="Número de Telefone"
                        value={telefone}
                        onChange={handleTelefoneChange}
                        disabled={!isEditing}
                        style={{ width: "80%" }}
                    />
                </Box>
                {isEditing ? (
                    <div>
                        <Button variant="contained" onClick={handleSave} style={{ marginRight: 10 }}>
                            Salvar Alterações
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </div>
                ) : (
                    <Button variant="contained" onClick={handleEdit}>
                        Editar
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Perfil;
