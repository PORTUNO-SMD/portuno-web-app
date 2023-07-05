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
                <Tab label="Gerenciamento de Usuários" />
                <Tab label="Gerenciamento de Semestre" />
                {/* <Tab label="Gerenciamento de Aulas" /> */}
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <UserForm />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <SemesterForm />
            </TabPanel>
            {/* <TabPanel value={activeTab} index={2}> */}
                {/* Formulário de Aulas */}
            {/* </TabPanel> */}
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