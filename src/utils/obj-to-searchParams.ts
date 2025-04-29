export const objectToSearchParams = (obj: Record<string, unknown>) => {
  const params = new URLSearchParams()
  Object.entries(obj).forEach(([key, value]) => {
    if (value === null) return
    if (typeof value === "object") {
      params.set(key, encodeURIComponent(JSON.stringify(value)))
    } else {
      params.set(key, String(value))
    }
  })
  return params
}
