import React, { useEffect, useState } from "react"

const GlassCard = ({ children, isDarkMode }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
    return (
        <div
            style={{
                borderRadius: "25px",
                background: isDarkMode
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(255, 255, 255, 0.65)",
                boxShadow: isDarkMode
                    ? "0 0 60px rgba(255,255,255,0.05), inset 0 0 40px rgba(255,255,255,0.05)"
                    : "0 0 40px rgba(0,0,0,0.1), inset 0 0 20px rgba(255,255,255,0.4)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: isMobile ? 10 : 20,
                height: isMobile ? null : 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {children}
        </div>
    )
}

export default GlassCard
