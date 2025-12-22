import React from 'react'
import GlassPaper from '../components/GlassPaper'
import { Link } from 'react-router-dom'
import useDarkMode from '../hooks/useDarkMode'

const ThankYouPage = () => {
    const isDarkMode = useDarkMode()

    return (
        <>
            <GlassPaper size="small">
                <h1 style={{ color: 'green' }}>Received!</h1>
                <h2>Thank you for your Support!</h2>
                <h3 style={{ color: 'red' }}>Your support helps continue the vlogs!</h3>
                <div id="HomeButton" style={{ textAlign: 'center' }}>
                    <Link to="/" aria-label="Go to Home Page" style={{ textDecoration: 'none' }}>
                        <p style={{ top: 20, position: 'relative', color: 'initial' }}>Click for Home Page:</p>
                        <img
                            src={isDarkMode ? "/assets/logos/WhiteOnTransparentFM.svg" : "/assets/logos/BlackOnTransparentFM.svg"}
                            alt="Home Icon"
                            width="100"
                            height="100"
                        />
                    </Link>
                </div>
                <Link to="/sponsor" style={{ color: 'grey' }}>Or give more here xD</Link>
            </GlassPaper>
        </>
    )
}

export default ThankYouPage