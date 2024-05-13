import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import LocalizedStrings from 'react-localization';
import "./App.css";
import './other.css';
import TopBar from './TopBar';
import aleonIcon from "./assets/aleonIcon.png";
import barIcon from "./assets/barIcon.png";
import ColorBand from './ColorBand';
import Gallery from './Gallery';
import Footer from './Footer';
import Loader from './Loader';
import { fetchTitle, fetchSubtitle } from './apiBar';

const useDesktopMediaQuery = () =>
    useMediaQuery({ query: "(min-width: 1280px)" });

const useTabletAndBelowMediaQuery = () =>
    useMediaQuery({ query: "(max-width: 1279px)" });

const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery();
    return isDesktop ? children : null;
};

const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery();
    return isTabletAndBelow ? children : null;
};

function App() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTitle = await fetchTitle();
            const fetchedSubtitle = await fetchSubtitle();
            setTitle(fetchedTitle);
            setSubtitle(fetchedSubtitle);
        };
        fetchData();
    }, []);

    window.scrollTo(0, 0);
    return (
        <Loader delay={300} contents={<div style={{ flex: 1, minHeight: 'calc(100vh)', width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#1A1A1A' }}>
            <Desktop>
                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    <ColorBand text="DÉCOUVREZ NOTRE COGNAC →" darkMode={false} />
                    <TopBar mode={true} barIcon={barIcon} aleonIcon={aleonIcon} />
                    <Loader delay={150} contents={<h2 style={{ color: '#FCC303', width: '60%', paddingTop: '150px' }}>{title}</h2>} />
                    <Loader delay={150} contents={<h3 style={{ width: '30%', paddingTop: '50px', color: '#FCC303' }}>{subtitle}</h3>} />
                    <Gallery />
                    <Footer black={false} />
                </div>
            </Desktop>
            <TabletAndBelow>
                <TopBar mode={true} barIcon={barIcon} aleonIcon={aleonIcon} />
                <Loader delay={300} contents={<div style={{ width: '100%', display: 'flex', flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px' }}>
                    <a style={{ width: '100%', paddingTop: '200px' }} target='blank' href='https://www.google.com/maps/place/35+Rue+Saint-Sauveur,+75002+Paris,@48.8660551,2.345798,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66e19d43340b1:0x3422baba6117b7a9!8m2!3d48.8660551!4d2.3483729!16s%2Fg%2F11cshhkpfk?entry=ttu'>
                        <h3 style={{ textAlign: 'center', color: '#FCC303', margin: 0, padding: 0 }}>
                            35 rue Saint-Sauver<br />75002 Paris<br />Ouvert du Lundi au Samedi<br />18h30 - 02h00
                        </h3>
                    </a>
                    <h2 style={{ color: '#FCC303', textAlign: 'center', fontSize: 'calc(8vh)', letterSpacing: 'calc(0.05vh)', width: '100%', lineHeight: '120%' }}>{title}</h2>
                    <h3 style={{ paddingTop: '30px', paddingLeft: '20px', paddingRight: '20px', color: '#FCC303' }}>{subtitle}</h3>
                    <Gallery phone />
                    <Footer black={false} />
                </div>} />
            </TabletAndBelow>
        </div>} />

    );
}

export default App;

let strings = new LocalizedStrings({
    en: {

    },
    fr: {

    },
});
