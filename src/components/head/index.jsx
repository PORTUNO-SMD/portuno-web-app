
import Cookies from "js-cookie";
import Style from "../../styles/Home.module.css";
import Navbar from "../navbar";

const Header = ({ floor, setFloor, hasFloor = true }) => {

    const sessionUser = {
        id: Cookies.get("sessionUserId"),
        name: Cookies.get("sessionUserName"),
        type: Cookies.get("sessionUserType")
    }

    return (
        <header className={Style.Header}>
            <div className={Style.menuNav}>
                <img className={Style.Logo} src="assets/logotipo.svg" alt="Portuno" width="250px" />
                <Navbar sessionUser={sessionUser} />
            </div>
            {hasFloor &&
                <div className={Style.selectFloor}>
                    <div className={Style.floorSelected}>
                        <label>
                            <input
                                type="radio"
                                name="floor"
                                value={0}
                                checked={floor === 0}
                                onChange={() => setFloor(0)}
                                className={Style.radioButton}
                            />
                            <span className={Style.radioButtonLabel}>Térreo</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="floor"
                                value={1}
                                checked={floor === 1}
                                onChange={() => setFloor(1)}
                                className={Style.radioButton}
                            />
                            <span className={Style.radioButtonLabel}>1º Andar</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="floor"
                                value={2}
                                checked={floor === 2}
                                onChange={() => setFloor(2)}
                                className={Style.radioButton}
                            />
                            <span className={Style.radioButtonLabel}>2º Andar</span>
                        </label>
                    </div>
                </div>
            }
        </header>
    );
}

export default Header;