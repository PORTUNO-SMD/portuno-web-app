import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Head from 'next/head'; // Importe o componente Head
import Style from "../styles/Home.module.css";
import Room from '../components/room';

const Home = () => {
    const router = useRouter();
    const sessionToken = Cookies.get('sessionToken');
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        if (!sessionToken) {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        fetch('http://localhost:5000/classrooms')
            .then(response => response.json())
            .then(data => {
                setClassrooms(data.data);
            })
            .catch(error => {
                console.error('Error fetching classrooms:', error);
            });
    }, []);

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </Head>

            <div className={Style.Container}>
                {classrooms && classrooms.map((classroom) => (
                    <Room key={classroom.id} classroom={classroom} />
                ))}
            </div>
        </div>
    );
};

export default Home;
