import Style from "../../styles/Home.module.css";
import { useState } from 'react';
import {
    Modal,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const ModalRoom = ({ selectedRoom, isModalOpen, handleCloseModal }) => {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const handleOccupationClick = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirmOccupation = () => {
        // Aqui você pode adicionar a lógica para ocupar a sala
        setIsConfirmationOpen(false);
    };

    const handleCancelOccupation = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <div className={Style.modalContent}>
                    {selectedRoom && (
                        <div>
                            <Typography variant="h5" component="h2" fontWeight={700} marginBottom={1}>
                                {selectedRoom.name}
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Piso:</TableCell>
                                            <TableCell>{selectedRoom.floor == 0 ? "Térreo" : selectedRoom.floor + "º andar"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Tipo de sala:</TableCell>
                                            <TableCell>{selectedRoom.type}</TableCell>
                                        </TableRow>
                                        {selectedRoom.professor && (
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Responsável pela sala:</TableCell>
                                                <TableCell>{selectedRoom.professor}</TableCell>
                                            </TableRow>
                                        )}
                                        {selectedRoom.user && (
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Ocupante:</TableCell>
                                                <TableCell>{selectedRoom.user}</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={selectedRoom.status === 'occupied'}
                                onClick={handleOccupationClick}
                                style={{marginTop: 10}}
                            >
                                Ocupar Sala
                            </Button>
                        </div>
                    )}
                </div>
            </Modal>
            <Dialog open={isConfirmationOpen} onClose={handleCancelOccupation} style={{ textAlign: "center" }}>
                <DialogTitle>
                    Confirmação de solicitação
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Deseja confirmar a ocupação da sala?</Typography>
                </DialogContent>
                <DialogActions style={{ margin: "auto" }}>
                    <Button onClick={handleConfirmOccupation} variant="contained" color="primary">
                        Confirmar
                    </Button>
                    <Button onClick={handleCancelOccupation} variant="contained" color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


export default ModalRoom;