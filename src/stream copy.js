import React from 'react';
import Draggable from 'react-draggable';
import './App.css';
import video from './assets/MINIMAXXX.mp4';
import move from './assets/move.png';
import minimise from './assets/minimise.png';

const Stream = () => {
    return (
        <Draggable>
            <div style={{
                width: 'calc(75vh)',
                height: 'calc(53vh)',
                cursor: 'move',
                position: 'absolute',
                background: '#CACACA',
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                top: '20%',
                left: '23%',

            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#000000',
                    width: '100%',
                    height: '30px'
                }}>
                    <div style={{ width: '50px' }} />
                    <h3>
                        MINIMAXXX PARIS AFTERPARTY
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '5px' }}>
                        <img src={minimise} style={{ width: '21px', height: '21px' }} />
                        <img src={move} style={{ width: '21px', height: '21px', pointerEvents: 'none' }} />
                    </div>
                </div>
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
            </div>
        </Draggable>
    );
};

export default Stream;
