import Cookies from "js-cookie";
import Style from "../../styles/Home.module.css";

const Room = ({ classroom, handleRoomClick }) => {
    const isOccupancy = Cookies.get("occupancy") == classroom.id ? true : false;
    return (
        <div className={Style.roomItem} data-value="terreo" onClick={() => handleRoomClick(classroom)}>
            <h3 className={Style.nameRoom}>{classroom.short_name}</h3>
            <div className={Style.roomDetails}>
                <div className={classroom.status == "avaliable" ? Style.avaliableStatus : isOccupancy ? Style.occupingStatus : Style.occupiedStatus}>
                    {classroom.status == "avaliable" ? "Disponível" : isOccupancy ? "Ocupando" : "Ocupada"}
                </div>
                <div className={Style.showDetails} width=" 26px">
                    <i class="material-symbols-rounded">add</i>
                </div>
            </div>
        </div>
    );
}

export default Room;