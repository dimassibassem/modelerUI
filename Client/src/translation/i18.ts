import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        English: 'English',
        French: 'French',
        Tutorial: 'Tutorial',
        'This is a tutorial': 'This is a tutorial',
        'View profile': 'View Profile',
        Shapes: 'Shapes',
        start: 'start',
        end: 'end',
        policies: 'policies',
        execution: 'execution',
        provisioners: 'provisioners',
        rule: 'rule',
        Handles: 'Handles',
        top: 'Top',
        bottom: 'Bottom',
        left: 'Left',
        right: 'Right',
        Label: 'Label',
        'Add a text': 'Add a text',
        'Add a Name': 'Add a Name',
        'Add a Channel': 'Add a Channel',
        'Add a Challenge': 'Add a Challenge',
        'Add a Enricher': 'Add an Enricher',
        name: 'Name',
        channel: 'Channel',
        challenge: 'Challenge',
        enricher: 'Enricher',
        Hook: 'Hook',
        isAsync: 'isAsync',
        Steps: 'Steps',
        'Process Definition': 'Process Definition',
        'Start creating your process': 'Start creating your process'
      }
    },
    fr: {
      translation: {
        English: 'Anglais',
        French: 'Français',
        Tutorial: 'Tutoriel',
        'This is a tutorial': 'Ceci est un tutoriel',
        'View profile': 'Voir le profil',
        Shapes: 'Formes',
        start: 'début',
        end: 'fin',
        policies: 'politiques',
        execution: 'exécution',
        provisioners: 'provisioners',
        rule: 'règle',
        Handles: 'Poignées',
        top: 'Haut',
        bottom: 'Bas',
        left: 'Gauche',
        right: 'Droite',
        Label: 'Étiquette',
        'Add a text': 'Ajouter un texte',
        'Add a Name': 'Ajouter un nom',
        'Add a Channel': 'Ajouter un canal',
        'Add a Challenge': 'Ajouter un défi',
        'Add a Enricher': 'Ajouter un enrichisseur',
        name: 'Nom',
        channel: 'Canal',
        challenge: 'Défi',
        enricher: 'Enrichisseur',
        Hook: 'Crochet',
        isAsync: 'Async',
        Steps: 'Étapes',
        'Process Definition': 'Définition du processus',
        'Start creating your process': 'Commencez à créer votre processus'
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})
