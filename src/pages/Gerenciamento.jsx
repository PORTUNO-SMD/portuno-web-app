import React, { useState } from "react";
import Header from "../components/head";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import UserForm from "../components/admin/UserForm";
import SemesterForm from "../components/admin/SemesterForm";

const Gerenciamento = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <Header hasFloor={false} />
            <Tabs value={activeTab} onChange={handleTabChange} style={{ marginLeft: "50px" }}>
                <Tab label="Cadastrar Usuário" />
                <Tab label="Deletar Usuário" />
                <Tab label="Cadastrar Semestre" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <UserForm key={1} />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <UserForm key={2} option="delete" />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <SemesterForm />
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