import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import wordmark from './assets/wordmark.png';
import runner from './assets/runner.png';
import './App.css';
import './home.css';
import AboutPopup from './AboutPopup';
import ContactPopup from './contact';
import Loading from './loading';
import icon_class from './assets/icon_class.png';
import icon_hot from './assets/icon_hot.png';
import icon_recycle from './assets/icon_recycle.png';
import icon_org from './assets/icon_org.png';
import icon_ce from './assets/icon_ce.png';
import icon_bin from './assets/icon_bin.png';
import icon_world from './assets/icon_world.png';
import icon_24 from './assets/icon_24.png';
import invert from './assets/invert.png';
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
    const contacts = ["MAIL", "TIKTOK", "INSTAGRAM", "JOBS"];
    const [isInverted, setInverted] = useState(false);
    const [isAboutVisible, setIsAboutVisible] = useState(false);
    const [isStreamVisible, setIsStreamVisible] = useState(true);
    const [isContactVisible, setIsContactVisible] = useState(false);
    const [aboutZIndex, setAboutZIndex] = useState(1);
    const [streamZIndex, setStreamZIndex] = useState(2);
    const [contactZIndex, setContactZIndex] = useState(1);
    const [loadingComplete, setLoadingComplete] = useState(false);

    const handleMinimizeAbout = () => {
        setIsAboutVisible(false);
    };

    const handleInvert = () => {
        setInverted(!isInverted);
    };

    const handleMinimizeStream = () => {
        setIsStreamVisible(false);
    };

    const handleMinimizeContact = () => {
        setIsContactVisible(false);
    };

    const bringAboutToFront = () => {
        setAboutZIndex(3);
        setStreamZIndex(2);
        setContactZIndex(2);
    };

    const bringStreamToFront = () => {
        setAboutZIndex(2);
        setStreamZIndex(3);
        setContactZIndex(2);
    };

    const bringContactToFront = () => {
        setAboutZIndex(2);
        setStreamZIndex(2);
        setContactZIndex(3);
    };

    const showAbout = () => {
        setIsAboutVisible(true);
        setAboutZIndex(3);
        setStreamZIndex(2);
        setContactZIndex(2);
    };

    const showStream = () => {
        setIsStreamVisible(true);
        setStreamZIndex(3);
        setAboutZIndex(2);
        setContactZIndex(2);
    };

    const showContact = () => {
        setIsContactVisible(true);
        setContactZIndex(3);
        setAboutZIndex(2);
        setStreamZIndex(2);
    };

    return (
        <div className={isInverted ? "invert-effect" : null} style={{ overflow: 'hidden', flex: 1, background: '#FFFFFF' }}>
            <Desktop>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%' }}>
                    {/*  <div style={{ position: 'absolute', left: window.innerWidth * 0.2, display: 'flex', flexDirection: 'column', transform: 'scaleX(-10) scaleY(12) ', opacity: 0.03 }}>
                        <h2>MINIMAXXX AFTERPARTY</h2>
                        <h2>→ CLOTHES</h2>
                        <h2>→ DJ SETS</h2>
                        <h2>→ PERFORMANCES</h2>
                        <h2 style={{ paddingLeft: '75px' }}>→ 19:00—LATE</h2>
                        <h2 style={{ paddingLeft: '75px' }}>→ 21 RUE HALLÉ, 75014</h2>
                        <h2 style={{ paddingLeft: '75px' }}>→ FREE ENTRY</h2>
                    </div> */}
                    <img src={wordmark} style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 'auto', objectFit: 'contain' }} />
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

                    {isContactVisible && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <ContactPopup
                                    contacts={contacts}
                                    mobile={false}
                                    onMinimize={handleMinimizeContact}
                                    zIndex={contactZIndex}
                                    onClick={bringContactToFront}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingLeft: '30%', paddingRight: '30%', position: 'fixed', bottom: 0, left: 0, right: 0, height: '30px', borderTopStyle: 'solid', borderTopWidth: '0.5px', borderTopColor: '#000000', background: '#FFFFFF' }}>
                    <h4 onClick={showStream} style={{ cursor: 'pointer' }}>LIVE</h4>
                    <h4 onClick={showContact} style={{ cursor: 'pointer' }}>CONTACT</h4>
                    <h4 onClick={showAbout} style={{ cursor: 'pointer' }}>ABOUT</h4>
                    <img
                        onClick={handleInvert}
                        src={invert}
                        style={{ position: 'absolute', right: '5px', width: '21px', height: '21px', cursor: 'pointer' }}
                    />
                </div>
                {isStreamVisible && (
                    <div className={isInverted ? "invert-effect" : null} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                        <div style={{ pointerEvents: 'auto' }}>
                            <Stream
                                onMinimize={handleMinimizeStream}
                                zIndex={streamZIndex}
                                onClick={bringStreamToFront}
                            />
                        </div>
                    </div>
                )}
            </Desktop>

            <TabletAndBelow>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%' }}>



                    <img src={wordmark} style={{ position: 'absolute', top: '0', left: '0', right: '0', width: '100%', height: 'auto', objectFit: 'contain' }} />
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
                        <div className={isInverted ? "invert-effect" : null} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
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
                    {isContactVisible && ( // New ContactPopup for mobile
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <ContactPopup
                                    contacts={contacts}
                                    mobile={true}
                                    onMinimize={handleMinimizeContact}
                                    zIndex={contactZIndex}
                                    onClick={bringContactToFront}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingLeft: '10%', paddingRight: '10%', position: 'fixed', bottom: 0, left: 0, right: 0, height: '30px', borderTopStyle: 'solid',  borderTopWidth: '0.5px', borderTopColor: '#000000', background: '#FFFFFF' }}>
                    <h4 onClick={showStream} style={{ cursor: 'pointer' }}>LIVE</h4>
                    <h4 onClick={showContact} style={{ cursor: 'pointer' }}>CONTACT</h4>
                    <h4 onClick={showAbout} style={{ cursor: 'pointer' }}>ABOUT</h4>
                    <img
                        onClick={handleInvert}
                        src={invert}
                        style={{ position: 'absolute', right: '5px', width: '21px', height: '21px', cursor: 'pointer' }}
                    />
                </div>
            </TabletAndBelow>
            {!loadingComplete && <Loading onComplete={() => setLoadingComplete(true)} />}
        </div>
    );
}

export default App;
