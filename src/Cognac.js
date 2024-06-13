import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import "./App.css";
import './other.css';
import aleonIcon from "./assets/aleonIcon.png";
import barIcon from "./assets/barIcon.png";
import ColorBand from './ColorBand';
import TopBar from './TopBar';
import Footer from './Footer';
import AgeModal from './ageModal';
import Loader from './Loader';
import { fetchCognacData } from './apiCognac';
import GalleryProducts from './GalleryProducts';

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
    const [paragraph1, setParagraph1] = useState('');
    const [paragraph2, setParagraph2] = useState('');
    const [paragraph3, setParagraph3] = useState('');
    const [flowerUrl, setFlowerUrl] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchAndSetCognacData = async () => {
            const cognacData = await fetchCognacData();
            if (cognacData) {
                setTitle(cognacData.title);
                setParagraph1(cognacData.paragraph1);
                setParagraph2(cognacData.paragraph2);
                setParagraph3(cognacData.paragraph3);
                setFlowerUrl(cognacData.flower.url);
            }
        };
        fetchAndSetCognacData();
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Loader delay={300} contents={
            <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Desktop>
                    
                    <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <ColorBand text="DÉCOUVREZ NOTRE BAR À PARIS →" darkMode={true} />
                        <TopBar mode={false} barIcon={barIcon} aleonIcon={aleonIcon} />
                        <h2>{title}</h2>
                        <h3 style={{ width: '30%', paddingTop: '50px' }}>{paragraph1}</h3>
                        <h3 style={{ width: '30%' }}>{paragraph2}</h3>
                        <h3 style={{ width: '30%' }}>{paragraph3}</h3>
                        <img src={flowerUrl} style={{ width: '600px', paddingTop: '40px' }} alt="Flower" />
                        <GalleryProducts />
                        <Footer black={true} />
                  
                    </div>
                    <AgeModal isOpen={isModalOpen} onClose={handleCloseModal} />
                   
                </Desktop>
                <TabletAndBelow>
                    <AgeModal phone isOpen={isModalOpen} onClose={handleCloseModal} />
                    <TopBar mode={false} barIcon={barIcon} aleonIcon={aleonIcon} />
                    <Loader delay={300} contents={
                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px' }}>
                            <h2 style={{ textAlign: 'center', fontSize: 'calc(8vh)', letterSpacing: 'calc(0.05vh)', width: '100%', paddingTop: '200px' }}>{title}</h2>
                            <h3 style={{ paddingTop: '30px', paddingLeft: '20px', paddingRight: '20px' }}>{paragraph1}</h3>
                            <h3 style={{ paddingLeft: '20px', paddingRight: '20px' }}>{paragraph2}</h3>
                            <h3 style={{ paddingLeft: '20px', paddingRight: '20px' }}>{paragraph3}</h3>
                            <img src={flowerUrl} style={{ width: '110%', paddingTop: '40px', alignSelf: 'center' }} alt="Flower" />
                            <GalleryProducts phone />
                            <Footer black={true} />
                        </div>}
                    />
                </TabletAndBelow>
            </div>}
        />
    );
}

export default Cognac;
