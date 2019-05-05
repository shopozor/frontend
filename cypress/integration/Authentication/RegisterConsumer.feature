#language: fr

@initial-release @signup @wip
Fonctionnalité: Enregistrer un nouveau consommateur

  *En tant que nouveau consommateur du Shopozor,  
  je veux pouvoir y créer un compte avec un e-mail et un mot de passe,  
  afin d'avoir accès à toutes ses fonctionnalités.*  

  Scénario: Le nouveau consommateur s'enregistre avec un mot de passe conforme

    Le consommateur entre un e-mail et un mot de passe pour s'enregistrer. 
    Si son e-mail est valide, alors il reçoit un lien d'activation. 
    En suivant ce lien, il active son compte.  

    L'adresse ainsi que les nom et prénom du consommateur seront demandés 
    plus tard si nécessaire.  

    Un consommateur est inconnu si, et seulement si, son e-mail n'existe 
    pas dans la base de données.

    Lorsqu'un consommateur inconnu entre son e-mail et un mot de passe conforme dans le formulaire d'enregistrement
    Et accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Et fait la demande d'enregistrement
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  # TODO: supprimer ce scénario ? le but de scénario étant de bypasser les checks du frontend
  # les checks sont déjà faits côté backend, c'est essentiellement un retest du backend ....
  @HackerAbuse
  Scénario: Le nouveau consommateur s'enregistre avec un mot de passe non conforme

    Comme il n'est pas possible de protéger le code d'une application consommateur, puisqu'il est visible et 
    modifiable par n'importe qui, il faut compter avec des utilisateurs qui vont tenter de passer 
    outre la vérification de la conformité du mot de passe. Lorsque l'utilisateur désactive cette vérification, 
    c'est l'application serveur qui va le mettre dans l'impasse.

    Lorsqu'un consommateur inconnu entre son e-mail et un mot de passe non conforme dans le formulaire d'enregistrement
    Et accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Et fait la demande d'enregistrement
    Alors le champ du mot de passe est marqué comme erroné

  @HackerAbuse
  Scénario: Un utilisateur s'enregistre avec l'e-mail d'un compte actif

    Le Shopozor va communiquer qu'un e-mail est transmis à ce consommateur qui n'est pas nouveau. 
    L'e-mail va simplement le notifier que quelqu'un est probablement en train d'utiliser 
    son e-mail à des fins malveillantes. En plus de ça, le système va notifier Softozor du 
    problème potentiel. 

    Lorsqu'un utilisateur entre l'e-mail d'un compte actif et un mot de passe conforme dans le formulaire d'enregistrement
    Et accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Et fait la demande d'enregistrement
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Un utilisateur inactif s'enregistre avec un mot de passe conforme

    Si l'utilisateur a déjà fait une demande d'enregistrement et qu'il n'a pas activé son compte 
    dans les temps, alors son compte existe toujours mais il est inactif. Dans ce cas, l'utilisateur 
    peut tout à fait refaire une demande d'enregistrement pour obtenir un nouveau lien d'activation 
    de compte. 

    Lorsqu'un utilisateur entre l'e-mail d'un compte inactif et un mot de passe conforme dans le formulaire d'enregistrement
    Et accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Et fait la demande d'enregistrement
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  @HackerAbuse
  Scénario: Un utilisateur inactif s'enregistre avec un mot de passe non conforme

    Si l'utilisateur inactif s'enregistre avec un mot de passe non conforme, alors 
    son compte reste inactif. Il peut refaire une demande d'enregistrement. Ce scénario 
    existe pour les mêmes raisons que dans le cas du nouveau consommateur qui s'enregistre 
    avec un mot de passe non conforme. 

    Lorsqu'un utilisateur entre l'e-mail d'un compte inactif et un mot de passe non conforme dans le formulaire d'enregistrement
    Et accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Et fait la demande d'enregistrement
    Alors le champ du mot de passe est marqué comme erroné

  @not-e2e
  Scénario: Le consommateur active son compte à temps

    # Tester ce scénario "end-to-end" pourrait être techniquement possible. Il faudrait 
    # mettre en place mailtrap et consulter cette boîte mail durant le test. Dans une 
    # première phase, nous ne considérons pas ce scénario durant les test e2e.

    Lorsqu'un consommateur consulte son lien d'activation de compte dans les temps
    Alors il obtient un message stipulant que l'activation du compte a été effectuée avec succès
    Mais il n'est pas identifié

  @not-e2e
  Scénario: Le consommateur active son compte une deuxième fois
  
    # Tester ce scénario "end-to-end" pourrait être techniquement possible. Il faudrait 
    # mettre en place mailtrap et consulter cette boîte mail durant le test. Dans une 
    # première phase, nous ne considérons pas ce scénario durant les test e2e.

    Etant donné un consommateur qui a consulté son lien d'activation de compte dans les temps
    Lorsqu'il le consulte une deuxième fois
    Alors il obtient un message stipulant que le lien a expiré

  @not-e2e
  Scénario: Le consommateur active son compte trop tard

    # Tester ce scénario "end-to-end" n'est pas raisonnable car il faudrait en principe 
    # attendre suffisamment longtemps pour que le lien expire. Il est possible de faire 
    # avancer le temps durant les tests côté serveur mais durant les tests e2e c'est plus 
    # compliqué. Il faudrait théoriquement avoir une méthode dans l'api du serveur pour lui 
    # avancer son temps, ce qui est faisable mais demande du travail dont la plus-value est 
    # discutable.

    Lorsqu'un consommateur consulte son lien d'activation de compte trop tard
    Alors il obtient un message stipulant que le lien a expiré