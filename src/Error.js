import React from 'react';
import { useMediaQuery } from 'react-responsive'
import "./App.css";
import './other.css';
import TopBar from './TopBar';
import aleonIcon from "./assets/aleonIcon.png"
import barIcon from "./assets/barIcon.png"
import Gallery from './Gallery';
import Footer from './Footer';

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
    window.scrollTo(0, 0);
    return (
        <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Desktop>
                <div className='full'>
                    <TopBar mode={false} barIcon={barIcon} aleonIcon={aleonIcon} />
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '250px' }}>
                        <h3 style={{ textAlign: 'left', color: '#8C8C8C', padding: 0, margin: 0 }}>404, Page non trouvée</h3>
                        <a href='/'><h3 style={{ textAlign: 'left', textDecorationLine: 'underline', paddingTop: '10px', margin: 0 }}>Retour sur la page d’accueil</h3></a>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: '1%', right: '1%' }}><Footer black={true} /></div>
                </div>
            </Desktop >
            <TabletAndBelow>
                <div style={{ width: '100%', paddingLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 'calc(100vh)' }}>
                    <TopBar mode={false} barIcon={barIcon} aleonIcon={aleonIcon} />
                    <div style={{ paddingBottom: '5px' }}>
                        <h3 style={{ textAlign: 'left', width: '100%', color: '#8C8C8C', margin: 0 }}>404, Page non trouvée</h3>
                        <a href='/'><h3 style={{ textAlign: 'left', textDecorationLine: 'underline', margin: 0, paddingBottom: '220px' }}>Retour sur la page d’accueil</h3></a>
                        <Footer black={true} />
                    </div>

                </div>
            </TabletAndBelow>
        </div >
    )
}

export default App;


