import Cookies from "js-cookie";
import Header from "../components/head";

const Horarios = () => {
    const sessionToken = Cookies.get('sessionToken');

    return (
        <div>
            <Header hasFloor={false} />
        </div>
    );
}

export default Horarios;