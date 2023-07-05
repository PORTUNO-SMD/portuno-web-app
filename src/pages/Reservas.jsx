import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/head";
import { Alert, AlertTitle, Button } from "@mui/material";
import styles from "../styles/Reservas.module.css";
import { useRouter } from "next/router";

const Reservas = () => {
    const router = useRouter();
    const [classroom, setClassroom] = useState(null);
    const occupancyId = Cookies.get("occupancy");
    const apiUrl = `http://127.0.0.1:5000/classrooms/${occupancyId}`;

    useEffect(() => {
        const fetchClassroom = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (response.ok) setClassroom(data);
            } catch (error) {
                console.error("Erro ao buscar informações da sala:", error);
            }
        };

        if (occupancyId) {
            fetchClassroom();
        }
    }, [occupancyId]);

    const handleFinishOccupancy = () => {
        const occupancyId = Cookies.get("occupancy");
        fetch(`http://127.0.0.1:5000/occupancies/${occupancyId}`, {
            method: "PUT",
        })
            .then(response => {
                Cookies.remove("occupancy");
                router.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };

    const renderOccupancy = () => {
        if (classroom) {
            return (
                <div className={styles.occupancyContainer}>
                    <h2>Sua ocupação:</h2>
                    <div className={styles.occupancyDetails}>
                        <div className={styles.classroomName}>{classroom.data.name}</div>
                        <Button variant="contained" onClick={handleFinishOccupancy} style={{ marginTop: 10 }}>
                            Finalizar Ocupação
                        </Button>
                    </div>
                </div>
            );
        } else {
            return (
                <Alert severity="info" className={styles.alert}>
                    <AlertTitle className={styles.alertTitle}>
                        Você não possui ocupações
                    </AlertTitle>
                </Alert>
            );
        }
    };

    return (
        <div>
            <Header hasFloor={false} />
            <div className={styles.container}>{renderOccupancy()}</div>
        </div>
    );
};

export default Reservas;
