import Cookies from "js-cookie";
import Header from "../components/head";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dynamic from "next/dynamic";
import Style from "../styles/Horarios.module.css";

const Schedule = dynamic(() => import("../components/schedule"), {
    ssr: false,
});

const Horarios = () => {
    const apiUrl = "http://localhost:5000";
    const sessionClassrooms = Cookies.get("sessionClassrooms");
    const classroomsNames = sessionClassrooms ? sessionClassrooms.split(",") : [];
    const [weekDay, setWeekDay] = useState("");
    const [selectedClasses, setSelectedClasses] = useState([]);

    const { pending, error, data } = useFetch(`${apiUrl}/classes`);

    useEffect(() => {
        if (weekDay) {
            const filteredClasses = data.data.filter(
                (item) => item.day_week === weekDay
            );
            setSelectedClasses(filteredClasses);
        }
    }, [weekDay, data]);

    return (
        <div>
            <Header hasFloor={false} />
            <FormControl className={Style.Week}>
                <InputLabel id="weekDay-label">Dia da semana</InputLabel>
                <Select
                    labelId="weekDay-label"
                    id="weekDay-select"
                    value={weekDay}
                    style={{ width: "150px" }}
                    onChange={(e) => setWeekDay(e.target.value)}
                >
                    <MenuItem value="">Selecione</MenuItem>
                    <MenuItem value="SEG">Segunda-feira</MenuItem>
                    <MenuItem value="TER">Terça-feira</MenuItem>
                    <MenuItem value="QUA">Quarta-feira</MenuItem>
                    <MenuItem value="QUI">Quinta-feira</MenuItem>
                    <MenuItem value="SEX">Sexta-feira</MenuItem>
                </Select>
            </FormControl>
            <Schedule rooms={classroomsNames} selectClasses={selectedClasses} />
        </div>
    );
};

export default Horarios;
