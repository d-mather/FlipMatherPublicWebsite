import { useEffect, useState } from 'react'

const PASSWORD = 'SILVER_FOX'

export default function FoxTrailStepConsoleKey({ canAdvance, onSolve, onRelock }) {
  const [value, setValue] = useState('')
  const [solved, setSolved] = useState(canAdvance)

  useEffect(() => {
    setSolved(canAdvance)
  }, [canAdvance])

  useEffect(() => {
    console.log('%cThe trail is warm.', 'color:#ffae54;font-size:16px;font-weight:700')
    console.log('%cAu', 'color:#7CFFB2;font-size:16px;font-weight:700')
    console.log('%c_', 'color:#7CFFB2;font-size:16px;font-weight:700')
    console.log('%cxof reversed', 'color:#7CFFB2;font-size:16px;font-weight:700')
    console.log('%c(concat)', 'color:#7CFFB2;font-size:16px;font-weight:700')
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (value.trim().toUpperCase() === PASSWORD) {
      setSolved(true)
      onSolve()
    } else {
      setSolved(false)
      onRelock()
    }
  }

  return (
    <div className="fox-trail-step fox-trail-panel">
      <p className="fox-trail-copy">
        This chamber speaks in fragments.
        Some clues prefer a darker place than the page.
      </p>
      <p className="fox-trail-copy">
        Piece together the warm key.
      </p>

      <form onSubmit={handleSubmit} className="fox-trail-button-row" style={{ alignItems: 'center' }}>
        <input
          className="fox-trail-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter the warm key"
          aria-label="Console password"
        />
        <button className="fox-trail-button" type="submit">unlock</button>
      </form>

      {solved && (
        <div className="fox-trail-status">
          Correct. The key fits the lock.
        </div>
      )}
    </div>
  )
}
