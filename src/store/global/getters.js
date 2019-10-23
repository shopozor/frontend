export function serviceFraction (state) {
  return state.softozorFraction + state.managerFraction + state.rexFraction
}

export function serviceVAT (state) {
  return state.serviceVAT
}
