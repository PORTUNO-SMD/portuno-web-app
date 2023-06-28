import Style from "../../styles/Home.module.css";

const Room = ({ classroom, handleRoomClick }) => {
    return (
        <div className={Style.roomItem} data-value="terreo" onClick={() => handleRoomClick(classroom)}>
            <h3 className={Style.nameRoom}>{classroom.short_name}</h3>
            <div className={Style.roomDetails}>
                <div className={classroom.status == "avaliable" ? Style.avaliableStatus : Style.occupiedStatus}>
                    {classroom.status == "avaliable" ? "Disponível" : "Ocupada"}
                </div>
                <div className={Style.showDetails} width=" 26px">
                    <i class="material-symbols-rounded">add</i>
                </div>
            </div>
        </div>
    );
}

export default Room;