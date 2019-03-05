import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

function accessRegistrationInterface() {
  // is /register the correct route?
  cy.visit('/register')
}

Given("^un utilisateur ayant accédé au formulaire d'enregistrement$", function () {
  accessRegistrationInterface()
});

When("^un client inconnu entre son e-mail dans le formulaire d'enregistrement$", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulCustomerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    .then(user => fillUserRegistrationGui(user.email))
});

When("^(?:il|qui a)?\s?accept(?:e|é) la politique relative aux cookies$", function () {
  // 1. check the cookies policy checkbox 
  return 'pending'
});

When("^les conditions générales d'utilisation$", function () {
  // 1. check the general conditions checkbox
  return 'pending'
});

When("^il n'accepte plus la politique relative aux cookies$", function () {
  // 1. uncheck the cookies policy checkbox
  return 'pending'
})

When("^il n'accepte plus les conditions générales$", function () {
  // 1. uncheck the general conditions checkbox
  return 'pending'
})

When("^fait la demande d'enregistrement$", function () {
  // 1. assert that the register button is enabled
  // 2. click the register button
  return 'pending'
});

When("^un utilisateur enregistré fait une demande d'enregistrement$", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulCustomerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/Consommateur')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    .then(user => fillUserRegistrationGui(user.email))
  // TODO: click the registration button
  return 'pending'
});

When("^(?:un|le) client (?:qui)?\s?(?:consulte|a consulté) son lien de confirmation de création de compte$", function () {
  // TODO: visit /activate/uidb64/token <-- get from fixtures
  cy.visit('/activate/uidb64/token')
});

When("^(?:il|qui a déjà) définit? son mot de passe dans les temps$", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulAccountConfirmation')
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserPasswordGui
    // that method must be in the common folder, as the password can 
    // be reset in both frontend applications
    .then(user => fillUserPasswordGui(user.email))
  // TODO: click the set password button
});

function newCustomerDefinesPasswordWhenLinkExpired() {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/ExpiredAccountConfirmationLink')
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserPasswordGui
    // that method must be in the common folder, as the password can 
    // be reset in both frontend applications
    .then(user => fillUserPasswordGui(user.email))
  // TODO: click the set password button
}

When("^il définit son mot de passe trop tard$", function () {
  newCustomerDefinesPasswordWhenLinkExpired()
});

When("^il définit son mot de passe une deuxième fois$", function () {
  newCustomerDefinesPasswordWhenLinkExpired()
})

// TODO: possibly group the following two Then steps together
Then("^la création de compte est possible$", function () {
  // 1. assert that the registration button is enabled
  return 'pending'
});

Then("^la création de compte n'est plus possible$", function () {
  // 1. assert that the registration button is disabled
  return 'pending'
})

Then("^il obtient un message stipulant qu'un e-mail lui a été transmis$", function () {
  // if the graphql query was successful, then the frontend receives the SuccessfulCustomerCreation response, i.e. an answer with no data and no errors
  // upon clicking the registration button, you need to check that the message about the e-mail is displayed
  return 'pending'
});

Then("^il est redirigé vers une interface où il peut définir son mot de passe$", function () {
  // 1. assert that there is an input field for a password
  return 'pending'
});

Then("^il obtient un message stipulant que la création du compte a été effectuée avec succès$", function () {
  // the graphql query returns the SuccessfulAccountConfirmation response, i.e. 
  // an answer with no data and no errors
  // TODO: upon clicking the set password button, you need to check that the corresponding message is displayed
  return 'pending'
});

Then("^il n'est pas identifié$", function () {
  // TODO: double-check that the session cookie doesn't contain any token
  return 'pending'
});

Then("^il obtient un message stipulant que le lien a expiré$", function () {
  // the graphql query returns the ExpiredAccountConfirmationLink response, i.e. 
  // an answer with the error "ACCOUNT_CONFIRMATION_LINK_EXPIRED"
  // you need to check that the corresponding error message is displayed
  return 'pending'
})