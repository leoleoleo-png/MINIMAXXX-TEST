import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';
import video from './assets/MINIMAXXX.mp4';
import move from './assets/move.png';
import resize from './assets/resize.png';
import minimise from './assets/minimise.png';

const Stream = ({ mobile, onMinimize, zIndex, onClick }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const dragHandleRef = useRef(null);
    const resizableBoxRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });

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

    const initialPosition = mobile ? { x: window.innerWidth / 11, y: window.innerHeight / 8 } : { x: (window.innerWidth - 700) / 2, y: (window.innerHeight - 450) / 2 };

    const handleMinimizeClick = (event) => {
        event.stopPropagation();
        if (onMinimize) {
            onMinimize();
        }
    };

    return (
        <Draggable
            handle=".drag-handle"
            disabled={isResizing}
            bounds={bounds}
            defaultPosition={initialPosition}
            onMouseDown={onClick}
        >
            <div
                ref={resizableBoxRef}
                style={{
                    width: mobile ? window.innerWidth / 1.2 : 700,
                    height: mobile ? 150 : 450,
                    position: 'relative',
                    zIndex: zIndex,
                }}
            >
                <ResizableBox
                    width={mobile ? window.innerWidth / 1.2 : 700}
                    height={mobile ? 200 : 450}
                    minConstraints={mobile ? ['1%', 100] : [400, 225]}
                    maxConstraints={[1200, 675]}
                    resizeHandles={['se']}
                    className="resizable-box"
                    onResizeStart={onResizeStart}
                    onResizeStop={onResizeStop}
                    onResize={updateBounds}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        background: '#CACACA',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'column'
                    }}>
                        <div
                            ref={dragHandleRef}
                            className="drag-handle"
                            style={{
                                position: 'absolute',
                                top: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#000000',
                                width: '100%',
                                height: '30px',
                                cursor: 'move',
                                zIndex: 2
                            }}
                        >
                            <div style={{ width: '50px' }} />
                            <h3>{isOnline ? 'MINIMAXXX PARIS AFTERPARTY' : 'OFFLINE'}</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '5px' }}>
                                <img
                                    onClick={handleMinimizeClick}
                                    onTouchStart={handleMinimizeClick}
                                    src={minimise}
                                    style={{ width: '21px', height: '21px', cursor: 'pointer' }}
                                />
                                <img src={move} style={{ width: '21px', height: '21px', pointerEvents: 'none' }} />
                            </div>

                        </div>
                        {isOnline ? (
                            <video
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                autoPlay
                                muted
                                loop
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                        ) : (
                            <div className="blink" style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <h2 style={{ textAlign: 'center', color: '#FFFFFF', width: '80%' }}>THE STREAM IS CURRENTLY OFFLINE. COME BACK FOR THE NEXT EVENT OR JOIN US IN PERSON.</h2>
                                <h5 style={{ position: 'absolute', bottom: '10%', textAlign: 'center', color: '#FFFFFF', width: '70%', fontWeight: '400', fontSize: '7pt' }}>FIND INFORMATION ABOUT OUR NEXT EVENT BY MOVING THIS WINDOW OR BY HEADING TO OUR SOCIAL NETWORKS.</h5>
                            </div>
                        )}
                        <img src={resize} style={{ zIndex: 3, position: 'absolute', bottom: '0', right: '0', height: '23px', objectFit: 'contain', pointerEvents: 'none' }} />
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default Stream;
