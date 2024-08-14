import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';
import move from './assets/move.png';
import resize_black from './assets/resize_black.png';
import resize from './assets/resize.png';
import minimise from './assets/minimise.png';
import cmsStreamDataPromise from './cms/cmsStream.js';
import './squares.css';

const Stream = ({ mobile, onMinimize, zIndex, onClick, onUnlock }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [isResizing, setIsResizing] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [password, setPassword] = useState(new Array(6).fill(''));
    const [maskedPassword, setMaskedPassword] = useState(new Array(6).fill(''));
    const [wrongPassword, setWrongPassword] = useState(false);
    const [cmsPassword, setCmsPassword] = useState('');
    const [streamLink, setStreamLink] = useState('');
    const [streamTitle, setStreamTitle] = useState('MINIMAXXX PARIS AFTERPARTY');
    const [streamTitleOffline, setStreamTitleOffline] = useState('OFFLINE');
    const [infos, setInfos] = useState([]);
    const [infoOverlay, setInfoOverlay] = useState(false);
    const dragHandleRef = useRef(null);
    const resizableBoxRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });
    const [isPlaying, setIsPlaying] = useState(false);

    const handleStart = () => {
        if (resizableBoxRef.current) {
            resizableBoxRef.current.style.pointerEvents = 'none';
        }
    };

    const handleStop = () => {
        if (resizableBoxRef.current) {
            resizableBoxRef.current.style.pointerEvents = 'auto';
        }
    };

    const formatDate = (date) => {
        const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        const day = days[date.getDay()];
        const dayNumber = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day} ${dayNumber} ${month} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(formatDate(now));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const onResizeStart = () => {
        setIsResizing(true);
    };

    const onResizeStop = () => {
        setIsResizing(false);
        updateBounds();
    };

    const updateBounds = () => {
        if (resizableBoxRef.current) {
            const box = resizableBoxRef.current;
            const width = box.getBoundingClientRect().width;
            const height = box.getBoundingClientRect().height;
            setBounds({
                left: 0,
                top: 0,
                right: window.innerWidth - width / 2,
                bottom: window.innerHeight - height / 2,
            });
        }
    };

    useEffect(() => {
        updateBounds();
        window.addEventListener('resize', updateBounds);
        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    useEffect(() => {
        cmsStreamDataPromise.then(data => {
            if (data) {
                setIsOnline(data.online);
                setIsLocked(data.online && data.secret);
                const constructedStreamLink = `https://player.twitch.tv/?channel=${data.streamLink}&parent=${data.domain}&muted=false&autoplay=${mobile ? 'false' : 'true'}&controls=false`;
                setStreamLink(constructedStreamLink);
                setStreamTitle(data.streamTitle);
                setStreamTitleOffline(data.streamTitleOffline);
                setInfos(data.infos);
                setInfoOverlay(data.infoOverlay);
                setCmsPassword(data.password);
            }
        });
    }, []);

    const initialPosition = mobile ? { x: window.innerWidth / 11, y: window.innerHeight / 8 } : { x: (window.innerWidth - 700) / 2, y: (window.innerHeight - 450) / 2 };

    const handleMinimizeClick = (event) => {
        event.stopPropagation();
        if (onMinimize) {
            onMinimize();
        }
    };

    const handlePasswordChange = (e, index) => {
        const value = e.target.value;
        const newPass = [...password];
        const newMaskedPass = [...maskedPassword];

        if (value.match(/^[0-9]$/)) {
            newPass[index] = value;
            newMaskedPass[index] = '*';
            setPassword(newPass);
            setMaskedPassword(newMaskedPass);
            if (index < 5) {
                document.getElementById(`password-input-${index + 1}`).focus();
            }

            if (newPass.every((digit) => digit !== '')) {
                const pass = newPass.join('');
                if (pass === cmsPassword) {
                    setIsLocked(false);
                    setWrongPassword(false);
                    onUnlock(false);
                } else {
                    setWrongPassword(true);
                }
            } else {
                setWrongPassword(false);
            }
        } else if (value === '' && index > 0) {
            newPass[index] = '';
            newMaskedPass[index] = '';
            setPassword(newPass);
            setMaskedPassword(newMaskedPass);
            document.getElementById(`password-input-${index - 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newPass = [...password];
            const newMaskedPass = [...maskedPassword];
            newPass[index] = '';
            newMaskedPass[index] = '';
            setPassword(newPass);
            setMaskedPassword(newMaskedPass);
            if (index > 0) {
                document.getElementById(`password-input-${index - 1}`).focus();
            }
        }
    };

    const handleInputClick = () => {
        document.getElementById('password-input-0').focus();
    };

    return (
        <Draggable
            handle=".drag-handle"
            disabled={isResizing}
            bounds={bounds}
            defaultPosition={initialPosition}
            onStart={handleStart}
            onStop={handleStop}
            onMouseDown={onClick}
        >
            <div
                ref={resizableBoxRef}
                style={{
                    width: mobile ? window.innerWidth * 16 * 0.05 : 700,
                    height: mobile ? window.innerWidth * 9 * 0.05 : 450,
                    position: 'relative',
                    zIndex: zIndex,
                }}
            >
                <ResizableBox
                    width={mobile ? window.innerWidth * 16 * 0.05 : 700}
                    height={mobile ? window.innerWidth * 9 * 0.05 : 394}
                    minConstraints={[
                        mobile ? window.innerWidth * 16 * 0.05 : 400,
                        mobile ? window.innerWidth * 9 * 0.03 : 225
                    ]}
                    maxConstraints={[
                        mobile ? window.innerWidth * 16 * 0.05 : 1200,
                        1200 * 9 / 16
                    ]}
                    resizeHandles={['se']}
                    handle={<div style={{ position: 'absolute', bottom: 0, right: 0, height: mobile ? '100px' : '80%', width: mobile ? '100px' : '100px', cursor: 'se-resize', zIndex: 200000 }} />}
                    className="resizable-box"
                    onResizeStart={onResizeStart}
                    onResizeStop={onResizeStop}
                    onResize={updateBounds}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        background: '#000000',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'column'
                    }}>
                        <div
                            ref={dragHandleRef}
                            className="drag-handle"
                            style={{
                                position: 'absolute',
                                top: '-1px',
                                left: '0',
                                right: '0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#000000',
                                height: '30px',
                                cursor: 'move',
                                zIndex: 100002,

                            }}
                        >
                            <h3 style={{ fontSize: mobile ? '10pt' : '11pt' }}>
                                {isLocked ? 'MINIMAXXX SECRET EVENT' : isOnline ? streamTitle : streamTitleOffline}
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0px 5px', position: 'absolute', top: '3px', right: 0, left: 0 }}>
                            <img src={move} style={{ width: '21px', height: '21px', pointerEvents: 'none', zIndex: 100003 }} />
                            <div
                                style={{
                                    cursor: 'pointer',
                                    zIndex: 100003
                                }}
                                onClick={handleMinimizeClick}
                                onTouchStart={handleMinimizeClick}
                            >
                                <img
                                    src={minimise}
                                    style={{ width: '23px', height: '23px', pointerEvents: 'none' }}
                                />
                                <div style={{
                                    content: '""',
                                    position: 'absolute',
                                    top: '-10px',
                                    bottom: '-10px',
                                    left: '-10px',
                                    right: '-10px',
                                }}></div>
                            </div>
                        </div>



                        {isOnline ? (
                            isLocked ? (
                                <div className="blink" style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'red'
                                }}>
                                    <h2 style={{ textAlign: 'center', color: '#000000', width: mobile ? '90%' : '30%', marginBottom: mobile ? '0' : '10px', paddingTop: '10px' }}>ENTER PASSWORD TO UNLOCK THE STREAM</h2>
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: mobile ? '10px' : '20px' }}>
                                        {maskedPassword.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`password-input-${index}`}
                                                type="tel"
                                                value={digit}
                                                onChange={(e) => handlePasswordChange(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                maxLength="1"
                                                autoComplete="off"
                                                style={{
                                                    width: mobile ? '15px' : '20px',
                                                    fontFamily: 'nimbus-sans',
                                                    fontWeight: 700,
                                                    height: mobile ? '30px' : '40px',
                                                    textAlign: 'center',
                                                    fontSize: '18px',
                                                    border: 'none',
                                                    borderBottom: '1.5px solid #000',
                                                    backgroundColor: 'transparent',
                                                    outline: 'none',
                                                    borderRadius: 0
                                                }}
                                                onClick={handleInputClick}
                                            />
                                        ))}
                                    </div>
                                    {wrongPassword && <h5 style={{ textAlign: 'center', color: '#000000', width: '20%', fontWeight: '400', fontSize: '7pt' }}>YOU ENTERED THE WRONG PASSWORD</h5>}
                                </div>
                            ) : (
                                <div onClick={() => setIsPlaying(true)} style={{ width: '100%', height: '100%', zIndex: 100001 }}  >
                                    <iframe
                                        src={streamLink}
                                        title="Live Stream"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            objectFit: 'cover'
                                        }}
                                        allow="autoplay; fullscreen"
                                    />
                                    {infoOverlay && !mobile && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            padding: '5px',
                                            paddingRight: '15px',
                                            zIndex: 4,
                                            opacity: 0.9
                                        }}>
                                            {infos.map((info, index) => (
                                                <h4 key={index} style={{ margin: 0, fontSize: '8pt', color: '#FFF', letterSpacing: '0.3pt' }}>{info}</h4>
                                            ))}
                                        </div>
                                    )}
                                    {infoOverlay && !mobile && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '28px',
                                            left: '0',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            padding: '5px',
                                            zIndex: 4,
                                            opacity: 0.9
                                        }}>
                                            <h4 style={{ margin: 0, fontSize: '8pt', color: '#FFF', letterSpacing: '0.3pt' }}>{currentTime}</h4>
                                        </div>
                                    )}
                                </div>
                            )
                        ) : (
                            <div className="blink" style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <h2 style={{ textAlign: 'center', color: '#000000', width: '80%' }}>THE STREAM IS CURRENTLY OFFLINE. COME BACK FOR THE NEXT EVENT OR JOIN US IN PERSON.</h2>
                                <h5 style={{ position: 'absolute', bottom: '10%', textAlign: 'center', color: '#000000', width: '70%', fontWeight: '400', fontSize: '7pt' }}>FIND INFORMATION ABOUT OUR NEXT EVENT BY MOVING THIS WINDOW OR BY HEADING TO OUR SOCIAL NETWORKS.</h5>
                            </div>
                        )}
                        <div style={{ background: 'rgba(0,0,0,0.6)', position: 'absolute', bottom: '0', right: '0', height: '21px', width: '21px', pointerEvents: 'none', zIndex: 100001 }}>
                            <img src={isOnline ? resize : resize_black} style={{ height: '21px', objectFit: 'contain' }} />
                        </div>


                    </div>
                    {isOnline && !isLocked && <div style={{ pointerEvents: 'none', position: 'absolute', top: '33px', right: '5px', background: 'red', borderRadius: '5px', padding: '2px 7px', animation: 'fadeInOut 1.5s infinite', zIndex: 200003 }}>
                        <h4 style={{ color: '#FFFFFF', margin: 0, letterSpacing: 0, pointerEvents: 'none' }}>LIVE</h4>
                    </div>}
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default Stream;
