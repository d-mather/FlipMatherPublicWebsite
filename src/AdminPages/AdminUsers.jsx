import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { formatDateTime } from "../Utils/helpers"

const filterButtonSharedStyles = {
  cursor: 'pointer',
  borderRadius: '5px',
  boxShadow: '0 0 40px rgba(0,0,0,0.05), inset 0 0 20px rgba(255,255,255,0.05)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '2px 8px 4px 8px'
}

export default function AdminUsers() {
  const { getAllUsers } = useAuth()
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    async function loadUsers() {
      const { status, data } = await getAllUsers()
      
      if (status === 200 && data.success) {
        setUsers(data.users)
      }
    }
    loadUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User List</h1>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            ...filterButtonSharedStyles,
            backgroundColor: filter === "all" ? "#007bff" : "rgba(143, 143, 143, 0.2)",
            color: filter === "all" ? "black" : "white"
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("verified")}
          style={{
            ...filterButtonSharedStyles,
            backgroundColor: filter === "verified" ? "#28a745" : "rgba(143, 143, 143, 0.2)",
            color: filter === "verified" ? "black" : "white"
          }}
        >
          Verified Only
        </button>
        <button
          onClick={() => setFilter("unverified")}
          style={{
            ...filterButtonSharedStyles,
            backgroundColor: filter === "unverified" ? "#dc3545" : "rgba(143, 143, 143, 0.2)",
            color: filter === "unverified" ? "black" : "white"
          }}
        >
          Unverified Only
        </button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Role</th>
            <th>Marketing Opt In</th>
            <th>Last Login</th>
            <th>Login Count</th>
            <th>Failed Attempts</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {users
            .filter(s => {
              if (filter === "verified") return s.email_verified_at != null
              if (filter === "unverified") return s.email_verified_at == null
              return true
            })
            .map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.first_name}</td>
              <td>{u.last_name}</td>
              <td>{u.phone_e164}</td>
              <td>{u.email}</td>
              <td>{u.email_verified_at ? "Yes" : "No"}</td>
              <td>{u.role}</td>
              <td>{u.marketing_opt_in == 1 ? "Yes" : "No"}</td>
              <td>{formatDateTime(u.last_login_at || "-")}</td>
              <td>{u.login_count}</td>
              <td>{u.failed_login_attempts}</td>
              <td>{formatDateTime(u.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
