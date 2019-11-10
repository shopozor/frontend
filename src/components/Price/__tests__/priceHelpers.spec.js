import { round } from '../priceHelpers'

test('round rounds value to smallestAmount', () => {
  expect(round({ value: 17, smallestAmount: 5 })).toBe(15)
})
