import React, { lazy, Suspense } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Download } from 'lucide-react'
import useDarkMode from '../hooks/useDarkMode'
import useResponsive from '../hooks/useResponsive'

const Ballpit = lazy(() => import('../components/Ballpit'))

const BetSoftwareCoverLetter = () => {
    const isDarkMode = useDarkMode()
    const isMobile = useResponsive()

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob(
      [
        `Dillon Mather
        Durban, KwaZulu-Natal, South Africa
        061 237 6060 | radc@hotmail.co.za | linkedin.com/in/dillon-mather

        4 November 2025

        Hiring Manager
        Bet Software
        Durban, South Africa

        Dear Hiring Manager,

        I'm excited to apply for the Senior React Developer role at Bet Software. With over seven years of experience in software development - most recently as a full-stack developer at Derivco (Games Global) - I bring a deep passion for front-end development, particularly React.js, and a strong foundation in testing, mentorship, and agile collaboration. 

        In my current role, I've led the design and development of internal tools using React, JavaScript, and RESTful APIs, optimizing performance across systems. My journey from QA Tester to Automation Engineer to Full-Stack Developer has equipped me with a unique perspective on software quality and user experience. I write robust unit and integration tests using Jest and React Testing Library, and I'm well-versed in modern front-end build pipelines, state management with Redux and Hooks, and responsive design using HTML and CSS. 

        Mentorship is a core part of my professional identity. I guided numerous junior developers through code reviews, knowledge sharing, and collaborative problem-solving. I was on track for a senior promotion before a company-wide freeze, and I'm now eager to step into a leadership role where I can continue giving back and growing alongside a dynamic team. 

        Beyond the technical, I thrive in fast-paced, agile environments and adapt quickly to change. I'm known for my positive energy, resilience, and ability to bridge the gap between technical teams and management - translating complex ideas into actionable insights. 

        Bet Software's commitment to innovation, collaboration, and continuous learning deeply resonates with me. I'd be honored to contribute to your mission and help drive excellence in your React development efforts. 

        Thank you for considering my application. I look forward to the opportunity to discuss how I can add value to your team. 

        Kind regards,
        Dillon Mather`,
      ],
      { type: "text/plain" }
    )
    element.href = URL.createObjectURL(file)
    element.download = "Dillon_Mather_Cover_Letter.txt"
    document.body.appendChild(element)
    element.click()
  }

    const buttonHover = (e, hover) => {
    e.target.style.background = hover
      ? isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.25)"
      : isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.15)"
    e.target.style.boxShadow = hover
      ? isDarkMode ? "0 0 15px rgba(255, 200, 200, 0.5)" : "0 0 15px rgba(150, 0, 0, 0.3)"
      : "none"
  }

  const containerStyle = {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif",
    color: isDarkMode ? "#f5f5f5" : "#222",
    background: "transparent",
    padding: "30px 0",
    }

  const glassCardStyle = {
    position: "relative",
    width: "90%",
    maxWidth: "850px",
    height: "90vh",
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
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  }

  const scrollContentStyle = {
    overflowY: "auto",
    padding: "50px",
    lineHeight: "1.7",
    color: isDarkMode ? "#f5f5f5" : "#333",
  }

  const headerStyle = {
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    paddingBottom: "15px",
    marginBottom: "30px",
    color: isDarkMode ? "#f5f5f5" : "#333",
  }

  const h1Style = {
    fontSize: "2.5rem",
    marginBottom: "5px",
    fontWeight: "700",
  }

  const infoStyle = {
    color: isDarkMode ? "#ccc" : "#222",
    margin: "4px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }

  const contactLink = {
    color: isDarkMode ? "#f3a0ff" : "#5c2764ff",
    fontWeight: "500",
    textDecoration: "none",
  }

  const buttonStyle = {
    position: "absolute",
    top: "25px",
    right: "25px",
    background: isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.15)",
    border: isDarkMode ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px",
    padding: "10px 20px",
    color: isDarkMode ? "#fff" : "#222",
    fontWeight: 600,
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  }

  const imageStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: isDarkMode ? "2px solid rgba(255,255,255,0.4)" : "2px solid rgba(0,0,0,0.2)",
    boxShadow: isDarkMode ? "0 0 20px rgba(255,255,255,0.2)" : "0 0 15px rgba(0,0,0,0.1)",
  }

  return (
    <div style={containerStyle}>
        {!isMobile && (
            <div
                style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                zIndex: 0,
                }}
            >
                <Suspense fallback={null}>
                <Ballpit
                    count={50}
                    gravity={0.01}
                    friction={1}
                    wallBounce={1}
                    followCursor={false}
                    colors={[0, 0, 0]}
                    className="ballpit"
                />
                </Suspense>
            </div>
        )}
    <motion.div
        style={glassCardStyle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <button
        style={buttonStyle}
        onMouseEnter={(e) => buttonHover(e, true)}
        onMouseLeave={(e) => buttonHover(e, false)}
        onClick={handleDownload}
        >
        Download text file
        </button>

        {/* Scrollable Content */}
        <div style={scrollContentStyle}>
        <header style={headerStyle}>
            
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <motion.img
                    src="/assets/DillonMatherFaceWide.png"
                    alt="Dillon Mather"
                    style={imageStyle}
                    animate={{ 
                        rotate: [40, -5, 40],
                    }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                <div>
                    <h1 style={h1Style}>Dillon Mather</h1>
                    <p style={infoStyle}>Durban, KwaZulu-Natal, South Africa</p>
                </div>
            </div>

            {/* Animated contact section */}
            <motion.div
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            >
            <p style={infoStyle}>
                <Phone size={18} color="#f3a0ff" /> <span style={contactLink}>061 237 6060</span>
            </p>
            <p style={infoStyle}>
                <Mail size={18} color="#f3a0ff" />
                <a
                href="mailto:radc@hotmail.co.za"
                style={contactLink}
                target="_blank"
                rel="noopener noreferrer"
                color={isDarkMode ? "#f3a0ff" : "#47204dff"}
                >
                radc@hotmail.co.za
                </a>
            </p>
            <p style={infoStyle}>
                <Linkedin size={18} color="#f3a0ff" />
                <a
                href="https://www.linkedin.com/in/dillon-mather"
                style={contactLink}
                target="_blank"
                rel="noopener noreferrer"
                color={isDarkMode ? "#f3a0ff" : "#47204dff"}
                >
                LinkedIn Profile
                </a>
            </p>
            </motion.div>
        </header>

        <main>
            <p>4 November 2025</p>
            <p>Dear <strong>Hiring Manager</strong>,</p>

            <p>
                I'm excited to apply for the <strong>Senior React Developer</strong> role at Bet Software. With over seven years of experience in software development - most recently as a full-stack developer at Derivco (Games Global) - I bring a deep passion for front-end development, particularly React.js, and a strong foundation in testing, mentorship, and agile collaboration.
            </p>
            <p>
                In my current role, I've led the design and development of internal tools using React, JavaScript, and RESTful APIs, optimizing performance across systems. My journey from QA Tester to Automation Engineer to Full-Stack Developer has equipped me with a unique perspective on software quality and user experience. I write robust unit and integration tests using Jest and React Testing Library, and I'm well-versed in modern front-end build pipelines, state management with Redux and Hooks, and responsive design using HTML and CSS. 
            </p>
            <p>
                Mentorship is a core part of my professional identity. I guided numerous junior developers through code reviews, knowledge sharing, and collaborative problem-solving. I was on track for a senior promotion before a company-wide freeze, and I'm now eager to step into a leadership role where I can continue giving back and growing alongside a dynamic team. 
            </p>
            <p>
                Beyond the technical, I thrive in fast-paced, agile environments and adapt quickly to change. I'm known for my positive energy, resilience, and ability to bridge the gap between technical teams and management - translating complex ideas into actionable insights. 
            </p>
            <p>
                Bet Software's commitment to innovation, collaboration, and continuous learning deeply resonates with me. I'd be honored to contribute to your mission and help drive excellence in your React development efforts. 
            </p>
            <p>
                Thank you for considering my application. I look forward to the opportunity to discuss how I can add value to your team.
            </p>

            <p>Kind regards,</p>
            <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                Dillon Mather
            </p>
        </main>
        </div>
    </motion.div>
    </div>
  )
}

export default BetSoftwareCoverLetter
