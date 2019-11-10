export function round ({ value, smallestAmount }) {
  return Math.round(value / smallestAmount) * smallestAmount
}
