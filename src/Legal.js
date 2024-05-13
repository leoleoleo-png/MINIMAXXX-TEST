import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import "./App.css";
import './other.css';
import TopBar from './TopBar';
import aleonIcon from "./assets/aleonIcon.png"
import barIcon from "./assets/barIcon.png"
import Footer from './Footer';
import { fetchLegal } from './apiCold';

const useDesktopMediaQuery = () =>
    useMediaQuery({ query: "(min-width: 1280px)" })

const useTabletAndBelowMediaQuery = () =>
    useMediaQuery({ query: "(max-width: 1279px)" })

const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery()
    return isDesktop ? children : null
}

const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery()
    return isTabletAndBelow ? children : null
}


function App() {

    const [body, setBody] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const fetchedLegal = await fetchLegal();
            setBody(fetchedLegal);
        };
        fetchData();
    }, []);
    window.scrollTo(0, 0);

    return (
        <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Desktop>
                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    <TopBar mode={false} barIcon={barIcon} aleonIcon={aleonIcon} />
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '250px', paddingBottom:'50px' }}>
                        <h3 style={{ textAlign: 'left', width: '25%' }}>Mentions légales</h3>
                        <div style={{ width: '25%' }}></div>
                        <h3 style={{ textAlign: 'left', width: '50%' }}>{body}</h3>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: '1%', right: '1%' }}><Footer black={true} /></div>
                </div>
            </Desktop >
            <TabletAndBelow>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '200px' }}>
                    <TopBar mode={false} barIcon={barIcon} aleonIcon={aleonIcon} />
                    <h3 style={{ textAlign: 'left', width: '100%', paddingBottom: '60px' }}>Mentions légales</h3>
                    <h3 style={{ textAlign: 'left', width: '100%' }}>{body}</h3>
                    <Footer black={true} />
                </div>
            </TabletAndBelow>
        </div >
    )
}

export default App;


