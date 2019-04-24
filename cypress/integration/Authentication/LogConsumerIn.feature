# language: fr

@initial-release @login
Fonctionnalité: Identifier un consommateur

  *En tant que consommateur enregistré dans le Shopozor
  je veux pouvoir m'identifier avec un e-mail et un mot de passe,
  afin de pouvoir faire mes achats.*

  A la création de son compte, l'utilisateur est averti de l'utilisation de cookies
  qui sont incontournables pour garantir une identification sécurisée.
  Comme le compte de l'utilisateur n'est pas créé si celui-ci n'accepte pas notre politique des cookies,
  les scénarios ci-dessous ne traitent que le cas où le token d'identification est stocké dans un cookie.

  Contexte: Le consommateur n'est pas identifié
    Etant donné un consommateur non identifié

  Scénario: Le consommateur n'est pas encore enregistré
    Lorsqu'un consommateur s'identifie avec un e-mail et un mot de passe invalides
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects

  Scénario: Le consommateur est enregistré mais entre un mot de passe erroné
    Lorsqu'un consommateur s'identifie avec un e-mail valide et un mot de passe invalide
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects

  Plan du Scénario: Tout utilisateur enregistré peut s'identifier
    Lorsqu'un <utilisateur> s'identifie avec un e-mail et un mot de passe valides
    Alors sa session s'ouvre pour 1 mois

    Exemples:
      | utilisateur  |
      | Consommateur |
      | Producteur   |
      | Responsable  |
      | Rex          |
      | Softozor     |
