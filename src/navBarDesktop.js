import React from 'react';
import './App.css';

const NavBarDesktop = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingLeft: 'calc(65vh)', paddingRight: 'calc(65vh)', position: 'fixed', bottom: 0, left: 0, right: 0, height: '30px', borderTopStyle: 'solid', borderTopWidth: '1px', borderTopColor: '#000000', background: '#FFFFFF' }}>
            <h4 style={{ color: 'black', fontSize: '11pt' }}>LIVE</h4>
            <h4 style={{ color: 'black', fontSize: '11pt' }}>CONTACT</h4>
            <h4 style={{ color: 'black', fontSize: '11pt' }}>ABOUT</h4>
        </div>
    );
};

export default NavBarDesktop;
