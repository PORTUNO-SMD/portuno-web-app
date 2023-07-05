import Cookies from "js-cookie";
import Header from "../components/head";
import { useRouter } from "next/router";

const Horarios = () => {
    const router = useRouter();
    const sessionToken = Cookies.get('sessionToken');

    if (!sessionToken) {
        router.push('/');
    }

    return (
        <div>
            <Header hasFloor={false} />
        </div>
    );
}

export default Horarios;