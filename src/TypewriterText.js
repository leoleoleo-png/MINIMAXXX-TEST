import React, { useState, useEffect } from 'react';

function useTypewriter(text, speed = 10, startDelay = 2000) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
                if (currentIndex === text.length) {
                    clearInterval(interval);
                }
            }, speed);

            return () => clearInterval(interval);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [text, speed, startDelay]);

    return displayedText;
}

const TypewriterText = ({ text, speed, startDelay }) => {
    const typedText = useTypewriter(text, speed, startDelay);
    return <span>{typedText}</span>;
};

export default TypewriterText;