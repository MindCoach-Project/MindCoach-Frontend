import React, { useState, useEffect } from 'react';

function Home() {
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setDateTime(now.toLocaleString()); 
        };

        updateDateTime(); 
        const intervalId = setInterval(updateDateTime, 1000); 

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="bg-red90 flex gap-12">
            <p className='text-20 text-brown'>{dateTime}</p> 
        </div>
    );
}

export default Home;