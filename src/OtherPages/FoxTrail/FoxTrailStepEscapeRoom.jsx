import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

const initialState = {
  foxColor: '',
  jesus: false,
  number: '0',
  badge: '',
  foxMood: 'calm',
  note: ''
}

export default function FoxTrailStepEscapeRoom({ nextHref, canAdvance, onSolve, onRelock }) {
  const [form, setForm] = useState(initialState)
  const [submissionState, setSubmissionState] = useState(canAdvance ? 'correct' : 'idle')

  useEffect(() => {
    setSubmissionState(canAdvance ? 'correct' : 'idle')
  }, [canAdvance])

  const canUnlock = useMemo(() => {
    return (
      form.foxColor === 'silver' &&
      form.jesus === true &&
      Number(form.number) === 8 &&
      form.badge.toLowerCase() == 'scrat' &&
      form.foxMood === 'bold' &&
      form.note != ''
    )
  }, [form])

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = () => {
    if (canUnlock) {
      setSubmissionState('correct')
      onSolve()
      return
    }

    setSubmissionState('incorrect')
    onRelock()
  }

  return (
    <div className="fox-trail-step fox-trail-panel">
      <p className="fox-trail-copy">
        Escape room protocol: the fox den opens only when the right mix of clues is in place.
      </p>

      <div className="fox-trail-input-grid">
        <label className="fox-trail-field">
          <span>Choose a fox color</span>
          <select className="fox-trail-select" name="foxColor" value={form.foxColor} onChange={handleChange}>
            <option value="">Pick one</option>
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="silver">silver</option>
            <option value="amber">amber</option>
          </select>
        </label>

        <label className="fox-trail-field">
          <span>What is the best number in the world?</span>
          <input className="fox-trail-input" name="number" value={form.number} onChange={handleChange} type="number" min="0" max="100" />
        </label>

        <label className="fox-trail-field">
          <span>A squirrel looking for her nut</span>
          <input className="fox-trail-input" name="badge" value={form.badge} onChange={handleChange} placeholder="something a fox likes" />
        </label>

        <label className="fox-trail-field">
          <span>How should the fox move?</span>
          <select className="fox-trail-select" name="foxMood" value={form.foxMood} onChange={handleChange}>
            <option value="calm">calm</option>
            <option value="bold">bold</option>
            <option value="sleepy">sleepy</option>
          </select>
        </label>
      </div>

      <label className="fox-trail-field" style={{ marginTop: 14 }}>
        <span>
          Do you love Jesus? (check the box if you do)
        </span>
        <input type="checkbox" name="jesus" checked={form.jesus} onChange={handleChange} />
      </label>

      <label className="fox-trail-field" style={{ marginTop: 14 }}>
        <span>Notes for the fox</span>
        <textarea className="fox-trail-textarea" name="note" value={form.note} onChange={handleChange} placeholder="Type something" />
      </label>

      <div className="fox-trail-button-row">
        <button className="fox-trail-button" type="button" onClick={handleSubmit}>
          test the room
        </button>
      </div>

      {submissionState === 'correct' && canUnlock && (
        <div className="fox-trail-status">
          The den opens. You solved the escape room.
          {' '}
          <Link to={nextHref}>enter the vault</Link>
        </div>
      )}
      {submissionState === 'incorrect' && (
        <div className="fox-trail-status" style={{ background: 'rgba(255, 116, 116, 0.1)', borderColor: 'rgba(255, 116, 116, 0.2)', color: '#ffe1e1' }}>
          Not yet. The fox wants the right combination.
        </div>
      )}
    </div>
  )
}
