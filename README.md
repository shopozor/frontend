# Shopozor frontend

## Build statuses

[![e2e Build Status](http://shopozor-ci.hidora.com/buildStatus/icon?job=frontend-e2e-pr&subject=e2e%20tests)](http://shopozor-ci.hidora.com/job/frontend-e2e-pr/)
[![Acceptance Build Status](http://shopozor-ci.hidora.com/buildStatus/icon?job=frontend-integration-pr&subject=acceptance%20tests)](http://shopozor-ci.hidora.com/job/frontend-integration-pr/)
[![Unit Build Status](http://shopozor-ci.hidora.com/buildStatus/icon?job=frontend-unit-pr&subject=unit%20tests)](http://shopozor-ci.hidora.com/job/frontend-unit-pr/)

## Docker images

### Backend development

As a backend developer, you might need to connect your application to the Shopozor's frontend. The development docker image is produced manually upon every PR merging into the `dev` branch. You can start the consumer frontend like this:
```
docker run -p 4000:4000 -it shopozor/frontend:production-dev
```

### Frontend development

As a frontend developer, you might need to connect your application to the Shopozor's backend. You can find the relevant instructions [here](https://github.com/shopozor/backend#development).

## Pull requests

### Workflow

* All Softozor members are whitelisted
* When a white-listed author opens a PR, she is triggering the corresponding unit and acceptance tests automatically
* When a white-listed member updates a PR, she is triggering the corresponding unit and acceptance tests again
* The end-to-end tests are not run automatically because not all necessary components might be ready for such tests, thus reducing the relevance of their results (e.g. it can be that the frontend implements a login functionality but that functionality is not present in the backend yet; in that case, the e2e would fail) 
* When a non-whitelisted member opens a PR, the builder will publish the question `Can one of the admins verify this patch?` to the PR's comment; in that case, one of Softozor's admins can
 
  * comment `ok to test` to accept the PR for testing
  * comment `test this please` for one time test run
  * comment `add to whitelist` to add the PR's author to the whitelist

### Useful build commands

You can use the following commands in your comments:

* `retest this please`: this runs the unit and acceptance tests again
* `test consumer e2e`: this runs the end-to-end tests (seems to be currently buggy)

## Development setup

### VSCode configuration

Make sure you run the script
```
.vscode/install-extensions.sh
```

### Pre-commit hooks

Pre-commit (and pre-push) hooks are configured with `husky` (see `husky` section of [package.json](package.json)). You also need to activate the hooks for the `graphql` and `fixtures` submodules. To do that, you run 
```
./scripts/activate-hooks.sh
```

### Gherkin step skeletons

It is pretty handy to get the skeleton code for each step of a feature file. That can be reached with the following command for the `LogAUserIn` feature
```
cd cypress/integration/Authentication
npx cucumber-js LogAUserIn.feature
```
which outputs for example
```
1) Scenario: Le membre du staff n'est pas encore enregistré # LogAUserIn.feature:13
   ? Etant donné un utilisateur non identifié
       Undefined. Implement with the following snippet:

         Given('un utilisateur non identifié', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Lorsqu'un utilisateur s'identifie avec un e-mail et un mot de passe invalides
       Undefined. Implement with the following snippet:

         When('un utilisateur s\'identifie avec un e-mail et un mot de passe invalides', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects
       Undefined. Implement with the following snippet:

         Then('il obtient un message d\'erreur stipulant que ses identifiants sont incorrects', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
```

## Troubleshooting

Upon running the unit tests, you might get an error of the kind (especially on Windows machines):
```
Cannot find module '[..]/consumer-frontend/node_modules/@quasar/babel-preset-app/node_modules/@babel/runtime/helpers/interopRequireDefault' from 'jest.setup.js'
```
Following [this advice](https://forum.quasar-framework.org/topic/3760/fix-babel-error-after-update-from-v1-0-0-beta22-to-v1-0-0-rc4), you can fix it this way:
```
cd node_modules/@quasar/babel-preset-app && yarn
```