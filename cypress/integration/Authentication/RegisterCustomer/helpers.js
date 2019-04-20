export function fillUserRegistrationGui(email, password) {
  cy.get('[id="email"]').find('input').clear().type(email)
  cy.get('[id="password"]').find('input').clear().type(password)
  cy.get('[id="confirmPassword"]').find('input').clear().type(password)
}

export function acceptCookies() {
  cy.get('[id="acceptCookies"]').click()
}

export function acceptTermsOfService() {
  cy.get('[id="acceptTermsOfService"]').click()
}

function getSubmitButton() {
  return cy.get('button[id="createAccount"]')
}

export function submitBtnIsEnabled() {
  getSubmitButton().then(btn => {
    expect(btn).not.to.have.attr('disabled')
  })
}

export function submitBtnIsDisabled() {
  getSubmitButton().then(btn => {
    expect(btn).to.have.attr('disabled')
  })
}

export function submitRegistration() {
  getSubmitButton().then(btn => {
    btn.click()
  })
}

export function isFieldValid(fieldId, validity) {
  cy.get(`div[id="${fieldId}"]`).then(field => {
    if(validity) expect(field).not.to.have.class('q-field--error')
    else expect(field).to.have.class('q-field--error')
  })
}