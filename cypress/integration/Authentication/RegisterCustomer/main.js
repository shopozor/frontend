import { When, Then } from 'cypress-cucumber-preprocessor/steps'

import { injectResponseFixtureIfFaked } from '../../../../common/cypress/integration/common/fakeServer'

function accessRegistrationInterface() {
  // is /register the correct route?
  cy.visit('/register')
}

// TODO: create type for parsing "conforme" / "non conforme" and simplify the following steps using that terminology

When("un client inconnu entre son e-mail et un mot de passe conforme dans le formulaire d'enregistrement", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulCustomerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    .then(user => {
      // TODO: assert the password is compliant
      fillUserRegistrationGui(user.email, user.password)
    })
});

When("un client inconnu entre son e-mail et un mot de passe non conforme dans le formulaire d'enregistrement", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/NonCompliantPassword')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    .then(user => {
      // TODO: assert the password is compliant
      password = ""
      fillUserRegistrationGui(user.email, password)
    })
});

When("accepte la politique relative aux cookies", function () {
  // 1. check the cookies policy checkbox 
  return 'pending'
});

When("les conditions générales d'utilisation", function () {
  // 1. check the general conditions checkbox
  return 'pending'
});

When("fait la demande d'enregistrement", function () {
  // 1. assert that the register button is enabled
  // 2. click the register button
  return 'pending'
});

When("un utilisateur entre l'e-mail d'un compte actif et un mot de passe conforme dans le formulaire d'enregistrement", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulCustomerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/Consommateur')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    // TODO: assert password compliance
    .then(user => fillUserRegistrationGui(user.email, user.password))
  // TODO: click the registration button
  return 'pending'
});

When("un utilisateur entre l'e-mail d'un compte inactif et un mot de passe conforme dans le formulaire d'enregistrement", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulCustomerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/InactiveCustomer')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    // TODO: assert password compliance
    .then(user => fillUserRegistrationGui(user.email, user.password))
  // TODO: click the registration button
  return 'pending'
});

When("un utilisateur entre l'e-mail d'un compte inactif et un mot de passe non conforme dans le formulaire d'enregistrement", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/NonCompliantPassword')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/InactiveCustomer')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    // TODO: assert password non-compliance
    .then(user => fillUserRegistrationGui(user.email, user.password))
  // TODO: click the registration button
  return 'pending'
});

function visitActivationLink() {
  // TODO: visit /activate/uidb64/token <-- get from fixtures
  cy.visit('/activate/uidb64/token')
}

When("un client (?:qui)?\s?(?:consulte|a consulté) son lien d'activation de compte dans les temps", function () {
  // this step must be faked because we don't call the underlying graphql query 
  // in the end-to-end mode (see gherkin comment)
  let isGraphqlFaked = true
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulAccountConfirmation', isGraphqlFaked)
  visitActivationLink()
});

When("un client consulte son lien d'activation de compte trop tard", function () {
  // this step must be faked because we don't call the underlying graphql query 
  // in the end-to-end mode (see gherkin comment)
  let isGraphqlFaked = true
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/ExpiredAccountConfirmationLink', isGraphqlFaked)
  visitActivationLink()
});

When("il le consulte une deuxième fois", function () {
  // this step must be faked because we don't call the underlying graphql query 
  // in the end-to-end mode (see gherkin comment)
  let isGraphqlFaked = true
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/ExpiredAccountConfirmationLink', isGraphqlFaked)
  visitActivationLink()
})

Then("il obtient un message stipulant qu'un e-mail lui a été transmis", function () {
  // if the graphql query was successful, then the frontend receives the SuccessfulCustomerCreation response, i.e. an answer with no data and no errors
  // upon clicking the registration button, you need to check that the message about the e-mail is displayed
  return 'pending'
});

Then("il est redirigé vers une interface où il peut définir son mot de passe", function () {
  // 1. assert that there is an input field for a password
  return 'pending'
});

Then("il obtient un message stipulant que l'activation du compte a été effectuée avec succès", function () {
  // the graphql query returns the SuccessfulAccountConfirmation response, i.e. 
  // an answer with no data and no errors
  // TODO: upon clicking the activation button, you need to check that the corresponding message is displayed
  return 'pending'
});

Then("il obtient un message stipulant que son mot de passe n'est pas conforme", function () {
  // the graphql query returns NonCompliantPassword response
  // TODO: you need to check that the corresponding message is displayed upon clicking the activation button
  return 'pending'
})

Then("il n'est pas identifié", function () {
  // TODO: double-check that the session cookie doesn't contain any token
  return 'pending'
});

Then("il obtient un message stipulant que le lien a expiré", function () {
  // the graphql query returns the ExpiredAccountConfirmationLink response, i.e. 
  // an answer with the error "ACCOUNT_CONFIRMATION_LINK_EXPIRED"
  // you need to check that the corresponding error message is displayed
  return 'pending'
})