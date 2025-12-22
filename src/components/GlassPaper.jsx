import React, { Suspense, useEffect, useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import Ballpit from "./Ballpit"

const GlassPaper = ({ children, style, size, animate = false, withBallPit = true }) => {
    const [isMobile, setIsMobile] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    )

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = e => setIsDarkMode(e.matches)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])
    
    useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
    }, [])
    
    const containerStyle = {
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "30px 0"
    }

    const glassCardStyle = {
        position: "relative",
        width: size == "small" ? "auto" : "95%" ,
        maxWidth: size == "small" ? "auto" : "1000px",
        height: size == "small" ? "auto" : "90vh",
        borderRadius: "25px",
        background: isDarkMode
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(255, 255, 255, 0.2)",
        boxShadow: isDarkMode
            ? "0 0 60px rgba(255,255,255,0.05), inset 0 0 40px rgba(255,255,255,0.05)"
            : "0 0 40px rgba(0,0,0,0.05), inset 0 0 20px rgba(255,255,255,0.05)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "2rem",
        paddingTop: size == "small" ? "1rem" : "auto",
        alignItems: "center",
        fontFamily: "'Segoe UI', sans-serif",
        color: isDarkMode ? "#f5f5f5" : "#222",
        justifyContent: "center"
    }

    return (
        <div style={containerStyle}>
            {!isMobile && withBallPit && (
                // <div
                //     style={{
                //     position: "fixed",
                //     top: 0,
                //     left: 0,
                //     width: "100vw",
                //     height: "100vh",
                //     overflow: "hidden",
                //     // zIndex: 0,
                //     }}
                // >
                //     <Suspense fallback={null}>
                //     {/* <Ballpit
                //         count={50}
                //         gravity={0.01}
                //         friction={1}
                //         wallBounce={1}
                //         followCursor={false}
                //         colors={[0, 0, 0]}
                //         className="ballpit"
                //     /> */}
                //     </Suspense>
                // </div>
            <></>)}
            {animate ? 
                <motion.div
                    style={{ ...glassCardStyle, ...style }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}>
                        {children}
                </motion.div>
                 : 
                <div style={{ ...glassCardStyle, ...style }}>
                    {children}
                </div>
            }
        </div>
    )
}

export default GlassPaper
