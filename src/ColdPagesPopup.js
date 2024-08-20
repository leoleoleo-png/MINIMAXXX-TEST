import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';
import './squares.css';
import move from './assets/move.png';
import resize from './assets/resize_black.png';
import minimise from './assets/minimise.png';
import cmsColdPageDataPromise from './cms/cmsColdPages';

const ColdPagesPopup = ({ contentType, mobile, onMinimize, zIndex, onClick }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [content, setContent] = useState('');
    const dragHandleRef = useRef(null);
    const resizableBoxRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });

    useEffect(() => {
        cmsColdPageDataPromise.then(data => {
            if (data) {
                if (contentType === 'privacyPolicy') {
                    setContent(data.coldPage.privacyPolicy);
                } else if (contentType === 'termsOfUse') {
                    setContent(data.coldPage.termsOfUse);
                }
            }
        }).catch(error => {
            console.error('Failed to load cold page data:', error);
        });
    }, [contentType]);

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

    const title = contentType === 'privacyPolicy' ? 'PRIVACY POLICY' : 'TERMS OF USE';

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
                    handle={<div style={{ position: 'absolute', bottom: 0, right: 0, height: mobile ? '50px' : '100px', width: mobile ? '50px' : '100px', cursor: 'se-resize' }} />}
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
                        border: '0.5px solid #000000',
                    }}>
                        <div
                            ref={dragHandleRef}
                            className="drag-handle"
                            style={{
                                position: 'absolute',
                                top: '-1px',
                                left: '-0.5px',
                                right: '-0.5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#000000',
                                height: '30px',
                                padding: '0px 5px',
                                cursor: 'move',
                                zIndex: 2
                            }}
                        >
                            <img src={move} style={{ width: '21px', height: '21px', pointerEvents: 'none' }} />
                            <h3 style={{ fontSize: '10pt' }}>{title}</h3>
                            <div
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                }}
                                onClick={handleMinimizeClick}
                                onTouchStart={handleMinimizeClick}
                            >
                                <img
                                    src={minimise}
                                    style={{ width: '23px', height: '23px', pointerEvents: 'none', marginBottom: '-4px' }}
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
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: 'auto',
                            paddingTop: '30px',
                        }}>
                            <h4 style={{
                                fontSize: '10pt',
                                lineHeight: '9pt',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                whiteSpace: 'pre-wrap',
                                textTransform: 'uppercase'  // This will capitalize the paragraph content
                            }}>{content}</h4>
                        </div>
                        <div style={{ position: 'absolute', bottom: '0', right: '0', height: '21px', width: '21px' }}>
                            <img src={resize} style={{ zIndex: 3, height: '21px', objectFit: 'contain', pointerEvents: 'none' }} />
                        </div>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default ColdPagesPopup;
