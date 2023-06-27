import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Head from 'next/head'; // Importe o componente Head
import Style from "../styles/Home.module.css";
import Room from '../components/room';

const Home = () => {
    const router = useRouter();
    const sessionToken = Cookies.get('sessionToken');
    const [data, setData] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [floor, setFloor] = useState(0);

    useEffect(() => {
        if (!sessionToken) {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        fetch('http://localhost:5000/classrooms')
            .then(response => response.json())
            .then(data => {
                setData(data.data);
                setClassrooms(data.data.filter(classroom => classroom.floor == floor))
            })
            .catch(error => {
                console.error('Error fetching classrooms:', error);
            });
    }, []);

    useEffect(() => {
        setClassrooms(data.filter(classroom => classroom.floor == floor))
    }, [floor])

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </Head>
            <header className={Style.Header}>
                <div className={Style.menuNav}>
                    <img className={Style.Logo} src="assets/logotipo.svg" alt="Portuno" width="250px" />
                    <nav>
                        <ul className={Style.menuOpts}>
                            <li><a href="">Home</a></li>
                            <li><a href="">Ocupação</a></li>
                            <li><a href="">Permissão</a></li>
                            <li><a href="">Perfil</a></li>
                        </ul>
                    </nav>
                </div>
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
            </header>
            <div className={Style.Container}>
                {classrooms && classrooms.map((classroom) => (
                    <Room key={classroom.id} classroom={classroom} />
                ))}
            </div>
        </div>
    );
};

export default Home;
