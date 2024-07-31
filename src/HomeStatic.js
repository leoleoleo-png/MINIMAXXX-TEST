/* global YT */
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Draggable from 'react-draggable';
import wordmark from './assets/wordmark.png';
import runner from './assets/runner.png';
import './App.css';
import './home.css';
import Stream from './stream';
import NavBarDesktop from './navBarDesktop';


import icon_class from './assets/icon_class.png';
import icon_hot from './assets/icon_hot.png';
import icon_world from './assets/icon_world.png';
import icon_recycle from './assets/icon_recycle.png';

import icon_xxx from './assets/icon_xxx.png';
import icon_ce from './assets/icon_ce.png';

import icon_van from './assets/icon_van.png';
import icon_bin from './assets/icon_bin.png';

import icon_2024 from './assets/icon_2024.png';
import icon_24 from './assets/icon_24.png';

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
    const [embedUrl, setEmbedUrl] = useState('https://player.twitch.tv/?channel=leounveil&parent=minimaxxx-test.vercel.app&autoplay=true&muted=false');

    const toggleEmbedUrl = () => {
        setEmbedUrl((prevUrl) =>
            prevUrl.includes('minimaxxx-test.vercel.app')
                ? 'https://player.twitch.tv/?channel=leounveil&parent=localhost&autoplay=true&muted=false'
                : 'https://player.twitch.tv/?channel=leounveil&parent=minimaxxx-test.vercel.app&autoplay=true&muted=false'
        );
    };

    const toggleMute = () => {
        setEmbedUrl((prevUrl) =>
            prevUrl.includes('muted=false')
                ? prevUrl.replace('muted=false', 'muted=true')
                : prevUrl.replace('muted=true', 'muted=false')
        );
    };

    return (
        <div style={{ overflow: 'hidden', flex: 1, background: '#FFFFFF' }}>
            <Desktop>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%' }}>
                    <img src={wordmark} style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 'calc(24vh)' }} />
                    <img src={runner} style={{ position: 'absolute', top: 0, right: '20px', width: 'calc(70vh)', objectFit: 'contain' }} />

                    <Draggable>
                        <h5 style={{ cursor: 'move', position: 'absolute', top: 'calc(23.3vh)', left: '45%', width: '25%' }}>MINIMAXXX IS AN EVENT BASED SECOND HAND CLOTHING STORE. IT ORGANISES MULTIMEDIA EVENTS INCLUDING BUT NOT LIMITED TO DJ SETS, ART PERFORMANCES AND WORKSHOPS, WHILE OFFERING A CURATED STOCK OF SECOND HAND CLOTHES, ALL AT A MAXXXIMUM OF 10€.</h5>
                    </Draggable>
                    <div style={{ position: 'absolute', bottom: '30px', left: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>HAPPENING NOW</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '5px', paddingLeft: '100px' }}>
                            <h2>MINIMAXXX AFTERPARTY</h2>
                            <h2>→ 19:00—LATE</h2>
                            <h2>→ 21 RUE HALLÉ, 75014</h2>
                            <h2 style={{ paddingLeft: '75px' }}>→ CLOTHES</h2>
                            <h2 style={{ paddingLeft: '100px' }}>→ DJ SETS</h2>
                            <h2 style={{ paddingLeft: '150px' }}>→ PERFORMANCES</h2>
                        </div>
                        <div>

                            <img src={icon_2024} style={{ height: '8px', objectFit: 'contain', paddingLeft: '50px', paddingBottom: '10px' }} />

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px' }}>

                                <img src={icon_24} style={{ height: '10px', objectFit: 'contain', paddingRight: '50px' }} />
                                <img src={icon_bin} style={{ height: '30px', objectFit: 'contain', paddingRight: '10px' }} />
                                <img src={icon_van} style={{ height: '30px', objectFit: 'contain' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px' }}>
                                <img src={icon_xxx} style={{ height: '25px', objectFit: 'contain', paddingRight: '5px' }} />
                                <img src={icon_ce} style={{ height: '25px', objectFit: 'contain' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px' }}>
                                <Draggable>
                                    <div style={{ cursor: 'move' }}>
                                        <img src={icon_hot} style={{ pointerEvents: 'none', cursor: 'move', width: '30px', objectFit: 'contain' }} />
                                    </div>

                                </Draggable>
                                <img src={icon_recycle} style={{ width: '30px', objectFit: 'contain', paddingRight: '5px' }} />
                                <img src={icon_world} style={{ width: '30px', objectFit: 'contain', paddingRight: '5px' }} />
                                <img src={icon_class} style={{ width: '30px', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                    <Stream />
                </div>
                <NavBarDesktop />
            </Desktop>

            <TabletAndBelow>

            </TabletAndBelow>
        </div>
    );
}

export default App;
