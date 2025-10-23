export default function allEntries<T>(obj: T[] | Record<string, T>) {
  if (Array.isArray(obj)) {
    return obj.map(item => [item, item])
  }
  return Object.entries(obj)
}
