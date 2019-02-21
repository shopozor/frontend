#language: fr

# ajouter l'obligation d'accepter les cookies et de lire notre politique sur les cookies

@initial-release @common @login
Fonctionnalité: Enregistrer un nouveau client

  *En tant que nouveau client du Shopozor,  
  je veux pouvoir y créer un compte avec un e-mail et un mot de passe,  
  afin d'avoir accès à toutes ses fonctionnalités.*  

  Scénario: Le client est nouveau

    Le client n'entre qu'un e-mail pour s'enregistrer. Si celui-ci est valide, i.e. 
    si le client parvient à suivre le lien qu'il a reçu par e-mail, alors il est redirigé 
    vers une interface qui va lui permettre de choisir son mot de passe.  

    L'adresse, les nom et prénom du client seront demandés plus tard si nécessaire. 

    Etant donné un e-mail non reconnu par le Shopozor
    Lorsqu'un client fait une demande d'enregistrement avec cet e-mail
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Le client n'est pas nouveau

    Le Shopozor va communiquer qu'un e-mail est transmis à ce client qui n'est pas nouveau. 
    L'e-mail va simplement notifier le client que quelqu'un est probablement en train d'utiliser 
    son e-mail à des fins malveillantes. En plus de ça, le système va notifier Softozor du 
    problème potentiel. 

    Etant donné un e-mail déjà reconnu par le Shopozor
    Lorsqu'un client fait une demande d'enregistrement avec cet e-mail
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  # TODO: il n'y aura peut-être pas besoin de rediriger vers l'interface d'entrée du mot de passe
  # auquel cas le lien est invalidé et le compte activé
  Scénario: L'utilisateur confirme son adresse e-mail dans les temps
    # TODO: on ne peut pas vérifier que le mail a été envoyé il y a moins d'une heure
    # ceci devrait plutôt être vérifié dans des tests unitaires / d'intégration
    # Il faudrait donc plutôt vérifier que le mail vient d'être reçu ... il faut ajouter 
    # des tests unitaires qui vérifient que ça marche si le mail a été ENVOYE il y a moins d'une heure
    Etant donné un e-mail de confirmation d'enregistrement reçu il y a moins d'une heure
    # est-il possible avec l'api du mail de vérifier si un e-mail a été lu? si c'est le cas, 
    # alors on peut simplement vérifier que le mail est non lu
    Et qui n'a pas encore été lu
    Lorsque l'utilisateur consulte le lien de confirmation qu'il contient
    Alors il est redirigé vers une interface où il peut définir son mot de passe
    # pour vérifier ça, il faut consulter le lien une 2e fois et recevoir le message d'erreur
    # le serveur va envoyer un code particulier qu'il doit être possible de détecter
    Et le lien est invalidé

  # TODO: ce scénario ne sera peut-être pas du tout nécessaire si le mot de passe est donné 
  # dès le début, au moment où l'utilisateur donne son e-mail
  Scénario: L'utilisateur définit son mot de passe
    Etant donné un utilisateur qui a confirmé son adresse e-mail dans les temps
    Lorsqu'il définit son mot de passe
    Alors il obtient un message stipulant que la création du compte a été effectuée avec succès
    Et son compte est créé
    Mais il n'est pas identifié dans le Shopozor

  #Scénario: L'utilisateur confirme son adresse e-mail trop tard
  #  Etant donné un lien de confirmation d'e-mail établi il y a plus d'une heure
  #  Lorsque l'utilisateur le consulte
  #  Alors il obtient un message stipulant que le lien a expiré
  #  Et son compte n'est pas activé

  Scénario: L'utilisateur suit le lien de création de compte une deuxième fois
    Etant donné un e-mail de confirmation d'enregistrement déjà lu
    Lorsque l'utilisateur le consulte le lien de confirmation qu'il contient
    Alors il obtient un message stipulant que le lien a expiré
