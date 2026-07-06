import { useEffect, useState } from 'react'

export default function FoxTrailStepRiddle({ canAdvance, onSolve, onRelock }) {
  const [answer, setAnswer] = useState('')
  const [solved, setSolved] = useState(canAdvance)

  useEffect(() => {
    setSolved(canAdvance)
  }, [canAdvance])

  const checkAnswer = (event) => {
    event.preventDefault()
    const normalized = answer.trim().toLowerCase()
    if (normalized === 'fox') {
      setSolved(true)
      onSolve()
    } else {
      onRelock()
    }
  }

  return (
    <div className="fox-trail-step fox-trail-panel">
      <p className="fox-trail-copy">
        I am small in body, clever in the dark, and always one step from the brush.
        I leave the loud paths to everyone else.
      </p>
      <p className="fox-trail-copy">
        What creature am I?
      </p>

      <form onSubmit={checkAnswer} className="fox-trail-button-row" style={{ alignItems: 'center' }}>
        <input
          className="fox-trail-input"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Type the answer"
          aria-label="Fox riddle answer"
        />
        <button className="fox-trail-button" type="submit">check</button>
      </form>

      {solved && (
        <div className="fox-trail-status">
          Correct. The trail recognizes you.
        </div>
      )}
    </div>
  )
}
