import { useState } from "react"
import GlassPaper from "../components/GlassPaper"
import { useNavigate } from "react-router-dom"
import useApi from "../hooks/useApi"

function ForgotPassword() {
  const navigate = useNavigate()
  const { api, busy } = useApi()
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const { status, data } = await api("/forgot-password", {
      method: "POST",
      body: { email },
    })

    if (status !== 200) {
      setErrorMessage(data?.error || "Something went wrong")
      return
    } else {
      setErrorMessage("")
    }

    setSuccessMessage('Check your email for the reset code.')

    setTimeout(() => navigate("/reset-password?email=" + encodeURIComponent(email), {
      replace: true, // prevents going back
    }), 1500)
  }

  return (
    <GlassPaper size="small">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <h1 className="text-xl font-bold">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <label style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</label>
        <label style={{ color: 'green', fontSize: '12px' }}>{successMessage}</label>
        <button
          disabled={busy}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {busy ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
      <br />
      <button onClick={() => navigate("/login", { replace: true })}>Back</button>
    </GlassPaper>
  )
}

export default ForgotPassword
