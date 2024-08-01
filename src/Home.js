import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import wordmark from './assets/wordmark.png';
import runner from './assets/runner.png';
import './App.css';
import './home.css';
import AboutPopup from './AboutPopup'; // Updated import for the new component

import icon_class from './assets/icon_class.png';
import icon_hot from './assets/icon_hot.png';
import icon_recycle from './assets/icon_recycle.png';
import icon_org from './assets/icon_org.png';
import icon_xxx from './assets/icon_xxx.png';
import icon_ce from './assets/icon_ce.png';
import icon_bin from './assets/icon_bin.png';
import icon_world from './assets/icon_world.png';
import icon_24 from './assets/icon_24.png';
import Stream from './stream';

const useDesktopMediaQuery = () =>
    useMediaQuery({ query: "(min-width: 601px)" });

const useTabletAndBelowMediaQuery = () =>
    useMediaQuery({ query: "(max-width: 600px)" });

const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery();
    return isDesktop ? children : null;
};

const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery();
    return isTabletAndBelow ? children : null;
};

function App() {
    const paragraph_1 = "MINIMAXXX HAS BEEN OPEN FOR MORE THAN A YEAR IN LYON, 9 RUE HENRY IV. BASED ON A CONCEPT OF SELLING SECOND-HAND CLOTHING AND CREATIONS, WE HAVE ALREADY BEEN ESTABLISHED IN THE WORLD OF EVENTS FOR 5 YEARS BY INVESTING IN EMBLEMATIC VENUES IN LYON, WHICH QUICKLY BECAME THE MONTHLY EVENT. IN ADDITION TO RESPONDING TO AN ENVIRONMENTAL PROBLEM, THE IMAGE OF THE SECOND HAND HAS EVOLVED A LOT. IT HAS BECOME A PARTICULARLY FASHIONABLE MODE OF CONSUMPTION.";
    const paragraph_2 = "MINIMAXXX GATHERS AND ASSERTS THE VALUES OF THE SECOND HAND WHILE DETACHING ITSELF FROM THE “VINTAGE” ASPECT, OFTEN ASSOCIATED WITH SECOND-HAND STORES. INDEED, FOR FOUR YEARS THE PROJECT HAS BEEN QUESTIONING THE RELATIONSHIP BETWEEN SECOND HAND AND MODERNITY BY PROPOSING A CURRENT AND INNOVATIVE FORMAT. WITH A UNIFYING FORMAT AS WELL AS THEIR CATCHY UNIVERSE, MINIMAXXX IMMEDIATELY KNEW HOW TO FIND ITS AUDIENCE. SINCE THE OFFICIAL LAUNCH IN SEPTEMBER 2018, THEIR EVENTS HAVE BECOME THE MONTHLY APPOINTMENT NOT TO BE MISSED."

    const [isAboutVisible, setIsAboutVisible] = useState(false);
    const [isStreamVisible, setIsStreamVisible] = useState(true);
    const [aboutZIndex, setAboutZIndex] = useState(1);
    const [streamZIndex, setStreamZIndex] = useState(2);

    const handleMinimizeAbout = () => {
        setIsAboutVisible(false);
    };

    const handleMinimizeStream = () => {
        setIsStreamVisible(false);
    };

    const bringAboutToFront = () => {
        setAboutZIndex(3);
        setStreamZIndex(2);
    };

    const bringStreamToFront = () => {
        setAboutZIndex(2);
        setStreamZIndex(3);
    };

    return (
        <div style={{ overflow: 'hidden', flex: 1, background: '#FFFFFF' }}>
            <Desktop>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%' }}>
                    <img src={wordmark} style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 'calc(25vh)' }} />
                    <img src={runner} style={{ position: 'absolute', top: 0, right: '0px', width: 'calc(75vh)', objectFit: 'contain' }} />
                    <div style={{ position: 'absolute', bottom: '30px', left: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '5px', minWidth: '23%', marginBottom: '-4px' }}>
                            <h2>MINIMAXXX AFTERPARTY</h2>
                            <h2>→ CLOTHES</h2>
                            <h2>→ DJ SETS</h2>
                            <h2>→ PERFORMANCES</h2>
                            <h2 style={{ paddingLeft: '75px' }}>→ 19:00—LATE</h2>
                            <h2 style={{ paddingLeft: '75px' }}>→ 21 RUE HALLÉ, 75014</h2>
                            <h2 style={{ paddingLeft: '75px' }}>→ FREE ENTRY</h2>
                        </div>
                        <h1>HAPPENING NOW</h1>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '-1%' }}>
                            <h5 style={{ width: '22%', fontSize: '5pt', lineHeight: '4pt', fontWeight: 400 }}>{paragraph_1}</h5>
                            <h5 style={{ width: '22%', paddingLeft: '8%', fontSize: '5pt', lineHeight: '4pt', fontWeight: 400 }}>{paragraph_2}</h5>
                        </div>
                        <img src={icon_24} style={{ height: '8px', objectFit: 'contain', paddingLeft: '50px', paddingBottom: '5px' }} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingBottom: '10px' }}>
                            <img src={icon_hot} style={{ width: '18px', objectFit: 'contain', paddingRight: '2px' }} />
                            <img src={icon_org} style={{ height: '22px', objectFit: 'contain', paddingRight: '5px' }} />
                            <img src={icon_recycle} style={{ width: '18px', objectFit: 'contain', paddingRight: '5px' }} />
                            <img src={icon_ce} style={{ width: '18px', objectFit: 'contain', paddingRight: '8px' }} />
                            <img src={icon_class} style={{ width: '30px', objectFit: 'contain', paddingRight: '6px' }} />
                            <img src={icon_world} style={{ width: '35px', objectFit: 'contain', paddingRight: '6px' }} />
                            <img src={icon_bin} style={{ width: '30px', objectFit: 'contain' }} />
                        </div>
                    </div>
                    {isAboutVisible && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <AboutPopup
                                    paragraph_1={paragraph_1}
                                    paragraph_2={paragraph_2}
                                    onMinimize={handleMinimizeAbout}
                                    zIndex={aboutZIndex}
                                    onClick={bringAboutToFront}
                                />
                            </div>
                        </div>
                    )}
                    {isStreamVisible && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <Stream
                                    onMinimize={handleMinimizeStream}
                                    zIndex={streamZIndex}
                                    onClick={bringStreamToFront}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingLeft: 'calc(65vh)', paddingRight: 'calc(65vh)', position: 'fixed', bottom: 0, left: 0, right: 0, height: '30px', borderTopStyle: 'solid', borderTopWidth: '1px', borderTopColor: '#000000', background: '#FFFFFF' }}>
                    <h4 onClick={() => setIsStreamVisible(true)} style={{ cursor: 'pointer', color: 'black', fontSize: '11pt' }}>LIVE</h4>
                    <h4 style={{ color: 'black', fontSize: '11pt' }}>CONTACT</h4>
                    <h4 onClick={() => setIsAboutVisible(true)} style={{ cursor: 'pointer', color: 'black', fontSize: '11pt' }}>ABOUT</h4>
                </div>
            </Desktop>

            <TabletAndBelow>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%' }}>
                    <img src={wordmark} style={{ position: 'absolute', top: '0', left: '0', right: '0', width: '100%', height: 'auto' }} />
                    <img src={runner} style={{ position: 'absolute', top: 0, right: '0px', width: '40%', objectFit: 'contain' }} />
                    <div style={{ position: 'absolute', bottom: '30px', left: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '5px', minWidth: '23%', maxWidth: '90%', marginBottom: '-4px' }}>
                            <h2>MINIMAXXX AFTERPARTY</h2>
                            <h2>→ CLOTHES</h2>
                            <h2>→ DJ SETS</h2>
                            <h2>→ PERFORMANCES</h2>
                            <h2 style={{ paddingLeft: '75px' }}>→ 19:00—LATE</h2>
                            <h2 style={{ paddingLeft: '75px' }}>→ 21 RUE HALLÉ, 75014</h2>
                            <h2 style={{ paddingLeft: '75px' }}>→ FREE ENTRY</h2>
                        </div>
                        <h1>HAPPENING NOW</h1>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '-5%' }}>
                            <h5 style={{ width: '80%', fontSize: '5pt', lineHeight: '4pt', fontWeight: 400 }}>{paragraph_1}</h5>
                            <h5 style={{ width: '80%', paddingLeft: '8%', fontSize: '5pt', lineHeight: '4pt', fontWeight: 400 }}>{paragraph_2}</h5>
                        </div>
                        <img src={icon_24} style={{ height: '8px', objectFit: 'contain', paddingLeft: '50px', paddingBottom: '5px' }} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingBottom: '10px' }}>
                            <img src={icon_hot} style={{ width: '18px', objectFit: 'contain', paddingRight: '2px' }} />
                            <img src={icon_org} style={{ height: '22px', objectFit: 'contain', paddingRight: '5px' }} />
                            <img src={icon_recycle} style={{ width: '18px', objectFit: 'contain', paddingRight: '5px' }} />
                            <img src={icon_ce} style={{ width: '18px', objectFit: 'contain', paddingRight: '8px' }} />
                            <img src={icon_class} style={{ width: '30px', objectFit: 'contain', paddingRight: '6px' }} />
                            <img src={icon_world} style={{ width: '35px', objectFit: 'contain', paddingRight: '6px' }} />
                            <img src={icon_bin} style={{ width: '30px', objectFit: 'contain' }} />
                        </div>
                    </div>
                    {isAboutVisible && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <AboutPopup
                                    mobile
                                    paragraph_1={paragraph_1}
                                    paragraph_2={paragraph_2}
                                    onMinimize={handleMinimizeAbout}
                                    zIndex={aboutZIndex}
                                    onClick={bringAboutToFront}
                                />
                            </div>
                        </div>
                    )}
                    {isStreamVisible && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <Stream
                                    mobile
                                    onMinimize={handleMinimizeStream}
                                    zIndex={streamZIndex}
                                    onClick={bringStreamToFront}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingLeft: '5%', paddingRight: '5%', position: 'fixed', bottom: 0, left: 0, right: 0, height: '30px', borderTopStyle: 'solid', borderTopWidth: '1px', borderTopColor: '#000000', background: '#FFFFFF' }}>
                    <h4 style={{ cursor: 'pointer', color: 'black', fontSize: '11pt' }}>LIVE</h4>
                    <h4 style={{ color: 'black', fontSize: '11pt' }}>CONTACT</h4>
                    <h4 onClick={() => setIsAboutVisible(true)} style={{ cursor: 'pointer', color: 'black', fontSize: '11pt' }}>ABOUT</h4>
                </div>
            </TabletAndBelow>
        </div>
    );
}

export default App;
