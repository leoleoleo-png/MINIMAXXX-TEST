import React, { useState, useEffect } from 'react';
import Modal from './Modal.js';
import ModalContact from './ModalContact.js';
import ModalCarte from './ModalCarte.js';
import './home.css';
import { useMediaQuery } from 'react-responsive';
import { fetchContactInfo } from './apiContact';
import { fetchInstagramLinks } from './apiInstagram';

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

const TopBar = ({ mode, barIcon, aleonIcon }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [carteModalOpen, setCarteModalOpen] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        street: '',
        zipcode: '',
        country: '',
        days: '',
        hours: '',
        addresslink: ''
    });
    const [instagramLinks, setInstagramLinks] = useState({ linkbar: '', linkbrand: '' });

    useEffect(() => {
        const fetchData = async () => {
            const fetchedContactInfo = await fetchContactInfo();
            const fetchedInstagramLinks = await fetchInstagramLinks();
            if (fetchedContactInfo) {
                setContactInfo(fetchedContactInfo);
            }
            if (fetchedInstagramLinks) {
                setInstagramLinks(fetchedInstagramLinks);
            }
        };
        fetchData();
    }, []);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const toggleContactModal = () => {
        setContactModalOpen(!contactModalOpen);
    };

    const toggleCarteModal = () => {
        setCarteModalOpen(!carteModalOpen);
    };

    return (
        <div style={{ flex: 1 }}>
            <Desktop>
                <div style={{ position: 'absolute', top: '45px', left: 0, right: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px', paddingRight: '20px' }}>
                    {mode ? (
                        <>
                            <a style={{ width: '20%' }} target='_blank' href={contactInfo.addresslink}>
                                <h3 style={{ textAlign: 'left', color: '#FCC303', margin: 0, padding: 0 }}>
                                    {contactInfo.street}<br />
                                    {contactInfo.zipcode} {contactInfo.country}<br />
                                    {contactInfo.days}<br />
                                    {contactInfo.hours}
                                </h3>
                            </a>
                            <a href="/"><img src={barIcon} style={{ width: '150px' }} /></a>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', cursor: 'pointer' }}>
                                <a onClick={toggleCarteModal}><h3 style={{ margin: 0, color: '#FCC303' }}>Nos Cocktails</h3></a>
                                <a onClick={toggleContactModal}><h3 style={{ margin: 0, color: '#FCC303', marginLeft: '25px', marginRight: '25px' }}>Contact</h3></a>
                                <a href={instagramLinks.linkbar} target="_blank" rel="noopener noreferrer"><h3 style={{ margin: 0, color: '#FCC303' }}>Instagram</h3></a>
                            </div>
                        </>
                    ) : (
                        <>
                            <a style={{ width: '20%' }} onClick={toggleModal}><h3 style={{ cursor: 'pointer', textAlign: 'left', margin: 0, padding: 0 }}>Points de vente</h3></a>
                            <a href="/"><img src={aleonIcon} style={{ width: '100px' }} /></a>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '20%', cursor: 'pointer' }}>
                                <a style={{ marginRight: '25px' }} href={instagramLinks.linkbrand} target="_blank" rel="noopener noreferrer"><h3 style={{ margin: 0 }}>Instagram</h3></a>
                                <a onClick={toggleContactModal}><h3 style={{ margin: 0 }}>Contact</h3></a>
                            </div>
                        </>
                    )}
                    <Modal isOpen={modalOpen} onClose={toggleModal} />
                    <ModalContact isOpen={contactModalOpen} onClose={toggleContactModal} />
                    <ModalCarte isOpen={carteModalOpen} onClose={toggleCarteModal} />
                </div>
            </Desktop>
            <TabletAndBelow>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px' }}>
                    {mode ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <a onClick={toggleCarteModal}><h3 style={{ margin: 0, marginBottom: '8px', color: '#FCC303' }}>Nos Cocktails</h3></a>
                                <a href={instagramLinks.linkbar} target="_blank" rel="noopener noreferrer"><h3 style={{ margin: 0, marginBottom: '8px', color: '#FCC303' }}>Instagram</h3></a>
                                <a onClick={toggleContactModal}><h3 style={{ margin: 0, color: '#FCC303' }}>Contact</h3></a>
                            </div>
                            <a href="/"><img src={barIcon} style={{ width: 'calc(20vh)', marginRight: '-3px' }} /></a>
                        </>
                    ) : (
                        <>
                            <a href="/"><img src={aleonIcon} style={{ width: 'calc(16vh)', marginLeft: '-2px' }} /></a>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                                <a onClick={toggleModal}><h3 style={{ textAlign: 'right', margin: 0, padding: 0, marginBottom: '8px' }}>Points de vente</h3></a>
                                <a href={instagramLinks.linkbrand} target="_blank" rel="noopener noreferrer"><h3 style={{ margin: 0, marginBottom: '8px' }}>Instagram</h3></a>
                                <a onClick={toggleContactModal}><h3 style={{ margin: 0 }}>Contact</h3></a>
                            </div>
                        </>
                    )}
                    <Modal phone isOpen={modalOpen} onClose={toggleModal} />
                    <ModalContact phone isOpen={contactModalOpen} onClose={toggleContactModal} />
                    <ModalCarte phone isOpen={carteModalOpen} onClose={toggleCarteModal} />
                </div>
            </TabletAndBelow>
        </div>
    );
};

export default TopBar;
