// Returns a function that maps a value in [domainMin, domainMax]
// to a pixel position in [rangeMin, rangeMax].
export function scale(domainMin, domainMax, rangeMin, rangeMax) {
  return (value) => {
    // All values equal: put everything in the middle instead of dividing by zero.
    if (domainMax === domainMin) return (rangeMin + rangeMax) / 2
    const t = (value - domainMin) / (domainMax - domainMin)
    return rangeMin + t * (rangeMax - rangeMin)
  }
}

// Returns `count + 1` evenly spaced values from min to max.
export function ticks(min, max, count = 5) {
  return Array.from({ length: count + 1 }, (_, i) => min + ((max - min) * i) / count)
}
