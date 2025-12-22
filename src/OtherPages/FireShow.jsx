import React, { useState, useEffect } from 'react'

const FireShow = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = e => setIsDarkMode(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const containerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
    color: isDarkMode ? '#f5f5f5' : '#222',
    background: 'transparent',
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const glassCardStyle = {
    position: 'relative',
    width: '100%',
    borderRadius: '25px',
    background: isDarkMode
      ? 'rgba(0,0,0,0.35)'
      : 'rgba(255, 255, 255, 0.65)',
    boxShadow: isDarkMode
      ? '0 10px 40px rgba(0,0,0,0.35)'
      : '0 0 40px rgba(0,0,0,0.1), inset 0 0 20px rgba(255,255,255,0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '40px'
  }

  const contentStyle = {
    color: isDarkMode ? '#f5f5f5' : '#333'
  }

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    marginTop: 0,
    color: isDarkMode ? '#ffffff' : '#000000',
    textAlign: 'center'
  }

  const subheadingStyle = {
    fontSize: '1.3rem',
    color: isDarkMode ? '#ccc' : '#555',
    marginBottom: '30px',
    textAlign: 'center',
    fontStyle: 'italic'
  }

  const descriptionStyle = {
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: '30px',
    color: isDarkMode ? '#e0e0e0' : '#444'
  }

  const videoContainerStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '30px auto',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: isDarkMode
      ? '0 0 30px rgba(255,255,255,0.1)'
      : '0 0 30px rgba(0,0,0,0.1)'
  }

  const ctaStyle = {
    fontSize: '1.1rem',
    background: isDarkMode
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(255, 255, 255, 0.65)",
    border: '1px solid ' + (isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'),
    backdropFilter: "blur(16px)",
    padding: '20px',
    borderRadius: '10px',
    marginTop: '30px',
    textAlign: 'center',
    color: isDarkMode ? '#f5f5f5' : '#222'
  }

  const emailLinkStyle = {
    color: isDarkMode ? '#64b5f6' : '#1976d2',
    textDecoration: 'none',
    fontWeight: 'bold'
  }

  const emailLinkHoverStyle = {
    ...emailLinkStyle,
    textDecoration: 'underline'
  }

  return (
    <div style={containerStyle}>
      <div style={glassCardStyle}>
        <div style={contentStyle}>
          <h1 style={headingStyle}>Live Fire Show</h1>
          <p style={subheadingStyle}>Elevate Your Event with an Unforgettable Performance</p>

          <p style={descriptionStyle}>
            Whether you're hosting an evening gala, corporate function, wedding reception, 
            or private celebration, a custom fire show adds that spectacular touch that 
            becomes the highlight of your event. Professionally choreographed, 
            safely executed, and tailored to your venue and audience.
          </p>

          <div style={videoContainerStyle}>
            <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/phB7gfduCK8?autoplay=1&mute=1&si=EjcJ64YLWk3yiyie"
                title="Live Fire Show Performance"
                frameBorder="0"
                allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ border: 'none' }}
                ></iframe>
          </div>

          <div style={ctaStyle}>
            <strong>Ready to make your event unforgettable?</strong>
            <p style={{ margin: '15px 0 0 0' }}>
              For booking inquiries and event details, reach out to{' '}
              <a
                href="mailto:flipmather@gmail.com"
                style={emailLinkStyle}
                onMouseEnter={e => Object.assign(e.target.style, emailLinkHoverStyle)}
                onMouseLeave={e => Object.assign(e.target.style, emailLinkStyle)}
              >
                flipmather@gmail.com
              </a>
            </p>
            <p style={{ margin: '10px 0 0 0', fontSize: '0.95rem', color: isDarkMode ? '#aaa' : '#666' }}>
              Also check the end of the video for additional details.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FireShow
