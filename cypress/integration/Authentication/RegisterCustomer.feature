#language: fr

@initial-release @signup @wip
Fonctionnalité: Enregistrer un nouveau client

  *En tant que nouveau client du Shopozor,  
  je veux pouvoir y créer un compte avec un e-mail et un mot de passe,  
  afin d'avoir accès à toutes ses fonctionnalités.*  

  Scénario: L'utilisateur consulte la politique relative aux cookies

    Lorsqu'un utilisateur accède au formulaire d'enregistrement
    Alors il peut consulter la politique relative aux cookies 

  Scénario: L'utilisateur consulte les conditions générales

    Lorsqu'un utilisateur accède au formulaire d'enregistrement
    Alors il peut consulter les conditions générales

  Scénario: L'utilisateur active le bouton de création de compte

    Tant que l'utilisateur n'a pas validé la politique relative aux cookies 
    ainsi que les conditions générales, le bouton permettant d'envoyer la 
    requête de création de compte au serveur est désactivé. 

    Etant donné un utilisateur ayant accédé au formulaire d'enregistrement
    Lorsqu'il accepte la politique relative aux cookies 
    Et les conditions générales d'utilisation 
    Alors la création de compte est possible 

  Scénario: L'utilisateur désactive le bouton de création de compte en n'acceptant plus la politique des cookies

    Etant donné un utilisateur ayant accédé au formulaire d'enregistrement
    Et qui a accepté la politique relative aux cookies
    Et les conditions générales d'utilisation
    Lorsqu'il n'accepte plus la politique relative aux cookies 
    Alors la création de compte n'est plus possible

  Scénario: L'utilisateur désactive le bouton de création de compte en n'acceptant plus les conditions générales

    Etant donné un utilisateur ayant accédé au formulaire d'enregistrement
    Et qui a accepté la politique relative aux cookies
    Et les conditions générales d'utilisation
    Lorsqu'il n'accepte plus les conditions générales
    Alors la création de compte n'est plus possible

  Scénario: Le client est nouveau

    Le client n'entre qu'un e-mail pour s'enregistrer. Si celui-ci est valide, i.e. 
    si le client parvient à suivre le lien qu'il a reçu par e-mail, alors il est redirigé 
    vers une interface qui va lui permettre de choisir son mot de passe.  

    L'adresse ainsi que les nom et prénom du client seront demandés plus tard si nécessaire.  

    Un client est inconnu si, et seulement si, son e-mail n'existe pas dans la base de données.

    Lorsqu'un client inconnu entre son e-mail dans le formulaire d'enregistrement
    Et accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Et fait la demande d'enregistrement
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Un utilisateur s'enregistre avec l'e-mail d'un compte actif

    Le Shopozor va communiquer qu'un e-mail est transmis à ce client qui n'est pas nouveau. 
    L'e-mail va simplement notifier le client que quelqu'un est probablement en train d'utiliser 
    son e-mail à des fins malveillantes. En plus de ça, le système va notifier Softozor du 
    problème potentiel. 

    Lorsqu'un utilisateur entre l'e-mail d'un compte actif dans le formulaire d'enregistrement
    Et accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Et fait la demande d'enregistrement
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Un utilisateur s'enregistre avec l'e-mail d'un compte inactif

    Si l'utilisateur a déjà fait une demande d'enregistrement et qu'il n'a pas activé son compte 
    dans les temps, alors son compte existe toujours mais il est inactif. Dans ce cas, l'utilisateur 
    peut tout à fait refaire une demande d'enregistrement pour obtenir un nouveau lien d'activation 
    de compte. 

    Lorsqu'un utilisateur entre l'e-mail d'un compte inactif dans le formulaire d'enregistrement
    Et accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Et fait la demande d'enregistrement
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Le client accède à l'interface de définition du mot de passe
  
    Que le lien d'activation de compte soit valide ou pas, l'utilisateur peut 
    accéder au formulaire de définition de mot de passe. C'est au moment où il 
    confirme son mot de passe que la validité de son lien est vérifiée. 

    Lorsqu'un client consulte son lien d'activation de compte
    Alors il est redirigé vers une interface où il peut définir son mot de passe
    Mais le bouton d'activation du compte est désactivé

  Scénario: Le bouton d'activation de compte s'active

    Le mot de passe doit satisfaire à la politique relative aux mots de passe. 

    Etant donné un client qui consulte son lien d'activation de compte
    Lorsqu'il tape un mot de passe conforme dans le champ correspondant
    Alors le bouton d'activation du compte est activé 

  Scénario: Le client passe d'un mot de passe conforme à non conforme

    Le client ne doit pas pouvoir définir un mot de passe non conforme à 
    la politique relative aux mots de passe.

    Etant donné un client qui consulte son lien d'activation de compte
    Et qui a tapé un mot de passe conforme dans le champ correspondant
    Lorsqu'il rend son mot de passe non conforme 
    Alors le bouton d'activation du compte est désactivé 

  @not-e2e
  Scénario: Le client définit un mot de passe conforme à temps

    # Tester ce scénario "end-to-end" pourrait être techniquement possible. Il faudrait 
    # mettre en place mailtrap et consulter cette boîte mail durant le test. Dans une 
    # première phase, nous ne considérons pas ce scénario durant les test e2e.

    Etant donné un client qui consulte son lien d'activation de compte
    Lorsqu'il définit un mot de passe conforme dans les temps
    Alors il obtient un message stipulant que l'activation du compte a été effectuée avec succès
    Mais il n'est pas identifié

  @not-e2e
  Scénario: Le client définit un mot de passe conforme une deuxième fois
  
    # Tester ce scénario "end-to-end" pourrait être techniquement possible. Il faudrait 
    # mettre en place mailtrap et consulter cette boîte mail durant le test. Dans une 
    # première phase, nous ne considérons pas ce scénario durant les test e2e.

    Etant donné un client qui a consulté son lien d'activation de compte
    Et qui a déjà défini un mot de passe conforme dans les temps
    Lorsqu'il définit un mot de passe conforme une deuxième fois
    Alors il obtient un message stipulant que le lien a expiré

  @not-e2e
  Scénario: Le client définit un mot de passe conforme trop tard

    # Tester ce scénario "end-to-end" n'est pas raisonnable car il faudrait en principe 
    # attendre suffisamment longtemps pour que le lien expire. Il est possible de faire 
    # avancer le temps durant les tests côté serveur mais pas durant les tests e2e. 

    Etant donné un client qui consulte son lien d'activation de compte 
    Lorsqu'il définit un mot de passe conforme trop tard
    Alors il obtient un message stipulant que le lien a expiré