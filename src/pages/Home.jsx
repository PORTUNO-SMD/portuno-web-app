import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();
    const sessionToken = Cookies.get('sessionToken');
    useEffect(() => {
        if (!sessionToken) {
            router.push('/');
        }
    }, [router]);

    return (
        <div>
        </div>
    );
};

export default Home;
