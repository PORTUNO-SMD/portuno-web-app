import Cookies from "js-cookie";
import Header from "../components/head";
import { useRouter } from "next/router";

const Horarios = () => {
    const router = useRouter();
    const sessionToken = Cookies.get('sessionToken');

    return (
        <div>
            <Header hasFloor={false} />
        </div>
    );
}

export default Horarios;