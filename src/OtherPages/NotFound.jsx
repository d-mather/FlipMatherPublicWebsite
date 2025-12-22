// src/pages/NotFound.jsx
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Page Not Found - Flip Mather'

    // Set/replace favicon (optional)
    const existing = document.querySelector("link[rel~='icon']")
    const link = existing || document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = '/assets/logos/BlackOnTransparentFM.svg' // keep this file in public/assets
    if (!existing) document.head.appendChild(link)

    return () => { document.title = prevTitle }
  }, [])

  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        .nf-body {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100svh;
          font-family: sans-serif;
          background: #0b0b0b;
          color: #eaeaea;
          text-align: center;
          padding: 1rem;
        }
        .nf-box { max-width: 600px; padding: 2rem; }
        .nf-logo { width: 80%; max-width: 400px; height: auto; margin-bottom: 1.5rem;
                   filter: drop-shadow(0 6px 18px rgba(0,0,0,0.6)); }
        .nf-logoLink { display: inline-block; text-decoration: none; border: 0; background: none; }
        .nf-title { font-size: 2rem; margin: 1.5rem 0 1rem; }
        .nf-btn { display: inline-block; margin-top: 1rem; padding: .75rem 1.5rem;
                  border-radius: 999px; background: #ff3131; color: #fff; text-decoration: none;
                  font-weight: bold; transition: background .2s ease; }
        .nf-btn:hover { background: #ff0000; }
        .nf-spacer { height: 2rem; }
      `}</style>

      <div className='nf-body'>
        <div className='nf-box' role='region' aria-label='Page not found'>
          <a href='/' className='nf-logoLink' aria-label='Go to home page'>
            <picture>
              <source srcSet='/assets/logos/WhiteOnTransparentFlipMather.svg' media='(prefers-color-scheme: dark)' />
              <img src='/assets/logos/BlackOnTransparentFlipMather.svg' alt='Flip Mather logo' className='nf-logo' />
            </picture>
          </a>

          <div className='nf-spacer' />
          <h1 className='nf-title'>404 - Ah Flip (Mather)!</h1>
          <p>Get it?</p>
          <p>Looks like this page doesn&apos;t exist. Stop trying to find something that&apos;s not there.</p>

          <a href='/' className='nf-btn'>Go back to the home page</a>
          <p style={{ marginTop: '1rem', opacity: .7, fontSize: 12 }}>© {year} Flip Mather</p>
        </div>
      </div>
    </>
  )
}
