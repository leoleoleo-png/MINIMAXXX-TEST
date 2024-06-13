import React from 'react';
import { useMediaQuery } from 'react-responsive'
import "./App.css";
import './home.css';
import barIcon from "./assets/barIcon.png"
import Loader from './Loader';
import aleonIcon from "./assets/aleonIcon.png"

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

function App() {
    window.scrollTo(0, 0);
    return (
        <Loader delay={100} contents={<div style={{ overflow: 'hidden', flex: 1 }}>
            <Desktop>
                <div className="container">
                    <a className="half left" href="/Cognac">
                        <img src={aleonIcon} style={{ width: '100px' }} />
                        <div>
                            <h1>NOS SPIRITUEUX</h1>
                            <h3 className='animated-underline'>Découvrir</h3>
                        </div>
                        <div></div>
                    </a>
                    <a href="/Bar" className="half right">
                        <img src={barIcon} style={{ width: '150px' }} />
                        <div>
                            <h1>NOTRE BAR À PARIS</h1>
                            <h3 style={{ color: '#FCC303' }} className='animated-underline yellow-underline'>Découvrir</h3>
                        </div>
                        <div></div>
                    </a>
                </div>
            </Desktop>
            <TabletAndBelow>
                <div style={{ flex: 1 }}>
                    <a href="/Cognac" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '50%', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
                        <Loader delay={150} contents={<div style={{ width: '100%' }}><img src={aleonIcon} style={{ width: 'calc(17vh)', marginLeft: '-2px' }} /></div>} />
                        <Loader delay={150} contents={<div style={{ width: '100%' }}><h1 style={{ fontSize: 'calc(9vh)', textAlign: 'left', margin: 0, padding: 0, width: '100%' }}>NOS<br />SPIRITUEUX</h1></div>} />
                    </a>
                    <a href="/Bar" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: '50%', backgroundColor: '#1A1A1A', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
                        <Loader delay={150} contents={<div style={{ width: '100%' }}>     <img src={barIcon} style={{ width: 'calc(20vh)', marginLeft: '-4px' }} /></div>} />
                        <Loader delay={150} contents={<div style={{ width: '100%' }}>  <h1 style={{ fontSize: 'calc(9vh)', textAlign: 'left', margin: 0, padding: 0, color: '#FCC303', width: '100%' }}>NOTRE<br />BAR À PARIS</h1></div>} />
                    </a>
                </div>
            </TabletAndBelow>
        </div>} />

    )
}

export default App;

