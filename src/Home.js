import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import './App.css';
import './home.css';
import AboutPopup from './AboutPopup';
import ContactPopup from './contact';
import Loading from './loading';
import icon_24 from './assets/icon_24.png';
import invert from './assets/invert.png';
import Stream from './stream';
import cmsDataPromise from './cms/cmsImages.js';
import cmsInfoDataPromise from './cms/cmsInfos.js';
import cmsStreamDataPromise from './cms/cmsStream.js';
import CookiesComponent from './CookiesComponent.js';


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

    const [isStreamLocked, setIsStreamLocked] = useState(true);
    const [isSecret, setIsSecret] = useState(false);
    const [wordmarkUrl, setWordmarkUrl] = useState('');
    const [runnerUrl, setRunnerUrl] = useState('');
    const [iconUrls, setIconUrls] = useState([]);
    const [paragraph1, setParagraph1] = useState('');
    const [paragraph2, setParagraph2] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDetails, setEventDetails] = useState([]);
    const [largeText, setLargeText] = useState('');
    const [largeTextOffline, setLargeTextOffline] = useState('');
    const [isOnline, setIsOnline] = useState(false);
    const [isInverted, setInverted] = useState(false);
    const [isAboutVisible, setIsAboutVisible] = useState(false);
    const [isStreamVisible, setIsStreamVisible] = useState(false);
    const [isContactVisible, setIsContactVisible] = useState(false);
    const [aboutZIndex, setAboutZIndex] = useState(1);
    const [streamZIndex, setStreamZIndex] = useState(2);
    const [contactZIndex, setContactZIndex] = useState(1);
    const [loadingComplete, setLoadingComplete] = useState(false);



    useEffect(() => {
        cmsDataPromise.then(data => {
            if (data) {
                setWordmarkUrl(data.wordmarkUrl);
                setRunnerUrl(data.runnerUrl);
                setIconUrls(data.icons);
            }
        });

        cmsInfoDataPromise.then(infoData => {
            if (infoData) {
                setParagraph1(infoData.paragraphs.paragraph1);
                setParagraph2(infoData.paragraphs.paragraph2);
                setEventName(infoData.eventDetail.eventName);
                setEventDetails(infoData.eventDetail.details);
                setLargeText(infoData.eventDetail.largeText);
                setLargeTextOffline(infoData.eventDetail.largeTextOffline);
            }
        });

        cmsStreamDataPromise.then(streamData => {
            if (streamData) {
                setIsOnline(streamData.online);
                setIsSecret(streamData.secret);
                setIsStreamLocked(streamData.online && streamData.secret);
            }
        });
    }, []);

    const handleStreamUnlock = (isLocked) => {
        setIsStreamLocked(isLocked);
    };

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
        setIsAboutVisible(!isAboutVisible);
        setAboutZIndex(3);
        setStreamZIndex(2);
        setContactZIndex(2);
    };

    const showStream = () => {
        setIsStreamVisible(!isStreamVisible);
        setStreamZIndex(3);
        setAboutZIndex(2);
        setContactZIndex(2);
    };

    const showContact = () => {
        setIsContactVisible(!isContactVisible);
        setContactZIndex(3);
        setAboutZIndex(2);
        setStreamZIndex(2);
    };

    return (
        <div className={isInverted ? "invert-effect" : null} style={{ overflow: 'hidden', width: '100%', flex: 1, background: '#FFFFFF' }}>
            <Desktop>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                        <img src={wordmarkUrl} style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 'calc(24vh)' }} />
                        <img src={runnerUrl} style={{ position: 'absolute', top: 0, right: '0px', width: 'calc(70vh)', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'fixed', top: 'calc(24vh)', left: '4px' }}>
                        <div className="smooth-opacity" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '30px', border: 'solid', padding: '2px 15px', marginRight: '4px', borderWidth: '1px' }}>
                            <h4>ABOUT</h4>
                        </div>
                        <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '30px', border: 'solid', padding: '2px 15px', marginRight: '4px', borderWidth: '1px' }}>
                            <div className={isInverted ? "invert-effect" : null} style={{ height: '7px', width: '7px', animation: isOnline ? 'fadeInOut 1.5s infinite' : 'none', background: isOnline ? '#FF0000' : '#CACACA', borderRadius: '100px', marginRight: '5px' }} />
                            <h4 style={{ margin: 0 }}>LIVE</h4>
                        </div>
                        <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '30px', border: 'solid', padding: '2px 15px', borderWidth: '1px', marginRight: '4px', }}>
                            <h4 >CONTACT</h4>
                        </div>
                        <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '30px', border: 'solid', padding: '2px 15px', borderWidth: '1px' }}>
                            <h4>{isInverted ? 'LIGHT MODE' : 'DARK MODE'}</h4>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'fixed', top: 'calc(24vh)', left: '4px', opacity: 0, zIndex: 100000 }}>
                        <div onClick={showAbout} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '30px', border: 'solid', padding: '2px 15px', marginRight: '4px' }}>
                            <h4 style={{ cursor: 'pointer' }}>ABOUT</h4>
                        </div>
                        <div onClick={showStream} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '30px', border: 'solid', padding: '2px 15px', marginRight: '4px' }}>
                            <div style={{ height: '7px', width: '7px', background: '#CACACA', borderRadius: '100px', marginRight: '5px' }} />
                            <h4 style={{ cursor: 'pointer', margin: 0 }}>LIVE</h4>
                        </div>
                        <div onClick={showContact} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '30px', border: 'solid', padding: '2px 15px' }}>
                            <h4 style={{ cursor: 'pointer' }}>CONTACT</h4>
                        </div>
                        <div onClick={handleInvert} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '30px', border: 'solid', padding: '2px 15px', borderWidth: '1px' }}>
                            <h4>LIGHT MODE</h4>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '4px', left: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '5px', minWidth: '23%', marginBottom: '-4px', maxWidth: '32%' }}>
                            {isOnline ? null : <h2 style={{ fontSize: '22pt', marginBottom: '6px', letterSpacing: '-1px' }}>NEXT EVENT ::</h2>}
                            <h2 style={{ fontSize: '22pt', marginBottom: '4px' }}>{isSecret && isStreamLocked ? 'MINIMAXXX SECRET EVENT' : eventName}</h2>
                            {eventDetails.map((detail, index) => (
                                <h2 key={index} style={index > 3 ? { paddingLeft: '85px' } : { paddingLeft: '25px' }}>
                                    <span style={{ fontWeight: 400 }}>—</span>
                                    {isSecret && isStreamLocked ? '*'.repeat(detail.length) : detail}
                                </h2>
                            ))}
                        </div>
                        <h1 style={{ fontSize: isOnline ? '60pt' : '70pt' }}>{isOnline ? largeText : largeTextOffline}</h1>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '-1%' }}>
                            <h5 style={{ width: '22%', fontSize: '5pt', lineHeight: '4pt', fontWeight: 400 }}>{paragraph1}</h5>
                            <h5 style={{ width: '22%', paddingLeft: '8%', fontSize: '5pt', lineHeight: '4pt', fontWeight: 400 }}>{paragraph2}</h5>
                        </div>
                        <img src={icon_24} style={{ height: '8px', objectFit: 'contain', paddingLeft: '50px', paddingBottom: '5px' }} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingBottom: '10px' }}>
                            {iconUrls.map((iconUrl, index) => (
                                <img key={index} src={iconUrl} style={{ width: index > 3 ? '30px' : '18px', objectFit: 'contain', paddingRight: '5px' }} />
                            ))}
                        </div>
                    </div>
                    {isAboutVisible && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <AboutPopup
                                    paragraph_1={paragraph1}
                                    paragraph_2={paragraph2}
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
                                    mobile={false}
                                    onMinimize={handleMinimizeContact}
                                    zIndex={contactZIndex}
                                    onClick={bringContactToFront}
                                />
                            </div>
                        </div>
                    )}
                </div>
                {isStreamVisible && (
                    <div className={isInverted ? "invert-effect" : null} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                        <div style={{ pointerEvents: 'auto' }}>
                            <Stream
                                onUnlock={handleStreamUnlock}
                                onMinimize={handleMinimizeStream}
                                zIndex={streamZIndex}
                                onClick={bringStreamToFront}
                            />
                        </div>
                    </div>
                )}
                <CookiesComponent />
            </Desktop>
            <TabletAndBelow>
                <div style={{ overflow: 'hidden', flex: 1, width: '100%' }}>
                    <img src={wordmarkUrl} style={{ position: 'absolute', top: '2px', left: '2px', right: '2px', width: '99%', height: 'auto', objectFit: 'contain' }} />
                    <img src={runnerUrl} style={{ position: 'absolute', top: 0, right: '2px', width: '45%', objectFit: 'contain' }} />
                    <div style={{ position: 'absolute', bottom: '50px', left: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '5px', minWidth: '23%', marginBottom: '-4px', maxWidth: '90%' }}>
                            {isOnline ? null : <h2 style={{ fontSize: '20pt', marginBottom: '6px', letterSpacing: '-1px' }}>NEXT EVENT ::</h2>}
                            <h2 style={{ fontSize: '20pt', marginBottom: '4px', letterSpacing: '-1px' }}>{isSecret && isStreamLocked ? 'MINIMAXXX SECRET EVENT' : eventName}</h2>
                            {eventDetails.map((detail, index) => (
                                <h2 key={index} style={index > 3 ? { paddingLeft: '35px', fontSize: '12pt', lineHeight: '10pt' } : { fontSize: '12pt', lineHeight: '10pt' }}>
                                    <span style={{ fontWeight: 400 }}>—</span>
                                    {isSecret && isStreamLocked ? '*'.repeat(detail.length) : detail}
                                </h2>
                            ))}

                        </div>
                        <h1 style={{ fontSize: isOnline ? '50pt' : '60pt' }}>{isOnline ? largeText : largeTextOffline}</h1>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '-1%' }}>
                            <h5 style={{ width: '90%', fontSize: '5pt', lineHeight: '4pt', fontWeight: 400 }}>{paragraph1}</h5>
                            <h5 style={{ width: '90%', paddingLeft: '8%', fontSize: '5pt', lineHeight: '4pt', fontWeight: 400 }}>{paragraph2}</h5>
                        </div>
                        <img src={icon_24} style={{ height: '8px', objectFit: 'contain', paddingLeft: '50px', paddingBottom: '5px' }} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingBottom: '10px' }}>
                            <img src={iconUrls[0]} style={{ width: '18px', objectFit: 'contain', paddingRight: '2px' }} />
                            <img src={iconUrls[1]} style={{ height: '22px', objectFit: 'contain', paddingRight: '5px' }} />
                            <img src={iconUrls[2]} style={{ width: '18px', objectFit: 'contain', paddingRight: '5px' }} />
                            <img src={iconUrls[3]} style={{ width: '18px', objectFit: 'contain', paddingRight: '8px' }} />
                            <img src={iconUrls[4]} style={{ width: '30px', objectFit: 'contain', paddingRight: '6px' }} />
                            <img src={iconUrls[5]} style={{ width: '35px', objectFit: 'contain', paddingRight: '6px' }} />
                            <img src={iconUrls[6]} style={{ width: '30px', objectFit: 'contain' }} />
                        </div>

                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'absolute', bottom: '8px', left: '8px', right: '8px' }}>
                        <div onClick={showAbout} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '35px', border: 'solid', borderWidth: '1px', flexGrow: 1, justifyContent: 'center' }}>
                            <h4 style={{ cursor: 'pointer', margin: 0 }}>ABOUT</h4>
                        </div>
                        <div onClick={showStream} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '35px', border: 'solid', borderWidth: '1px', flexGrow: 1, justifyContent: 'center' }}>
                            <div className={isInverted ? "invert-effect" : null} style={{ height: '7px', width: '7px', animation: isOnline ? 'fadeInOut 1.5s infinite' : 'none', background: isOnline ? '#FF0000' : '#CACACA', borderRadius: '100px', marginRight: '5px' }} />
                            <h4 style={{ cursor: 'pointer', margin: 0 }}>LIVE</h4>
                        </div>
                        <div onClick={showContact} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '35px', border: 'solid', borderWidth: '1px', flexGrow: 1, justifyContent: 'center' }}>
                            <h4 style={{ cursor: 'pointer', margin: 0 }}>CONTACT</h4>
                        </div>
                    </div>


                    {isAboutVisible && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <AboutPopup
                                    mobile
                                    paragraph_1={paragraph1}
                                    paragraph_2={paragraph2}
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
                                    onUnlock={handleStreamUnlock}
                                />
                            </div>
                        </div>
                    )}
                    {isContactVisible && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                            <div style={{ pointerEvents: 'auto' }}>
                                <ContactPopup
                                    mobile={true}
                                    onMinimize={handleMinimizeContact}
                                    zIndex={contactZIndex}
                                    onClick={bringContactToFront}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <CookiesComponent mobile />
            </TabletAndBelow>

            {!loadingComplete && <Loading onComplete={() => setLoadingComplete(true)} />}
        </div>
    );
}

export default App;
