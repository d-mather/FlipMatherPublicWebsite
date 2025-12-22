import React, { lazy, Suspense, useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import CircularText from '../components/CircularText'
import GlassCard from '../components/GlassCard'
import SignUpGiveawayCard from './Cards/SignUpGiveaway'
import { useNavigate } from 'react-router-dom'
import SponsorCompetitionCard from './Cards/SponsorCompetitionCard'
import HomeCard from './Cards/HomeCard'

const Ballpit = lazy(() => import('../components/Ballpit'))

const Home = () => {
  const navigate = useNavigate()
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif",
    color: isDarkMode ? "#f5f5f5" : "#222",
    background: "transparent",
    padding: "30px 0",
    }

  const glassCardHeader = {
    position: "relative",
    width: "95%",
    maxWidth: "1100px",
    borderRadius: "25px",
    background: isDarkMode
        ? "rgba(0,0,0,0.35)"
        : "rgba(255, 255, 255, 0.65)",
    boxShadow: isDarkMode
        ? "0 10px 40px rgba(0,0,0,0.35)"
        : "0 0 40px rgba(0,0,0,0.1), inset 0 0 20px rgba(255,255,255,0.4)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }

  const scrollContentStyle = {
    overflowY: "hidden",
    padding: isMobile ? "10px" : "20px",
    color: isDarkMode ? "#f5f5f5" : "#333",
  }

  const infoStyle = {
    color: isDarkMode ? "#ccc" : "#222",
    margin: "4px 0",
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: isMobile? 5 : 20,
    fontSize: 15
  }

  const imageStyle = {
    width: isMobile ? "55px" : "120px",
    height: isMobile ? "55px" : "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: isDarkMode ? "2px solid rgba(255,255,255,0.4)" : "2px solid rgba(0,0,0,0.2)",
    boxShadow: isDarkMode ? "0 0 20px rgba(255,255,255,0.2)" : "0 0 15px rgba(0,0,0,0.1)",
    position: "absolute",
    marginLeft: isMobile ? "34px" : "42px",
    marginTop: isMobile ? "32px" : "40px"
  }

  const circularTextStyle = {
    color: 'var(--text)',
    width: isMobile ? "120px" : "200px",
    height: isMobile ? "120px" : "200px",
    position: 'relative'
  }

  return (
    <>
      {!isMobile && (
          <div
            style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            zIndex: 0
            }}>
            <Suspense fallback={null}>
              <Ballpit
                  count={50}
                  gravity={0.001}
                  friction={1}
                  wallBounce={1}
                  followCursor={false}
                  colors={[0, 0, 0]}
                  className="ballpit" />
            </Suspense>
          </div>
      )}
      <div style={containerStyle}>
        <motion.div
            style={glassCardHeader}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            {/* Scrollable Content */}
            <div style={scrollContentStyle}>
                <div style={{ display: "flex", gap: isMobile ? 0 : 40, verticalAlign: "center", justifyContent: "center" }}>
                  <div style={{ position: 'relative', marginTop: 10 }}>
                    <motion.img
                        src="/assets/DillonMatherFaceWide.png"
                        alt="Dillon Mather"
                        style={imageStyle}
                        animate={{ 
                            rotate: [40, -5, 40],
                        }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
                      <Suspense fallback={null}>
                          <CircularText
                              text="FLIP ⇨ MATHER ⇨ "
                              onHover="speedUp"
                              spinDuration={30}
                              className="custom-circular-class"
                              style={circularTextStyle}
                          />
                      </Suspense>
                    </div>
                    <div style={{ padding: 20, marginLeft: isMobile ? -15 : 0, paddingRight: isMobile ? 0 : null }}>
                        <picture>
                          <source srcSet="/assets/logos/WhiteOnTransparentFlipMather.svg" media="(prefers-color-scheme: dark)" />
                          <img
                          className="logo"
                          src="/assets/logos/BlackOnTransparentFlipMather.svg"
                          alt="Flip Mather logo"
                          width="1600"
                          height="390"
                          />
                        </picture>
                        <br />
                        <div style={infoStyle}>Durban's favorite YouTuber</div>
                        <div className="actions" style={{ marginTop: 10, justifyContent: 'left' }}>
                          <a className="btn btn-primary" href="https://www.youtube.com/c/FlipMather" target="_blank" rel="noopener noreferrer" aria-label="Open Flip Mather YouTube channel">
                              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.9 3 12 3 12 3s-6.9 0-8.7.4A4 4 0 0 0 .5 6.2 41 41 0 0 0 0 12a41 41 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.1 21 12 21 12 21s6.9 0 8.7-.4a4 4 0 0 0 2.8-2.8A41 41 0 0 0 24 12a41 41 0 0 0-.5-5.8ZM9.7 15.6V8.4L16 12l-6.3 3.6Z"/></svg>
                              {isMobile ? "YouTube" : "Watch on YouTube"}
                          </a>

                          <a className="btn btn-ghost insta-link" href="https://www.instagram.com/flip_mather" target="_blank" rel="noopener noreferrer" aria-label="Open Flip Mather on Instagram">
                              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.6 6.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"/><path d="M12 0C8.7 0 8.3 0 7 0.1 5.6 0.2 4.6 0.4 3.7 0.8a5.9 5.9 0 0 0-2.9 2.9C0.4 4.6 0.2 5.6 0.1 7 0 8.3 0 8.7 0 12s0 3.7 0.1 5c0.1 1.4 0.3 2.4 0.7 3.3a5.9 5.9 0 0 0 2.9 2.9c0.9 0.4 1.9 0.6 3.3 0.7 1.3 0.1 1.7 0.1 5 0.1s3.7 0 5-0.1c1.4-0.1 2.4-0.3 3.3-0.7a5.9 5.9 0 0 0 2.9-2.9c0.4-0.9 0.6-1.9 0.7-3.3C24 15.7 24 15.3 24 12s0-3.7-0.1-5c-0.1-1.4-0.3-2.4-0.7-3.3a5.9 5.9 0 0 0-2.9-2.9C19.4 0.4 18.4 0.2 17 0.1 15.7 0 15.3 0 12 0Zm0 2c3.3 0 3.7 0 5 0.1 1.2 0.1 1.8 0.3 2.2 0.4 0.6 0.2 1 0.4 1.4 0.8 0.4 0.4 0.6 0.8 0.8 1.4 0.2 0.4 0.3 1 0.4 2.2 0.1 1.3 0.1 1.7 0.1 5s0 3.7-0.1 5c-0.1 1.2-0.3 1.8-0.4 2.2-0.2 0.6-0.4 1-0.8 1.4-0.4 0.4-0.8 0.6-1.4 0.8-0.4 0.2-1 0.3-2.2 0.4-1.3 0.1-1.7 0.1-5 0.1s-3.7 0-5-0.1c-1.2-0.1-1.8-0.3-2.2-0.4-0.6-0.2-1-0.4-1.4-0.8-0.4-0.4-0.6-0.8-0.8-1.4-0.2-0.4-0.3-1-0.4-2.2C2 15.7 2 15.3 2 12s0-3.7 0.1-5C2.2 5.8 2.3 5.2 2.4 4.8c0.2-0.6 0.4-1 0.8-1.4 0.4-0.4 0.8-0.6 1.4-0.8 0.4-0.2 1-0.3 2.2-0.4C8.3 2 8.7 2 12 2Z"/></svg>
                              {isMobile ? "" : "Instagram"}
                          </a>
                      </div>
                        <div style={infoStyle}>ɹǝqnʇno⅄ ǝʇᴉɹoʌɐɟ s,uɐqɹnp</div>
                    </div>
                </div>
            </div>
        </motion.div>
        <div
            style={{
                width: "95%",
                maxWidth: "1100px",
                marginTop: 30,
                display: "grid",gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: isMobile ? "15px" : "25px"
            }}>
            <GlassCard isDarkMode={isDarkMode}>
                <SignUpGiveawayCard onSignUp={() => navigate("/signup")} />
            </GlassCard>

            <GlassCard isDarkMode={isDarkMode}>
                <SponsorCompetitionCard onSponsor={() => navigate("/sponsor")} />
            </GlassCard>

            <GlassCard isDarkMode={isDarkMode}>
                <HomeCard
                  onClick={() => navigate("/fireshow")}
                  pictureId='fire-show-thumnail'
                  title='Live Fire Show'
                  firstText='Make your next event unforgettable with a professional live fire show.'
                  secondText='The highlight your guests will never forget.'
                  buttonText='Learn More'
                  />
            </GlassCard>

            <GlassCard isDarkMode={isDarkMode}>
                <HomeCard
                  onClick={() => navigate("/gallery")}
                  pictureId='photoshoot-book'
                  title='Book a Photoshoot'
                  firstText='Photoshoots for all occasions. Business, personal, events, etc.'
                  secondText='Everyone and everything can look better with the right picture.'
                  buttonText='See Portfolio'
                  />
            </GlassCard>

            {/* <GlassCard isDarkMode={isDarkMode}>
                <HomeCard
                  onClick={() => navigate("/eggs")}
                  pictureId='eggs-cover'
                  title='Free Fresh Ellie Eggs'
                  firstText='Order eggs locally in Durban North'
                  secondText='Cheapest with Flip Mather'
                  buttonText='Order now'
                  />
            </GlassCard> */}
            <GlassCard isDarkMode={isDarkMode}>
                <div>Even MORE stuff coming soon! Stay tuned :)</div>
            </GlassCard>

            <GlassCard isDarkMode={isDarkMode}>
                <div>Even MORE stuff coming soon! Stay tuned :)</div>
            </GlassCard>
        </div>
      </div>
    </>
  )
}

export default Home
