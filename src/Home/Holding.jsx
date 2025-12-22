import '../App.css'
import { lazy, Suspense, useEffect, useState } from 'react'

const Ballpit = lazy(() => import('../components/Ballpit'))
const CircularText = lazy(() => import('../components/CircularText'))

function Holding() {
  const year = new Date().getFullYear()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="wrapper">
        {!isMobile && (
            <div className='ballpit-wrapper'>
                <Suspense fallback={null}>
                    <Ballpit
                        count={50}
                        gravity={0.05}
                        friction={1}
                        wallBounce={1}
                        followCursor={false}
                        colors={[0, 0, 0]}
                        className="ballpit"
                    />
                </Suspense>
            </div>
        )}
        <Suspense fallback={null}>
            <CircularText
                text="Flip Mather "
                onHover="goBonkers"
                spinDuration={30}
                className="custom-circular-class"
                style={{ color: 'var(--text)', height: '200px', width: '200px' }}
            />
        </Suspense>
        <br />
        <section className="card" role="region" aria-label="Flip Mather intro">
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

            <div className="content">
                <p className="tagline">New site in the works.<br /> In the meantime, catch the latest drops from Flip Mather 👇</p>

                <div className="actions">
                    <a className="btn btn-primary" href="https://www.youtube.com/c/FlipMather" target="_blank" rel="noopener noreferrer" aria-label="Open Flip Mather YouTube channel">
                        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.9 3 12 3 12 3s-6.9 0-8.7.4A4 4 0 0 0 .5 6.2 41 41 0 0 0 0 12a41 41 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.1 21 12 21 12 21s6.9 0 8.7-.4a4 4 0 0 0 2.8-2.8A41 41 0 0 0 24 12a41 41 0 0 0-.5-5.8ZM9.7 15.6V8.4L16 12l-6.3 3.6Z"/></svg>
                        Watch on YouTube
                    </a>

                    <a className="btn btn-ghost insta-link" href="https://www.instagram.com/flip_mather" target="_blank" rel="noopener noreferrer" aria-label="Open Flip Mather on Instagram">
                        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.6 6.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"/><path d="M12 0C8.7 0 8.3 0 7 0.1 5.6 0.2 4.6 0.4 3.7 0.8a5.9 5.9 0 0 0-2.9 2.9C0.4 4.6 0.2 5.6 0.1 7 0 8.3 0 8.7 0 12s0 3.7 0.1 5c0.1 1.4 0.3 2.4 0.7 3.3a5.9 5.9 0 0 0 2.9 2.9c0.9 0.4 1.9 0.6 3.3 0.7 1.3 0.1 1.7 0.1 5 0.1s3.7 0 5-0.1c1.4-0.1 2.4-0.3 3.3-0.7a5.9 5.9 0 0 0 2.9-2.9c0.4-0.9 0.6-1.9 0.7-3.3C24 15.7 24 15.3 24 12s0-3.7-0.1-5c-0.1-1.4-0.3-2.4-0.7-3.3a5.9 5.9 0 0 0-2.9-2.9C19.4 0.4 18.4 0.2 17 0.1 15.7 0 15.3 0 12 0Zm0 2c3.3 0 3.7 0 5 0.1 1.2 0.1 1.8 0.3 2.2 0.4 0.6 0.2 1 0.4 1.4 0.8 0.4 0.4 0.6 0.8 0.8 1.4 0.2 0.4 0.3 1 0.4 2.2 0.1 1.3 0.1 1.7 0.1 5s0 3.7-0.1 5c-0.1 1.2-0.3 1.8-0.4 2.2-0.2 0.6-0.4 1-0.8 1.4-0.4 0.4-0.8 0.6-1.4 0.8-0.4 0.2-1 0.3-2.2 0.4-1.3 0.1-1.7 0.1-5 0.1s-3.7 0-5-0.1c-1.2-0.1-1.8-0.3-2.2-0.4-0.6-0.2-1-0.4-1.4-0.8-0.4-0.4-0.6-0.8-0.8-1.4-0.2-0.4-0.3-1-0.4-2.2C2 15.7 2 15.3 2 12s0-3.7 0.1-5C2.2 5.8 2.3 5.2 2.4 4.8c0.2-0.6 0.4-1 0.8-1.4 0.4-0.4 0.8-0.6 1.4-0.8 0.4-0.2 1-0.3 2.2-0.4C8.3 2 8.7 2 12 2Z"/></svg>
                        Instagram
                    </a>
                </div>
                <p className="fineprint">© {year} Flip Mather. The one and only.</p>
            </div>
        </section>
    </div>
  )
}

export default Holding
