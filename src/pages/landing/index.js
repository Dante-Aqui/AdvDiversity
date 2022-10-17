import React, { useEffect } from 'react';

import Hero from './Hero';
const Landing = () => {
    useEffect(() => {
        if (document.body) document.body.classList.remove('authentication-bg');
    }, []);

    return (
        <>
            <Hero />
        </>
    );
};

export default Landing;
