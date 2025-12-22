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

export default function AdminSponsors() {
  const { getAllSponsors } = useAuth()
  const [sponsors, setSponsors] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    async function loadSponsors() {
      const { status, data } = await getAllSponsors()
      if (status === 200 && data.success) {
        setSponsors(data.sponsors)
      }
    }
    loadSponsors()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Vlog Sponsors</h1>

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
          onClick={() => setFilter("paid")}
          style={{
            ...filterButtonSharedStyles,
            backgroundColor: filter === "paid" ? "#28a745" : "rgba(143, 143, 143, 0.2)",
            color: filter === "paid" ? "black" : "white"
          }}
        >
          Paid Only
        </button>
        <button
          onClick={() => setFilter("unpaid")}
          style={{
            ...filterButtonSharedStyles,
            backgroundColor: filter === "unpaid" ? "#dc3545" : "rgba(143, 143, 143, 0.2)",
            color: filter === "unpaid" ? "black" : "white"
          }}
        >
          Unpaid Only
        </button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Message</th>
            <th>Amount</th>
            <th>Paid?</th>
            <th>Paid At</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {sponsors
            .filter(s => {
              if (filter === "paid") return s.paid == 1
              if (filter === "unpaid") return s.paid == 0
              return true
            })
            .map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.user_id}</td>
              <td>{s.name}</td>
              <td>{s.message}</td>
              <td>R {s.amount}</td>
              <td>{s.paid == 1 ? "Yes" : "No"}</td>
              <td>{formatDateTime(s.paid_at || "-")}</td>
              <td>{formatDateTime(s.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
