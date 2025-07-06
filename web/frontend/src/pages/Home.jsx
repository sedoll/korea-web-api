import { useEffect, useState } from 'react';
import { useApi } from '../context/ApiContext';

function Home() {
    const { fetchHello } = useApi();
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        fetchHello()
            .then((msg) => setMessage(msg))
            .catch((err) => setMessage('Error: ' + err.message));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>React + Spring Boot</h1>
            <p>{message}</p>
        </div>
    );
}

export default Home;
