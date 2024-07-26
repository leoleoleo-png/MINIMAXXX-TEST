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

    return (
        <div style={{ overflow: 'hidden', flex: 1 }}>
            <Desktop>
                <div style={{ overflow: 'hidden', flex: 1, height: 'calc(100vh)', width: '100%', background: '#CECECE' }}>
                    <Draggable>
                        <div style={{ width: '720px', height: '480px', cursor: 'move', position: 'absolute', background: '#FFFFFF', display:'flex', justifyContent:'flex-end', flexDirection:'column' }}>
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
        </div>
    );
}

export default App;
