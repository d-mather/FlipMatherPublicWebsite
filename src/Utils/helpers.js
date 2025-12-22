export function formatDateTime(dateString) {
  if (dateString == "-") return dateString

  const date = new Date(dateString)

  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const ampm = hours >= 12 ? "pm" : "am"

  const hour12 = hours % 12 || 12

  const day = date.getDate()
  const year = date.getFullYear()

  const monthShort = date.toLocaleString("en-US", { month: "short" })

  return `${hour12}:${minutes}${ampm} ${day} ${monthShort} ${year}`
}
