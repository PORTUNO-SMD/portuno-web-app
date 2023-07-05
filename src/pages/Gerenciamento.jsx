import React, { useState } from "react";
import Header from "../components/head";
import { Tabs, Tab, Typography, Box } from "@mui/material";

const Gerenciamento = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <Header hasFloor={false} />
            <Tabs value={activeTab} onChange={handleTabChange} style={{marginLeft: "50px"}}>
                <Tab label="Cadastrar Usuários" />
                <Tab label="Deletar Usuários" />
                <Tab label="Cadastrar Semestre" />
                <Tab label="Deletar Semestre" />
                <Tab label="Cadastrar Aulas do Semestre" />
                <Tab label="Deletar Aulas do Semestre" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <h2>Cadastrar Usuários</h2>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <h2>Deletar Usuários</h2>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <h2>Cadastrar Semestre</h2>
            </TabPanel>
            <TabPanel value={activeTab} index={3}>
                <h2>Deletar Semestre</h2>
            </TabPanel>
            <TabPanel value={activeTab} index={4}>
                <h2>Cadastrar Aulas do Semestre</h2>
            </TabPanel>
            <TabPanel value={activeTab} index={5}>
                <h2>Deletar Aulas do Semestre</h2>
            </TabPanel>
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
            <Box p={3} marginLeft={5}>{children}</Box>
        </Typography>
    );
}

export default Gerenciamento;
