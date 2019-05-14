import { When, Then } from 'cypress-cucumber-preprocessor/steps'

import { injectResponseFixtureIfFaked } from '../../../../common/cypress/integration/common/fakeServer'

import {
  fillUserRegistrationGui,
  isFieldValid,
  acceptCookies,
  acceptTermsOfService,
  submitBtnIsEnabled,
  submitRegistration
} from './helpers'

import { getTokenCookie } from '../../../../common/cypress/integration/Authentication/common/Helpers'
import types from '../../../../common/src/types'

// TODO: transfer that to fixtures ?
const invalidPassword = "a"

function accessRegistrationInterface() {
  cy.visit(`/${types.links.SIGNUP}`)
}

// TODO: create type for parsing "conforme" / "non conforme" and simplify the following steps using that terminology

When("un consommateur inconnu entre son e-mail et un mot de passe conforme dans le formulaire d'enregistrement", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterConsumer/Responses/SuccessfulConsumerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/NewConsumer')
    .then(user => {
      fillUserRegistrationGui(user.email, user.password)
      isFieldValid('password', true)
    })
});

When("accepte la politique relative aux cookies", function () {
  acceptCookies()
});

When("les conditions générales d'utilisation", function () {
  acceptTermsOfService()
});

When("fait la demande d'enregistrement", function () {
  submitBtnIsEnabled()
  submitRegistration()
});

When("un utilisateur entre l'e-mail d'un compte actif et un mot de passe conforme dans le formulaire d'enregistrement", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterConsumer/Responses/SuccessfulConsumerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/Consommateur')
    .then(user => fillUserRegistrationGui(user.email, user.password))
  isFieldValid('password', true)
});

When("un utilisateur entre l'e-mail d'un compte inactif et un mot de passe conforme dans le formulaire d'enregistrement", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterConsumer/Responses/SuccessfulConsumerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/InactiveConsumer')
    .then(user => fillUserRegistrationGui(user.email, user.password))
  isFieldValid('password', true)
});

function visitActivationLink() {
  cy.fixture('Authentication/ConfirmationLinks.json')
    .then(links => cy.visit(links.activation))
}

When(/^un consommateur (?:qui)?\s?(?:consulte|a consulté) son lien d'activation de compte dans les temps$/, function () {
  // this step must be faked because we don't call the underlying graphql query 
  // in the end-to-end mode (see gherkin comment)
  let isGraphqlFaked = true
  injectResponseFixtureIfFaked('Authentication/RegisterConsumer/Responses/SuccessfulAccountConfirmation', isGraphqlFaked)
  visitActivationLink()
});

When("un consommateur consulte son lien d'activation de compte trop tard", function () {
  // this step must be faked because we don't call the underlying graphql query 
  // in the end-to-end mode (see gherkin comment)
  let isGraphqlFaked = true
  injectResponseFixtureIfFaked('Authentication/RegisterConsumer/Responses/ExpiredAccountConfirmationLink', isGraphqlFaked)
  visitActivationLink()
});

When("il le consulte une deuxième fois", function () {
  // this step must be faked because we don't call the underlying graphql query 
  // in the end-to-end mode (see gherkin comment)
  let isGraphqlFaked = true
  injectResponseFixtureIfFaked('Authentication/RegisterConsumer/Responses/ExpiredAccountConfirmationLink', isGraphqlFaked)
  cy.wait(1000)
  cy.visit('/')
  cy.wait(1000)
  visitActivationLink()
})

Then("il obtient un message stipulant qu'un e-mail lui a été transmis", function () {
  cy.get('[id="emailSentDialog"]').should('be.visible')
});

Then("le champ du mot de passe est marqué comme erroné", function () {
  cy.get('[id="password"]').should('have.class', 'q-field--error')
})

Then("il obtient un message stipulant que l'activation du compte a été effectuée avec succès", function () {
  // the graphql query returns the SuccessfulAccountConfirmation response, i.e. 
  // an answer with no data and no errors
  cy.get('[id="successfulActivation"]').should('exist')
});

Then("il n'est pas identifié", function () {
  getTokenCookie().then(cookie => {
    expect(cookie).not.exist
  })
});

Then("il obtient un message stipulant que le lien a expiré", function () {
  // the graphql query returns the ExpiredAccountConfirmationLink response, i.e. 
  // an answer with the error "ACCOUNT_CONFIRMATION_LINK_EXPIRED"
  cy.get('[id="errorActivationLinkExpired"]').should('exist')
})