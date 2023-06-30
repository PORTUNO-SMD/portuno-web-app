import { AccountCircleRounded, BookmarkRounded, CalendarMonth, HomeRounded, KeyRounded, ManageAccountsRounded } from '@mui/icons-material';
import Style from "../../styles/Home.module.css";

const Navbar = ({ sessionUser }) => {
    const renderPermissionLink = () => {
        if (sessionUser.type === "professor") {
            return (
                <li>
                    <a href="">
                        <span>Permissão</span>
                        <KeyRounded className={Style.icons} alt={"permissão"} />
                    </a>
                </li>
            );
        }
        return null;
    };

    const renderManagementLink = () => {
        if (sessionUser.name === "admin") {
            return (
                <li>
                    <a href="">
                        <span>Gerenciamento</span>
                        <ManageAccountsRounded className={Style.icons} alt={"gerenciamento"} />
                    </a>
                </li>
            );
        }
        return null;
    };

    return (
        <nav>
            <ul className={Style.menuOpts}>
                <li>
                    <a href="">
                        <span>Home</span>
                        <HomeRounded className={Style.icons} alt={"home"} />
                    </a>
                </li>
                <li>
                    <a href="">
                        <span>Horários</span>
                        <CalendarMonth className={Style.icons} alt={"horários"} />
                    </a>
                </li>
                <li>
                    <a href="">
                        <span>Reservas</span>
                        <BookmarkRounded className={Style.icons} alt={"reservas"} />
                    </a>
                </li>
                {renderPermissionLink()}
                {renderManagementLink()}
                <li>
                    <a href="">
                        <span>Perfil</span>
                        <AccountCircleRounded className={Style.icons} alt={"perfil"} />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
