import React, { useState } from "react"
import GlassPaper from "../components/GlassPaper"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useApi from "../hooks/useApi"

export default function VerifyEmail() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { setUser } = useAuth()
    const { api } = useApi()
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const email = state?.email

    const [otp, setOtp] = useState("")
    const [busy, setBusy] = useState(false)
    const [resendBusy, setResendBusy] = useState(false)
    const [resendMessage, setResendMessage] = useState("")

    if (!email) return <GlassPaper size="small">No email provided.</GlassPaper>

    const handleVerify = async e => {
        e.preventDefault()
        setBusy(true)

        const { status, data } = await api("/verify-email", {
            method: "POST",
            body: { email, otp },
        })

        if (status === 200) {
            setSuccessMessage("Email verified successfully!")
            // Automatically log in the user
            if (data?.user) {
                setUser(data.user)
            }
            setTimeout(() => navigate("/", { replace: true }), 500)
            return
        }

        setErrorMessage(data?.error || "Sorry, something went wrong :(")
        setBusy(false)
    }

    const handleResendCode = async () => {
        setResendBusy(true)
        setResendMessage("")
        setErrorMessage("")

        try {
            const { status, data } = await api("/resend-otp", {
                method: "POST",
                body: { email },
            })

            if (status === 200) {
                setResendMessage("New verification code sent! Check your email.")
                setOtp("")
            } else {
                setErrorMessage(data?.error || "Failed to resend code")
            }
        } catch (err) {
            setErrorMessage("Error sending code. Please try again.")
            console.error(err)
        } finally {
            setResendBusy(false)
        }
    }

    return (
        <GlassPaper size="small">
            <h2>Verify Your Email</h2>
            <p>We sent a 6-digit code to:</p>
            <strong>{email}</strong>
            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <input
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    required
                />
                <label style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</label>
                <label style={{ color: 'green', fontSize: '12px' }}>{successMessage}</label>
                <button disabled={busy} type="submit">
                    {busy ? "Verifying..." : "Verify"}
                </button>
            </form>
                <label style={{ color: 'green', fontSize: '12px', marginTop: '1rem' }}>{resendMessage}</label>
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '12px', marginBottom: '0.5rem' }}>Didn't receive the code?</p>
                <button 
                    onClick={handleResendCode}
                    disabled={resendBusy}
                    style={{
                        cursor: resendBusy ? 'not-allowed' : 'pointer',
                        opacity: resendBusy ? 0.6 : 1
                    }}
                >
                    {resendBusy ? "Sending..." : "Resend Code"}
                </button>
            </div>
        </GlassPaper>
    )
}
