import React from 'react';
import './home.css';

import { useMediaQuery } from 'react-responsive'
import Loader from './Loader';


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

const Footer = ({ black }) => {
    return (
        <Loader delay={500} contents={ <div style={{ flex: 1, width: '100%' }}>
       
        <Desktop>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: '60px' }}>
                {black ? (
                    <>
                        <h4>L'ABUS D'ALCOOL EST DANGEREUX POUR LA SANTÉ</h4>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <a href='/Legal'><h4 style={{ paddingRight: '40px', color: '#8C8C8C' }}>MENTIONS LÉGALES</h4></a>
                            <a href='/Conf'><h4 style={{ color: '#8C8C8C' }}>POLITIQUE DE CONFIDENTIALITÉ</h4></a>
                        </div>
                    </>
                ) : (
                    <>
                        <h4 style={{ color: '#FCC303' }}>L'ABUS D'ALCOOL EST DANGEREUX POUR LA SANTÉ</h4>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <a href='/Legal'><h4 style={{ paddingRight: '40px', color: '#8C8C8C' }}>MENTIONS LÉGALES</h4></a>
                            <a href='/Conf'><h4 style={{ color: '#8C8C8C' }}>POLITIQUE DE CONFIDENTIALITÉ</h4></a>
                        </div>
                    </>
                )}
            </div>
        </Desktop>
        <TabletAndBelow>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '70px', paddingBottom:'5px' }}>
                {black ? (
                    <>
                        <h4 style={{ textAlign: 'left', width: '50%', paddingBottom: '60px', margin: 0 }}>L'ABUS D'ALCOOL EST DANGEREUX POUR LA SANTÉ</h4>
                        <a href='/Legal'><h4 style={{ textAlign: 'left', color: '#8C8C8C', width: '100%', padding:0, margin:0 }}>MENTIONS LÉGALES</h4></a>
                        <a href='/Conf'><h4 style={{ textAlign: 'left', color: '#8C8C8C', width: '100%' }}>POLITIQUE DE CONFIDENTIALITÉ</h4></a>

                    </>
                ) : (
                    <>
                         <h4 style={{ textAlign: 'left', width: '50%', paddingBottom: '60px', margin: 0, color:'#FCC303' }}>L'ABUS D'ALCOOL EST DANGEREUX POUR LA SANTÉ</h4>
                        <a href='/Legal'><h4 style={{ textAlign: 'left', color: '#8C8C8C', width: '100%', padding:0, margin:0 }}>MENTIONS LÉGALES</h4></a>
                        <a href='/Conf'><h4 style={{ textAlign: 'left', color: '#8C8C8C', width: '100%' }}>POLITIQUE DE CONFIDENTIALITÉ</h4></a>
                    </>
                )}
            </div>
        </TabletAndBelow>
    </div>}/>
       
    );
}

export default Footer;
