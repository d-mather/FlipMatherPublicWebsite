import { useState } from "react"

export default function useApi(base = "/api") {
  const [busy, setBusy] = useState(false)
  const [csrf, setCsrf] = useState(null)

  async function api(path, { method = "GET", body } = {}) {
    setBusy(true)

    try {
      const opts = {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }

      if (csrf && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        opts.headers["X-CSRF-Token"] = csrf
      }

      if (body) opts.body = JSON.stringify(body)

      const res = await fetch(base + path, opts)
      const data = await res.json().catch(() => ({}))

      return { status: res.status, data }
    } finally {
      setBusy(false)
    }
  }

  function setCsrfToken(token) {
    setCsrf(token)
  }

  return { api, busy, setCsrfToken }
}
