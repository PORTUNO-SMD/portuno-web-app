import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Head from 'next/head'; // Importe o componente Head
import Style from "../styles/Home.module.css";
import Room from '../components/room';
import { ST } from 'next/dist/shared/lib/utils';

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
                <img className={Style.Logo} src="assets/logotipo.svg" alt="Portuno" width="250px"/>
                <div className={Style.selectFloor}>
                    <select className={Style.floorSelected} onChange={(e) => setFloor(e.target.value)}>
                        <option value={0}>Térreo</option>
                        <option value={1}>1º Andar</option>
                        <option value={2}>2º Andar</option>
                    </select>
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
