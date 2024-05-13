import React, { useState } from 'react';
import Modal from './Modal.js';
import './home.css';
import { useMediaQuery } from 'react-responsive'


const useDesktopMediaQuery = () =>
    useMediaQuery({ query: "(min-width: 1280px)" })

const useTabletAndBelowMediaQuery = () =>
    useMediaQuery({ query: "(max-width: 1279px)" })

const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery()
    return isDesktop ? children : null
}

const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery()
    return isTabletAndBelow ? children : null
}


const TopBar = ({ mode, barIcon, aleonIcon }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div style={{ flex: 1 }}>
            <Desktop>
                <div style={{ position: 'absolute', top: '40px', left: 0, right: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px', paddingRight: '20px' }}>
                    {mode ? (
                        <>
                            <a style={{ width: '20%', }} target='blank' href='https://www.google.com/maps/place/35+Rue+Saint-Sauveur,+75002+Paris,+France/@48.8660551,2.345798,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66e19d43340b1:0x3422baba6117b7a9!8m2!3d48.8660551!4d2.3483729!16s%2Fg%2F11cshhkpfk?entry=ttu'>
                                <h3 style={{ textAlign: 'left', color: '#FCC303', margin: 0, padding: 0 }}>
                                    35 rue Saint-Sauver<br />75002 Paris<br />Ouvert du Lundi au Samedi<br />18h30 - 02h00
                                </h3>
                            </a>
                            <a href="/"><img src={barIcon} style={{ width: '150px' }} /></a>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '20%' }}>
                                <a style={{ marginRight: '25px' }} onClick={toggleModal}><h3 style={{ margin: 0, color: '#FCC303' }}>Réserver</h3></a>
                                <a style={{ marginRight: '25px' }}><h3 style={{ margin: 0, color: '#FCC303' }}>Instagram</h3></a>
                                <a><h3 style={{ margin: 0, color: '#FCC303' }}>Contact</h3></a>
                            </div>
                        </>
                    ) : (
                        <>
                            <a style={{ width: '20%' }} onClick={toggleModal}><h3 style={{ cursor: 'pointer', textAlign: 'left', margin: 0, padding: 0 }}>Points de vente</h3></a>
                            <a href="/"><img src={aleonIcon} style={{ width: '100px' }} /></a>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '20%' }}>
                                <a style={{ marginRight: '25px' }} href='https://www.instagram.com/byunveil/'><h3 style={{ margin: 0 }}>Instagram</h3></a>
                                <a><h3 style={{ margin: 0 }}>Contact</h3></a>
                            </div>
                        </>
                    )}
                    <Modal isOpen={modalOpen} onClose={toggleModal} />
                </div>
            </Desktop>
            <TabletAndBelow>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px' }}>
                    {mode ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <a onClick={toggleModal}><h3 style={{ textAlign: 'left', margin: 0, padding: 0, marginBottom: '8px', color: '#FCC303' }}>Carte</h3></a>
                                <a href='https://www.instagram.com/byunveil/'><h3 style={{ margin: 0, marginBottom: '8px', color: '#FCC303' }}>Instagram</h3></a>
                                <a><h3 style={{ margin: 0, color: '#FCC303' }}>Contact</h3></a>
                            </div>
                            <a href="/"><img src={barIcon} style={{ width: '150px', marginRight: '-3px' }} /></a>
                        </>
                    ) : (
                        <>
                            <a href="/"><img src={aleonIcon} style={{ width: '120px', marginLeft: '-2px' }} /></a>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                                <a onClick={toggleModal}><h3 style={{ textAlign: 'right', margin: 0, padding: 0, marginBottom: '8px' }}>Points de vente</h3></a>
                                <a href='https://www.instagram.com/byunveil/'><h3 style={{ margin: 0, marginBottom: '8px' }}>Instagram</h3></a>
                                <a><h3 style={{ margin: 0 }}>Contact</h3></a>
                            </div>
                        </>
                    )}
                    <Modal phone isOpen={modalOpen} onClose={toggleModal} />
                </div>
            </TabletAndBelow>
        </div>
    );
};

export default TopBar;
