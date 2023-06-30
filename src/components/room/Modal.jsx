import Style from "../../styles/Home.module.css";
import { useEffect, useState } from 'react';
import {
    Modal,
    Typography,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Button
} from '@mui/material';
import Cookies from "js-cookie";
import ConfirmationDialog from "../confirm";
import { useRouter } from "next/router";

const ModalRoom = ({ selectedRoom, isModalOpen, handleCloseModal }) => {
    console.log(selectedRoom)
    const router = useRouter();
    const isOccupancy = Cookies.get("occupancy") ? true : false;
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    function handleOccupationClick() {
        setIsConfirmationOpen(true);
    }

    const handleFinishOccupation = () => {
        console.log("Finalizar ocupação");
        const occupancyId = Cookies.get("occupancy");
        fetch(`http://127.0.0.1:5000/occupancies/${occupancyId}`, {
            method: "PUT",
        })
            .then(response => {
                handleCloseModal();
                router.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };


    const handleConfirmOccupation = () => {
        setIsConfirmationOpen(false);
        handleCloseModal();

        const data = {
            goal: "Estudar",
            classroom: selectedRoom.id,
            user: Cookies.get('sessionUserId'),
            semester: "2023.1",
            class: null
        };

        fetch('http://127.0.0.1:5000/occupancies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                Cookies.set("occupancy", selectedRoom.id);
                router.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleCancelOccupation = () => {
        setIsConfirmationOpen(false);
        handleCloseModal();
    };

    useEffect(() => {
        if (isConfirmationOpen) {
            handleCloseModal();
        }
    }, [isConfirmationOpen]);

    return (
        <>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <div className={Style.modalContent}>
                    {selectedRoom && (
                        <div>
                            <Typography variant="h5" align="center" component="h2" fontWeight={700} marginBottom={1}>
                                {selectedRoom.name}
                            </Typography>
                            <br />
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ background: "#f0f0f0" }}>Piso:</TableCell>
                                            <TableCell>{selectedRoom.floor == 0 ? "Térreo" : selectedRoom.floor + "º andar"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ background: "#f1f1f1" }}>Tipo de sala:</TableCell>
                                            <TableCell>{selectedRoom.type}</TableCell>
                                        </TableRow>
                                        {selectedRoom.professor && (
                                            <TableRow>
                                                <TableCell style={{ background: "#f1f1f1" }}>Responsável pela sala:</TableCell>
                                                <TableCell>{selectedRoom.professor}</TableCell>
                                            </TableRow>
                                        )}
                                        {selectedRoom.user && (
                                            <TableRow>
                                                <TableCell style={{ background: "#f1f1f1" }}>Ocupante:</TableCell>
                                                <TableCell>{selectedRoom.user}</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div style={{ textAlign: 'center' }}>
                                {(isOccupancy && isOccupancy != selectedRoom.id && !selectedRoom.user) &&
                                    <Typography variant="body2" marginTop={2}>
                                        Você já está ocupando uma sala!
                                    </Typography>
                                }
                                <Button
                                    variant={Cookies.get("sessionUserName") === selectedRoom.user ? "outlined" : "contained"}
                                    color={Cookies.get("sessionUserName") === selectedRoom.user ? "secondary" : "primary"}
                                    disabled={Cookies.get("sessionUserName") === selectedRoom.user ? false : selectedRoom.status === 'occupied' || isOccupancy}
                                    onClick={Cookies.get("sessionUserName") === selectedRoom.user ? handleFinishOccupation : handleOccupationClick}
                                    style={Cookies.get("sessionUserName") === selectedRoom.user ? { color: "#f00", border: "0.4px solid #f00", marginTop: 15 } : { marginTop: 15 }}
                                >
                                    {Cookies.get("sessionUserName") === selectedRoom.user ? "Finalizar ocupação" : "Ocupar Sala"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
            <ConfirmationDialog
                title={"Confirmação de ocupação"}
                body={"Com isso você torna-se responsável pela sala que está ocupando, bem como dos equipamentos da sala e sua chave."}
                isConfirmationOpen={isConfirmationOpen}
                handleConfirmOccupation={handleConfirmOccupation}
                handleCancelOccupation={handleCancelOccupation}
            />
        </>
    );
};

export default ModalRoom;
