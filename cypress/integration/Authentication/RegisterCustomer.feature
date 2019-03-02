#language: fr

@initial-release @signup @wip
Fonctionnalité: Enregistrer un nouveau client

  *En tant que nouveau client du Shopozor,  
  je veux pouvoir y créer un compte avec un e-mail et un mot de passe,  
  afin d'avoir accès à toutes ses fonctionnalités.*  

  Scénario: Le client est nouveau

    Le client n'entre qu'un e-mail pour s'enregistrer. Si celui-ci est valide, i.e. 
    si le client parvient à suivre le lien qu'il a reçu par e-mail, alors il est redirigé 
    vers une interface qui va lui permettre de choisir son mot de passe.  

    L'adresse ainsi que les nom et prénom du client seront demandés plus tard si nécessaire.  

    Un client est connu du Shopozor si, et seulement si, son e-mail est inclus dans 
    sa base de données.

    Etant donné un client inconnu du Shopozor
    Et qui accepte la politique relative aux cookies
    Et les conditions générales d'utilisation 
    Lorsqu'il fait une demande d'enregistrement
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Un utilisateur s'enregistre avec un e-mail déjà connu

    Le Shopozor va communiquer qu'un e-mail est transmis à ce client qui n'est pas nouveau. 
    L'e-mail va simplement notifier le client que quelqu'un est probablement en train d'utiliser 
    son e-mail à des fins malveillantes. En plus de ça, le système va notifier Softozor du 
    problème potentiel. 

    Lorsqu'un utilisateur enregistré fait une demande d'enregistrement
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  Scénario: Le client confirme son adresse e-mail dans les temps
  
    # Le lien est du type http://localhost:4000/#/activate/<uidb64>/<token>
    # Il suffit de visiter cette adresse et vérifier qu'il contient un formulaire qui permet de changer le mot de passe

    Lorsque le client consulte son lien de confirmation dans les temps
    Alors il est redirigé vers une interface où il peut définir son mot de passe

  @not-e2e
  Scénario: Le client définit son mot de passe à temps

    # Tester ce scénario "end-to-end" pourrait être techniquement possible. Il faudrait 
    # mettre en place mailtrap et consulter cette boîte mail durant le test. Dans une 
    # première phase, nous ne considérons pas ce scénario durant les test e2e.

    Etant donné un nouveau client qui suit le lien de confirmation de création de compte
    Lorsqu'il définit son mot de passe dans les temps
    Alors il obtient un message stipulant que la création du compte a été effectuée avec succès
    Mais il n'est pas identifié dans le Shopozor

  @not-e2e
  Scénario: Le client confirme son adresse e-mail trop tard

    # Tester ce scénario "end-to-end" n'est pas raisonnable car il faudrait en principe 
    # attendre suffisamment longtemps pour que le lien expire. Il est possible de faire 
    # avancer le temps durant les tests côté serveur mais pas durant les tests e2e. 

    Etant donné un nouveau client qui a reçu un lien de confirmation de création de compte
    Lorsqu'il définit son mot de passe trop tard
    Alors il obtient un message stipulant que le lien a expiré

  @not-e2e
  Scénario: Le client confirme la création de compte une deuxième fois
  
    # Tester ce scénario "end-to-end" pourrait être techniquement possible. Il faudrait 
    # mettre en place mailtrap et consulter cette boîte mail durant le test. Dans une 
    # première phase, nous ne considérons pas ce scénario durant les test e2e.

    Etant donné un nouveau client qui a reçu un lien de confirmation de création de compte
    Lorsque le client consulte son lien de confirmation une deuxième fois
    Alors il obtient un message stipulant que le lien a expiré