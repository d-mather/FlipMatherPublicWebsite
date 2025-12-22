import React, { useState } from "react"
import GlassPaper from "../components/GlassPaper"
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function LoginPage({ nextPage }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, busy } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const redirectTo = location.state?.from?.pathname || nextPage || "/"

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage("")

    const { status, data } = await login(email, password)

    if (data?.error == "Email not verified") {
      navigate("/verify-email", { state: { email }, replace: true })
      return
    }

    if (status === 404) {
      setErrorMessage("Sorry, something went wrong.")
      return
    }
    else if (status !== 200) {
      setErrorMessage(data?.error || "Invalid login.")
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <GlassPaper size="small">
      <h2>Login to Your Account</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <label>
          Email: <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password: <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div>
          <button type="submit" disabled={busy}>
            {busy ? "Logging in..." : "Login"}
          </button>
          <label style={{ color: "red", fontSize: "12px", marginLeft: "1rem", position: "absolute", marginTop: 5 }}>
            {errorMessage}
          </label>
        </div>
      </form>

        <br />
        <div className="text-right mt-2">
            <Link to="/forgot-password">Forgot your password?</Link>
        </div>
        <div>
            Don't have an account??? <Link to="/signup">Sign Up!!!</Link>
        </div>
    </GlassPaper>
  )
}

export default LoginPage
