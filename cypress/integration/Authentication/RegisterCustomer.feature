#language: fr

@initial-release @login
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
    Lorsqu'un client accepte la politique du Shopozor relative aux cookies
    Et accepte les conditions générales d'utilisation du Shopozor 
    Et fait une demande d'enregistrement avec cet e-mail
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Le client n'est pas nouveau

    Le Shopozor va communiquer qu'un e-mail est transmis à ce client qui n'est pas nouveau. 
    L'e-mail va simplement notifier le client que quelqu'un est probablement en train d'utiliser 
    son e-mail à des fins malveillantes. En plus de ça, le système va notifier Softozor du 
    problème potentiel. 

    Etant donné un e-mail déjà reconnu par le Shopozor
    Lorsqu'un client fait une demande d'enregistrement avec cet e-mail
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Le client confirme son adresse e-mail dans les temps
  
    # Le lien est du type http://localhost:4000/#/activate/<uidb64>/<token>

    Lorsque le client consulte son lien de confirmation dans les temps
    Alors il est redirigé vers une interface où il peut définir son mot de passe

  Scénario: Le client définit son mot de passe
  
    Etant donné un client qui a confirmé son adresse e-mail dans les temps
    Lorsqu'il définit son mot de passe
    Alors il obtient un message stipulant que la création du compte a été effectuée avec succès
    Mais il n'est pas identifié dans le Shopozor

  Scénario: Le client confirme son adresse e-mail trop tard
  
    Lorsque le client consulte son lien de confirmation trop tard
    Alors il obtient un message stipulant que le lien a expiré

  Scénario: Le client confirme la création de compte une deuxième fois
  
    Lorsque le client consulte son lien de confirmation une deuxième fois
    Alors il obtient un message stipulant que le lien a expiré