import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/head";
import styles from "../styles/Gerenciamento.module.css";
import { Tabs, Tab, Typography, Box } from "@mui/material";

const Gerenciamento = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Header hasFloor={false} />
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Cadastrar Usuários" />
        <Tab label="Deletar Usuários" />
      </Tabs>
      {activeTab === 0 && (
        <TabPanel>
          {/* Conteúdo da aba de cadastrar usuários */}
          <h2>Cadastrar Usuários</h2>
          {/* Adicione aqui o formulário ou componentes relacionados ao cadastro de usuários */}
        </TabPanel>
      )}
      {activeTab === 1 && (
        <TabPanel>
          {/* Conteúdo da aba de deletar usuários */}
          <h2>Deletar Usuários</h2>
          {/* Adicione aqui o formulário ou componentes relacionados à exclusão de usuários */}
        </TabPanel>
      )}
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default Gerenciamento;
