import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData);
                setPending(false);
            } catch (error) {
                setError(error);
                setPending(false);
            }
        };

        fetchData();
    }, [url]);

    return { pending, error, data };
};

export default useFetch;
