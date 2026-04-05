export const escapeHtml = (value: string | number): string =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

export const formatDistance = (meters = 0): string => {
  const kilometers = meters / 1000
  return `${kilometers.toFixed(2).replace(".", ",")} km`
}

export const formatDuration = (seconds = 0): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return [hours, minutes, remainingSeconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":")
}

export const formatPace = (distance = 0, movingTime = 0): string => {
  if (!distance || !movingTime) return "-"
  const pacePerKilometer = movingTime / (distance / 1000)
  const minutes = Math.floor(pacePerKilometer / 60)
  const seconds = Math.round(pacePerKilometer % 60)
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}/km`
}

export const formatRunDate = (dateValue: string | Date | null): string => {
  if (!dateValue) return "Date inconnue"
  return new Date(dateValue).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}
