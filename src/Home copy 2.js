/* global YT */
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Draggable from 'react-draggable';
import './App.css';
import './home.css';

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
    const [embedUrl, setEmbedUrl] = useState('https://player.twitch.tv/?channel=leounveil&parent=minimaxxx-test.vercel.app');

    const toggleEmbedUrl = () => {
        setEmbedUrl((prevUrl) => 
            prevUrl === 'https://player.twitch.tv/?channel=leounveil&parent=minimaxxx-test.vercel.app'
                ? 'https://player.twitch.tv/?channel=leounveil&parent=localhost'
                : 'https://player.twitch.tv/?channel=leounveil&parent=minimaxxx-test.vercel.app'
        );
    };

    window.scrollTo(0, 3000);
    return (
        <div style={{ overflow: 'hidden', flex: 1 }}>
            <Desktop>
                <div style={{ overflow: 'hidden', flex: 1 }}>
                    <Draggable>
                        <iframe
                            style={{ width: '320px', height: '180px', cursor: 'move', zIndex: 1000 }}
                            src={embedUrl}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Live Stream"
                        ></iframe>
                    </Draggable>
                    {/* <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: '85%', backgroundColor: '#FFFFFF' }}></div>
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, top: '85%', backgroundColor: '#FFFFFF' }}></div>
                    <div style={{ position: 'fixed', bottom: 0, top: 0, left: 0, right: '90%', backgroundColor: '#FFFFFF' }}></div>
                    <div style={{ position: 'fixed', bottom: 0, top: 0, right: 0, left: '90%', backgroundColor: '#FFFFFF' }}></div> */}

               {/*      <div style={{ position: 'fixed', top: '11%', left: '10%', right: '10%', bottom: '85%', backgroundColor: '#EEEEEE', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <p style={{fontWeight:'400', paddingLeft:'8px', fontSize:'12px'}}>MINIMAXXX LIVESTREAM</p>
                        <p style={{fontWeight:'400', paddingRight:'8px', fontSize:'12px'}}>24.12.24 POP-UP</p>
                    </div> */}
                </div>
            </Desktop>
            <TabletAndBelow>
                <div style={{ flex: 1 }}>
                    <Draggable>
                        <iframe
                            style={{ position: 'absolute', width: '320px', height: '180px', cursor: 'move', zIndex: 1000 }}
                            src={embedUrl}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Live Stream"
                        ></iframe>
                    </Draggable>
                    <div style={{ overflow: 'hidden', flex: 1 }}>
                        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: '85%', backgroundColor: '#FFFFFF' }}></div>
                        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, top: '85%', backgroundColor: '#FFFFFF' }}></div>
                        <div style={{ position: 'fixed', bottom: 0, top: 0, left: 0, right: '90%', backgroundColor: '#FFFFFF' }}></div>
                        <div style={{ position: 'fixed', bottom: 0, top: 0, right: 0, left: '90%', backgroundColor: '#FFFFFF' }}></div>

                        <div style={{ position: 'fixed', top: '11%', left: '10%', right: '10%', bottom: '85%', backgroundColor: '#EEEEEE', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                            <p style={{fontWeight:'400', paddingLeft:'8px', fontSize:'12px'}}>MINIMAXXX LIVESTREAM</p>
                            <p style={{fontWeight:'400', paddingRight:'8px', fontSize:'12px'}}>24.12.24 POP-UP</p>
                        </div>
                    </div>
                </div>
            </TabletAndBelow>
            <button onClick={toggleEmbedUrl} style={{ position: 'fixed', bottom: '10px', right: '10px', padding: '10px', zIndex: 1000 }}>
                Toggle Embed URL
            </button>
        </div>
    );
}

export default App;
