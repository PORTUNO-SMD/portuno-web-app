import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Style from "../styles/Home.module.css";
import Room from '../components/room';
import ModalRoom from '../components/room/Modal';
import Header from '../components/head';
import useFetch from '../hooks/useFetch';
import Cookies from 'js-cookie';
import { CircularProgress } from '@mui/material';

const Home = () => {
    const router = useRouter();
    const sessionToken = Cookies.get('sessionToken');
    const [floor, setFloor] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [classrooms, setClassrooms] = useState([]);

    const { pending, error, data } = useFetch('http://localhost:5000/classrooms');

    useEffect(() => {
        if (data && sessionToken) {
            fetch(`http://127.0.0.1:5000/occupancies/user/${Cookies.get('sessionUserId')}`)
                .then(response => response.json())
                .then(occupancyData => {
                    if (occupancyData.message === "Occupancy not found") {
                        Cookies.remove("occupancy");
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [data, sessionToken]);

    useEffect(() => {
        if (!sessionToken) {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        if (data) {
            setClassrooms(data.data.filter(classroom => classroom.floor == floor));
        }
    }, [data, floor]);

    const handleOpenModal = (room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleRoomClick = (room) => {
        handleOpenModal(room);
    };

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </Head>
            <Header floor={floor} setFloor={setFloor} />
            <div className={Style.Container}>
                {pending && <CircularProgress color="primary" />}
                {!pending && error &&
                    <div className={Style.ErrorMessage}>
                        <p>{errorMessage}</p>
                    </div>
                }
                {!pending && !error && classrooms && classrooms.map((classroom) => (
                    <Room key={classroom.id} classroom={classroom} handleRoomClick={handleRoomClick} />
                ))}
            </div>
            <ModalRoom selectedRoom={selectedRoom} handleCloseModal={handleCloseModal} isModalOpen={isModalOpen} />
        </div>
    );
};

export default Home;