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
        <div style={{ overflow: 'hidden', flex: 1 }}>
            <Desktop>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%', background: '#CECECE' }}>
                    <Draggable>
                        <div style={{ width: '720px', height: '437px', cursor: 'move', position: 'absolute', background: '#FFFFFF', display:'flex', justifyContent:'flex-end', flexDirection:'column' }}>
                            <p style={{width:'100%', alignSelf:'center', textAlign:'center', fontSize:'10px'}}>DRAG ME AROUND</p>
                            <iframe
                                style={{ width: '100%', height: '450px' }}
                                src={embedUrl}
                                frameBorder="0"
                                /* allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" */
                               /*  allow="autoplay" */
                                allowFullScreen={false}
                                title="Live Stream"
                            ></iframe>
                    
                        </div>
                    </Draggable>
                </div>
            </Desktop>
            <TabletAndBelow>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%', background: '#CECECE' }}>
                    <Draggable>
                        <div style={{ width: '80%', height: 'auto', cursor: 'move', position: 'absolute', background: '#FFFFFF', display:'flex', justifyContent:'flex-end', flexDirection:'column' }}>
                            <p style={{width:'100%', alignSelf:'center', textAlign:'center', fontSize:'10px'}}>DRAG ME AROUND</p>
                            <iframe
                                style={{ width: '100%', height: '94%' }}
                                src={embedUrl}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Live Stream"
                            ></iframe>
                        </div>
                    </Draggable>
                </div>
            </TabletAndBelow>
            <button onClick={toggleEmbedUrl} style={{ position: 'fixed', bottom: '10px', right: '10px', padding: '10px', zIndex: 1000 }}>
                Toggle Embed URL
            </button>
            <button onClick={toggleMute} style={{ position: 'fixed', bottom: '50px', right: '10px', padding: '10px', zIndex: 1000 }}>
                Toggle Mute
            </button>
        </div>
    );
}

export default App;
