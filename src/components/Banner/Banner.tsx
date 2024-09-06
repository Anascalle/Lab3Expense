import React from 'react';
import './Banner.css';

interface BannerProps {
    title?: string;
    showButton?: boolean; 
    onReset?: () => void; 
}

const Banner: React.FC<BannerProps> = ({ title, showButton, onReset }) => {
    return (
        <header className='banner-section'>
            {title && <h1 className='banner-title'>{title}</h1>}
            {showButton && (
                <button className='reset-button' onClick={onReset}>RESET APP</button>
            )}
        </header>
    );
};

export default Banner;
