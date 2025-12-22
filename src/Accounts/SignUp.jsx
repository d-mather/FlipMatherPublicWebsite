import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import GlassPaper from '../components/GlassPaper'
import isEmail from 'validator/lib/isEmail'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function SignUpPage() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [marketingOptIn, setMarketingOptIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(false)

    const { signup, busy } = useAuth()

    const validationChecks = () => {
        const nameRegex = /^[A-Za-z-]+$/

        if (!nameRegex.test(firstName)) {
            setErrorMessage('First name must contain only letters.')
            return false
        } else if (!nameRegex.test(lastName)) {
            setErrorMessage('Last name must contain only letters.')
            return false
        } else if (isPossiblePhoneNumber(phoneNumber) === false) {
            setErrorMessage('Invalid phone number.')
            return false
        } else if (!isEmail(email)) {
            setErrorMessage('Invalid email address.')
            return false
        } else if (password !== confirmPassword) {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validationChecks()) return

        setSubmitDisabled(true)

        const { status, data } = await signup({
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            marketingOptIn
        })

        if (status !== 201) {
            setErrorMessage(data?.error || "Something went wrong.")
            setSubmitDisabled(false)
            return
        }

        // success
        navigate("/verify-email", { state: { email } })
        setSubmitDisabled(false)
    }

    return (
        <GlassPaper size="small">
            <h2>Create an Account (Free)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <label>
                    First Name: <br />
                    <input
                        name="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        maxLength={20}
                        required
                    />
                </label>
                <label>
                    Last Name: <br />
                    <input
                        name="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        maxLength={20}
                        required
                    />
                </label>
                <label>
                    Phone Number: <br />
                    <PhoneInput
                        placeholder="Enter phone number"
                        defaultCountry="ZA"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        name="phoneNumber"
                        required
                    />
                </label>
                <label>
                    Email:
                    <br />
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password: <br />
                    <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <br />
                    <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input type="checkbox" onChange={e => setMarketingOptIn(e.target.checked)} />
                    {' '}Receive marketing emails?
                </label>
                <label>
                    <input type="checkbox" />
                    {' '}Check this box for fun.
                </label>
                <label style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</label>
                <button type="submit" disabled={submitDisabled || busy} style={{ fontSize: '1rem', padding: '0.1rem 1rem' }}>
                    {busy ? "Creating..." : "Create Account"}
                </button>
            </form>
            <br />
            <div>Already have an account??? <Link to="/login ">Login!!!</Link></div>
        </GlassPaper>
    )
}

export default SignUpPage
