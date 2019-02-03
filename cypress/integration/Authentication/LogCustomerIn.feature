# language: fr

@initial-release @login
Fonctionnalité: Identifier un client

  *En tant que client enregistré dans le Shopozor  
  je veux pouvoir m'identifier avec un e-mail et un mot de passe,  
  afin de pouvoir faire mes achats.*  

  A la création de son compte, l'utilisateur est averti de l'utilisation de cookies 
  qui sont incontournables pour garantir une identification sécurisée. 
  Comme le compte de l'utilisateur n'est pas créé si celui-ci n'accepte pas notre politique des cookies, 
  les scénarios ci-dessous ne traitent que le cas où le token d'identification est stocké dans un cookie.

  Contexte: Le client n'est pas identifié
    Etant donné un client non identifié

  Scénario: Le client n'est pas encore enregistré
    Lorsqu'un client s'identifie avec un e-mail et un mot de passe invalides
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects

  Scénario: Le client est enregistré mais entre un mot de passe erroné
    Lorsqu'un client s'identifie avec un e-mail valide et un mot de passe invalide
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects

  Scénario: Le client est enregistré et connaît son mot de passe
    Lorsqu'un client s'identifie avec un e-mail et un mot de passe valides
    Alors sa session s'ouvre pour 1 mois

  # TODO: n'importe quel administrateur peut s'identifier
