import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const UserForm = ({ option="register" }) => {
  const [userId, setUserId] = useState("");

  const handleDelete = () => {
    const url = `http://127.0.0.1:5000/users/${userId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("User deletion successful!");
          setUserId("");
        } else {
          alert("User deletion failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while deleting the user.");
      });
  };

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();
    const userData = {
      ddd: parseInt(ddd),
      id: parseInt(userId),
      name,
      number: parseInt(phoneNumber),
      password,
    };

    const url = isProfessor
      ? "http://127.0.0.1:5000/professors"
      : "http://127.0.0.1:5000/users";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          alert("User registration successful!");
          setUserId("");
          setName("");
          setDdd("");
          setPhoneNumber("");
          setPassword("");
          setIsProfessor(false);
        } else {
          alert("User registration failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while registering the user.");
      });
  };

  if (option === "register") {
    return (
      <form onSubmit={handleRegistrationSubmit}>
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
          {/* Registration form */}
          <Box mt={2} mb={2}>
            <TextField label="Nome" fullWidth />
          </Box>
          <Box mt={2} mb={2}>
            <TextField label="DDD" fullWidth />
          </Box>
          <Box mt={2} mb={2}>
            <TextField label="Número de Telefone" fullWidth />
          </Box>
          <Box mt={2} mb={2}>
            <TextField label="Senha" type="password" fullWidth />
          </Box>
          {/* End of registration form */}
          <Box mt={2} mb={2}>
            <Button variant="contained" type="submit">
              Cadastrar
            </Button>
          </Box>
        </div>
      </form>
    );
  }

  if (option === "delete") {
    return (
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <Box mt={2} mb={2}>
          <h2>Deletar usuário</h2>
        </Box>
        <Box mt={2} mb={2}>
          <TextField
            label="ID doUsuário"
            type="number"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            fullWidth
          />
        </Box>
        <Box mt={2} mb={2}>
          <Button variant="contained" onClick={handleDelete}>
            Deletar
          </Button>
        </Box>
      </div>
    );
  }

  return null;
};

export default UserForm;
