import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import "./App.css";
import './other.css';
import flower from "./assets/flower.png";
import aleonIcon from "./assets/aleonIcon.png";
import barIcon from "./assets/barIcon.png";
import ColorBand from './ColorBand';
import TopBar from './TopBar';
import Footer from './Footer';
import AgeModal from './ageModal';
import Loader from './Loader';
import GalleryCognac from './GalleryCognac';
import { fetchTitle, fetchSubtitle } from './apiCognac';

const useDesktopMediaQuery = () => useMediaQuery({ query: "(min-width: 1280px)" });
const useTabletAndBelowMediaQuery = () => useMediaQuery({ query: "(max-width: 1279px)" });

const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery();
    return isDesktop ? children : null;
};

const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery();
    return isTabletAndBelow ? children : null;
};

function Cognac() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchAndSetTitle = async () => {
            const fetchedTitle = await fetchTitle();
            setTitle(fetchedTitle);
            const fetchedSubtitle = await fetchSubtitle();
            setSubtitle(fetchedSubtitle);
        };
        fetchAndSetTitle();
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Loader delay={300} contents={<div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Desktop>
                <AgeModal isOpen={isModalOpen} onClose={() => handleCloseModal(false)} />
                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    <ColorBand text="DÉCOUVREZ NOTRE BAR À PARIS →" darkMode={true} />
                    <TopBar mode={false} barIcon={barIcon} aleonIcon={aleonIcon} />
                    <Loader delay={150} contents={<h2>{title}</h2>} />
                    <Loader delay={200} contents={<h3 style={{ width: '30%', paddingTop: '50px' }}>{subtitle}</h3>} />
                    <Loader delay={250} contents={<img src={flower} style={{ width: '500px', paddingTop: '40px' }} />} />
                    <GalleryCognac />
                    <Footer black={true} />
                </div>
            </Desktop>
            <TabletAndBelow>
                <AgeModal phone isOpen={isModalOpen} onClose={() => handleCloseModal(false)} />
                <TopBar mode={false} barIcon={barIcon} aleonIcon={aleonIcon} />
                <Loader delay={300} contents={<div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px' }}>
                    <h2 style={{ textAlign: 'center', fontSize: 'calc(8vh)', letterSpacing: 'calc(0.05vh)', width: '100%', paddingTop: '200px' }}>{title}</h2>
                    <h3 style={{ paddingTop: '30px', paddingLeft: '20px', paddingRight: '20px' }}>{subtitle}</h3>
                    <img src={flower} style={{ width: '110%', paddingTop: '40px', alignSelf: 'center' }} />
                    <GalleryCognac phone />
                    <Footer black={true} />
                </div>} />

            </TabletAndBelow>
        </div>} />

    );
}

export default Cognac;
