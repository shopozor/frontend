import types from '../../types'

export default {
  shop: 'La Budzonnerie',
  store: 'magasin',
  management: 'gestion',
  welcome: 'Bienvenue',
  dialog: {
    warning: 'Attention !'
  },
  actions: {
    ok: 'Valider',
    cancel: 'Annuler',
    save: 'Enregistrer',
    close: 'Fermer',
    goBack: 'Retour',
    connect: 'Se connecter'
  },
  links: {
    [types.links.SIGNUP]: 'S\'inscrire',
    [types.links.LOGIN]: 'Se connecter',
    [types.links.LOGOUT]: 'Se déconnecter',
    [types.links.PROFILE]: 'Profil',
    [types.links.HOME]: 'Accueil',
    [types.links.SHOP]: 'Budzonnerie',
    [types.links.MAP]: 'Carte',
    [types.links.CALENDAR]: 'Calendrier',
    [types.links.ORDERS]: 'Commandes',
    [types.links.PRODUCTS]: 'Produits',
    [types.links.MY_SHOP]: 'Ma Budzonnerie',
    [types.links.MANAGE_SHOPS]: 'Gestion des Budzonneries',
    [types.links.MANAGE_SITE]: 'Gestion du Site'
  },
  categories: {
    [types.categories.DAIRY]: 'produits laitiers',
    [types.categories.MEAT]: 'viande',
    [types.categories.FRUITS]: 'fruits',
    [types.categories.VEGETABLES]: 'légumes',
    [types.categories.GROCERY]: 'épicerie'
  },
  conservation: {
    [types.conservationModes.BASEMENT]: 'à la cave',
    [types.conservationModes.FRIDGE]: 'au frigo',
    [types.conservationModes.FREEZER]: 'au congélateur'
  },
  priceModes: {
    [types.priceModes.FREE]: 'description libre (texte)',
    [types.priceModes.AUTO_UNIT]: 'taille et unité (300 gr)',
    [types.priceModes.AUTO_PRICE]: 'calcul du prix automatique',
    [types.priceModes.BULK]: 'vente en vrac'
  },
  profile: {
    email: 'e-mail',
    password: 'mot de passe'
  },
  signup: {
    createAccount: 'Créer mon compte',
    email: {
      label: 'e-mail',
      hint: 'ceci sera votre nom de budzon',
      error: 'veuillez entrer un e-mail valide'
    },
    password: {
      label: 'mot de passe',
      hint: 'au moins 8 lettres, chiffres et caractères spéciaux',
      error: 'mot de passe invalide'
    },
    confirmPassword: {
      label: 'répétez votre mot de passe',
      hint: 'pour éviter les erreurs de frappe',
      error: 'les deux mots de passe sont différents'
    },
    cookiesPolicy: {
      accept: 'J\'accepte l\'utilisation de cookies.',
      explain: 'Nous utilisons des cookies uniquement pour faciliter votre navigation. Aucun cookie n\'est conservé après votre déconnexion.'
    },
    termsOfService: {
      accept: 'J\'accepte les conditions d\'utilisation.',
      explain: 'Les conditions d\'utilisations lient l\'utilisateur et le propriétaire de la plateforme de vente.'
    },
    creatingAccount: 'Veuillez patienter pendant que votre compte utilisateur est créé.',
    emailSent: 'Un email avec un lien d\'activation vous a été transmis. Cliquez sur ce lien pour finaliser la création de votre compte.',
    correctErrors: 'Veuillez corriger les erreurs.',
    error: 'Une erreur inconnue est survenue. Arrêtez d\'essayer de nous hacker!'
  },
  activate: {
    pending: 'Votre compte est en train d\'être activé.',
    success: 'Votre compte a été correctement activé.',
    error: {
      expiredLink: 'Votre compte n\'a pas pu être activé. Le lien a expiré.',
      unknown: 'Votre compte n\'a pas pu être activé à cause d\'une erreur inconnue.'
    }
  },
  login: {
    stayLoggedIn: 'rester connecté',
    connect: 'se connecter',
    forgotPassword: 'J\'ai oublié mon mot de passe',
    invalidCredentials: 'Votre e-mail ou votre mot de passe est invalide.',
    userIsNotStaff: 'Vous n\'êtes pas enregistré comme administrateur.'
  },
  logout: {
    pending: 'Déconnection...',
    success: 'Vous avez été correctement déconnecté.'
  },
  forgotPassword: {
    explain: 'Veuillez entrer votre nom de Budzon, afin que nous puissions vous envoyer un lien de réinitialisation du mot de passe.',
    enterMail: 'Veuillez entrer votre e-mail',
    invalidMail: 'Cet e-mail est invalide',
    emailSent: 'Un lien de réinitialisation a été envoyé à l\'adresse indiquée. Cliquez sur ce lien pour entrer un nouveau mot de passe.'
  },
  resetPassword: {
    explain: 'Entrez votre nouveau mot de passe et répétez-le.',
    invalidPassword: 'Ce mot de passe est invalide.',
    differentPasswords: 'Les deux mots de passe ne correspondent pas.',
    pending: 'Patientez pendant la requête...',
    success: 'Votre mot de passe a été changé avec succès.',
    errorLinkExpired: 'Cela n\'a pas fonctionné. Le lien utilisé a expiré.'
  },
  layout: {
    notConnected: 'non connecté'
  },
  products: {
    edit: 'éditer',
    inventory: 'inventaire',
    trash: 'corbeille',
    visible: 'Produit en vente',
    hidden: 'Produit caché',
    warningHide: 'Vous êtes sur le point de cacher un produit avec {amount} commandes en cours pour un total de {price} francs payés par les consommateurs. Vous devrez dédommager vos consommateurs si vous ne les livrez pas.',
    hide: 'Cacher',
    letVisible: 'Laisser visible',
    warningDeleteWithoutOrders: 'Vous êtes sur le point de mettre un produit à la corbeille. Il pourra être restauré pendant six mois. Passé ce délai, il sera définitvement effacé.',
    warningDeleteWithOrders: 'Vous êtes sur le point d\'effacer un produit. Ses variants seront aussi effacés. Il pourra être restauré pendant six mois, mais sera définitivement effacé par la suite. ATTENTION: Ce produit comporte {amount} commandes en cours pour un total de {price} francs payés par les consommateurs. Vous devrez dédommager vos consommateurs si vous ne les livrez pas.',
    throwAway: 'Jeter',
    keep: 'Conserver',
    ordersSummary: 'Aucune commande en cours | Une commande: {price} francs | {amount} commandes: {price} francs',
    name: 'Nom du produit',
    productDescription: 'Description du produit',
    categories: 'Catégories',
    conservationMode: 'Méthode de conservation',
    conservationTime: 'Durée de conservation',
    day: 'jour | jour | jours',
    variantDescription: 'description',
    measure: 'taille',
    unit: 'unité',
    bulk: 'Vente en vrac. Prix au ',
    consumerPays: 'le consommateur paie exactement',
    iGet: 'je reçois environ',
    shopGets: 'la Budzonnerie reçoit environ',
    softozorGets: 'les programmeurs reçoivent environ',
    rexGets: 'l\'équipe de Carlos reçoit environ',
    managerGets: 'le gérant reçoit environ',
    ordered: 'commandé | commandé | commandés',
    available: 'disponible | disponible | disponibles',
    defineDefaultPricePerUnit: 'prix à l\'unité par défaut',
    variants: {
      priceMode: 'type de conditionnement',
      thisVariantUnit: 'L\'unité de ce conditionnement',
      wasNotCompatibleWithDefaultUnit: 'n\'était pas compatible avec l\'unité par défaut de ce produit',
      nowThisVariantUnitIs: 'À présent, l\'unité de ce conditionnement est',
      stockBelowOrders: 'stock inférieur aux commandes'
    }
  },
  units: {
    names: {
      KG: 'kilo',
      HG: '100 grammes',
      DAG: '10 grammes',
      GR: 'gramme',
      L: 'litre',
      DL: 'décilitre',
      CL: 'centilitre',
      ML: 'millilitre',
      PIECE: 'pièce'
    },
    abbreviations: {
      KG: 'kg',
      HG: '100gr',
      DAG: '10gr',
      GR: 'gr',
      L: 'lt',
      DL: 'dl',
      CL: 'cl',
      ML: 'ml',
      PIECE: 'pce'
    }
  }
}
