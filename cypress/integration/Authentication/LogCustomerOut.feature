# language: fr

@initial-release @common @login
Fonctionnalité: Déconnecter un client

  *En tant que client connecté au Shopozor,  
  je veux pouvoir m'en déconnecter  
  de telle sorte que je doive entrer mes identifiants à nouveau pour m'y reconnecter.*  

  Plan du Scénario: Le client est connecté
    Etant donné un <utilisateur> connecté
    Lorsqu'il se déconnecte
    Alors sa session se ferme
    Et il est redirigé vers la page d'accueil

    Exemples:
      | utilisateur  |
      | Consommateur |
      | Producteur   |
      | Responsable  |
      | Rex          |
      | Softozor     |