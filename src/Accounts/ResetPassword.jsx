import { useState, useEffect } from "react"
import GlassPaper from "../components/GlassPaper"
import { useNavigate, useLocation } from "react-router-dom"
import useApi from "../hooks/useApi"

function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const { api, busy } = useApi()

  const params = new URLSearchParams(location.search)
  const emailFromQuery = params.get("email") || ""

  const [email, setEmail] = useState(emailFromQuery || "")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (emailFromQuery) {
      setEmail(emailFromQuery)
    }
  }, [emailFromQuery])

    const validationChecks = () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
            return false
        } else if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.')
            return false
        } else if (!/[a-zA-Z]/.test(password)) {
            setErrorMessage('Password must have at least one letter.')
            return false
        } else if (!/[0-9]/.test(password)) {
            setErrorMessage('Password must have at least one number.')
            return false
        }
        setErrorMessage('')
        return true
    }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validationChecks()) return

    const { status, data } = await api("/reset-password", {
      method: "POST",
      body: { email, otp, password },
    })

    if (status === 200) {
        setErrorMessage("")
        setSuccessMessage("Password reset successfully!")
        setTimeout(() => navigate("/login", { replace: true }), 1500)
    } else {
        setErrorMessage(data?.error || "Failed to reset password. Please try again.")
    }
  }

  return (
    <GlassPaper size="small">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <h1 className="text-xl font-bold">Reset Password</h1>

        <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            readOnly={!!emailFromQuery}
        />

        <input
            type="text"
            placeholder="OTP Code"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded w-full"
        />

        <input
            type="password"
            placeholder="New Password"
            autoComplete="new-password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
        />

        <input
            type="password"
            placeholder="Confirm New Password"
            autoComplete="new-password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 rounded w-full"
        />

        <label style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</label>
        <label style={{ color: 'green', fontSize: '12px' }}>{successMessage}</label>

        <button disabled={busy} className="bg-green-600 text-white px-4 py-2 rounded w-full">
            {busy ? "Resetting..." : "Reset Password"}
        </button>
        </form>
    </GlassPaper>
  )
}

export default ResetPassword
