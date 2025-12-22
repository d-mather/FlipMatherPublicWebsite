import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import useApi from "./useApi"

export default function AuthProvider({ children }) {
  const { api, busy } = useApi()

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user))
    else localStorage.removeItem("user")
  }, [user])

  // ----------------------------
  // LOGIN
  // ----------------------------
  async function login(email, password) {
    const { status, data } = await api("/login", {
      method: "POST",
      body: { email, password },
    })

    if (status === 200) {
      // data.user comes from your backend (adjust if needed)
      setUser(data.user)
    }

    return { status, data }
  }

  // ----------------------------
  // SIGNUP
  // ----------------------------
  async function signup(formData) {
    const { status, data } = await api("/users", {
      method: "POST",
      body: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_e164: formData.phoneNumber,
        password: formData.password,
        marketing_opt_in: formData.marketingOptIn,
      },
    })

    return { status, data }
  }

  // ----------------------------
  // LOGOUT
  // ----------------------------
  async function logout() {
    const { status } = await api("/logout", {
      method: "POST",
    })

    setUser(null)
    return status
  }

  const isUserLoggedIn = Boolean(user)
  const isUserAdmin = user?.role == "admin"

  // ----------------------------
  // ADMIN
  // ----------------------------
  async function getAllUsers() {
    return api("/admin-get-users", {
      method: "GET"
    })
  }

  async function getAllSponsors() {
    return api("/admin-get-sponsors", {
      method: "GET"
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        signup,
        busy,
        isUserLoggedIn,
        isUserAdmin,
        getAllUsers,
        getAllSponsors
      }}>
        {children}
    </AuthContext.Provider>
  )
}
