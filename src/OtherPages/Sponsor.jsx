import React, { useState } from 'react'
import GlassPaper from '../components/GlassPaper'
import useApi from '../hooks/useApi'
import useAuth from '../hooks/useAuth'

const SponsorPage = () => {
  const { user } = useAuth()
  const [amount, setAmount] = useState(100)
  const [name, setName] = useState(user?.first_name || '')
  const [message, setMessage] = useState('')
  const [formReady, setFormReady] = useState(false)
  const [formFields, setFormFields] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [locked, setLocked] = useState(false)

  const { api, busy } = useApi("https://www.flipmather.co.za")  // production
  // const { api, busy } = useApi("http://localhost:5173")      // testing

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (amount < 50) return setErrorMessage('Minimum donation is R50')

    // prevent spam clicking
    if (locked) return

    setLocked(true)

    const res = await api('/api/generate-payfast', {
      method: 'POST',
      body: { amount, name, message, user_id: user?.id || null }
    })

    if (res.status !== 200) {
      setLocked(false)
      setErrorMessage("Could not generate PayFast form.")
      return
    }

    setFormFields(res.data)
    setFormReady(true)
  }

  const handleCancel = () => {
    // reset everything EXCEPT amount (nice UX)
    setLocked(false)
    setFormReady(false)
    setFormFields({})
    setErrorMessage('')
  }

  // const payfastUrl = 'https://www.payfast.co.za/eng/process'          // production
  const payfastUrl = 'https://sandbox.payfast.co.za/eng/process'   // testing

  return (
    <GlassPaper size="small">
      <h2>Sponsor a Vlog 🎥</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label>
          <div>Name:</div>
          <input
            type="text"
            value={name}
            disabled={formReady}
            placeholder="Your Name (optional)"
            maxLength={25}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />

          <div>Message:</div>
          <textarea
            value={message}
            disabled={formReady}
            maxLength={255}
            placeholder="Message (optional)"
            onChange={(e) => setMessage(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />

          <div>Sponsored Amount (R):</div>
          <input
            type="number"
            value={amount}
            disabled={formReady}
            min="50"
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </label>

        <br />
        <label style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</label>
        <br />

        {!formReady && (
          <button type="submit" disabled={busy || locked || formReady}>
            {busy ? "Generating..." : locked ? "Locked in" : "Lock in amount"}
          </button>
        )}
      </form>

      {formReady && (
        <>
          <form action={payfastUrl} method="post" style={{ marginTop: '2rem' }}>
            {Object.entries(formFields).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
            <button type="submit" style={{ backgroundColor: '#d8d8d89c' }}>Pay R{amount}</button>
          </form>

          <button
            style={{ marginTop: '1rem', background: '#5353535b' }}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      )}
    </GlassPaper>
  )
}

export default SponsorPage
