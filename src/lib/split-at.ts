export function splitAt<T>(arr: T[], predicate: (item: T) => boolean): T[][] {
  const result: T[][] = []
  let chunk: T[] = []

  for (const item of arr) {
    if (predicate(item)) {
      if (chunk.length) result.push(chunk)
      chunk = []
    }
    else {
      chunk.push(item)
    }
  }

  if (chunk.length) result.push(chunk)
  return result
}
