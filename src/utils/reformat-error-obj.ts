export function reformatErrorObj(input: Record<string, string[]>): Record<string, string> {
  return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, value.join(", ")]))
}
