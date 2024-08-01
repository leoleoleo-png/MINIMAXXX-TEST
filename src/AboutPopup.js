import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';
import move from './assets/move.png';
import resize from './assets/resize_black.png';
import minimise from './assets/minimise.png';

const AboutPopup = ({ paragraph_1, paragraph_2, mobile, onMinimize, zIndex, onClick }) => {
    const [isResizing, setIsResizing] = useState(false);
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
                right: window.innerWidth - width,
                bottom: window.innerHeight - height,
            });
        }
    };

    useEffect(() => {
        updateBounds();
        window.addEventListener('resize', updateBounds);
        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    const getRandomPosition = () => {
        const width = mobile ? window.innerWidth / 1.2 : 300;
        const height = mobile ? 150 : 450;
        const x = Math.random() * (window.innerWidth - width);
        const y = Math.random() * (window.innerHeight - height);
        return { x, y };
    };

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
            defaultPosition={getRandomPosition()}
            onMouseDown={onClick}
        >
            <div
                ref={resizableBoxRef}
                style={{
                    width: mobile ? window.innerWidth / 1.2 : 300,
                    height: mobile ? 150 : 450,
                    position: 'relative',
                    zIndex: zIndex,
                }}
            >
                <ResizableBox
                    width={mobile ? window.innerWidth / 1.2 : 300}
                    height={mobile ? 200 : 450}
                    minConstraints={mobile ? ['1%', 100] : [200, 225]}
                    maxConstraints={[window.innerWidth, window.innerHeight]}
                    resizeHandles={['se']}
                    className="resizable-box"
                    handle={<div style={{position:'absolute', bottom:0, right:0, height: mobile ? '50px' : '100px', width:mobile ? '50px' : '100px', cursor:'se-resize'}} />}
                    onResizeStart={onResizeStart}
                    onResizeStop={onResizeStop}
                    onResize={updateBounds}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        background: '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: '#000000'
                    }}>
                        <div
                            ref={dragHandleRef}
                            className="drag-handle"
                            style={{
                                position: 'absolute',
                                top: '-1.5px',
                                left: '-1.5px',
                                right: '-1.5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#000000',
                                height: '30px',
                                cursor: 'move',
                                zIndex: 2
                            }}
                        >
                            <div style={{ width: '50px' }} />
                            <h3>ABOUT</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '5px' }}>
                                <img
                                    onClick={handleMinimizeClick}
                                    onTouchStart={handleMinimizeClick}
                                    src={minimise}
                                    style={{ width: '21px', height: '21px', cursor: 'pointer',  paddingRight: '5px' }}
                                />
                                <img src={move} style={{ width: '21px', height: '21px', pointerEvents: 'none' }} />
                            </div>

                        </div>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: mobile ? 'auto' : 'hidden',
                            paddingTop: '30px',
                        }}>
                            <h4 style={{
                                fontSize: '11pt',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                whiteSpace: 'pre-wrap',
                            }}>
                                {paragraph_1} <br /><br /> {paragraph_2}
                            </h4>
                        </div>
                        <img src={resize} style={{ zIndex: 3, position: 'absolute', bottom: '0', right: '0', height: '23px', objectFit: 'contain', pointerEvents: 'none' }} />
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default AboutPopup;
