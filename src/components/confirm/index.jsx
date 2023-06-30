import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const ConfirmationDialog = ({ title, body, isConfirmationOpen, handleCancelOccupation, handleConfirmOccupation }) => {
    return (
        <Dialog open={isConfirmationOpen} onClose={handleCancelOccupation} style={{ textAlign: "center" }}>
            <DialogTitle fontSize={18} fontWeight={600}>
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2">{body}</Typography>
            </DialogContent>
            <DialogActions style={{ margin: "auto" }}>
                <Button onClick={handleCancelOccupation} variant="outlined" color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirmOccupation} variant="contained" color="primary">
                    Confirmar
                </Button>
            </DialogActions>
            <br />
        </Dialog>
    );
}

export default ConfirmationDialog;