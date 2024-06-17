export default [
    {
        action: 'mdi-home-outline',
        title: 'Accueil',
        route: 'HomePage',
    },
    {
        action: 'mdi-map-marker-outline',
        route: ['PlaceListPage', 'PlaceCategoryPage', 'PlaceSourcingPage', 'PlaceCreatePage', 'PlaceImportPage', 'CategoryCreatePage'],
        items: [
            { title: 'Liste', route: 'PlaceListPage', routes: ['PlaceCreatePage', 'PlaceListPage', 'PlaceImportPage'] },
            { title: 'Catégories', route: 'PlaceCategoryPage', routes: ['PlaceCategoryPage', 'CategoryCreatePage'] },
            { title: 'Crowdsourcing', route: 'PlaceSourcingPage', routes: ['PlaceSourcingPage'] },
        ],
        title: 'Lieux',
    },
    {
        action: 'mdi-calendar',
        title: 'Événements',
        route: 'MapPage',
    },
    {
        action: 'mdi-text-box-multiple-outline',
        title: 'Démarches',
        route: 'MapPage',
    },
    {
        action: 'mdi-room-service-outline',
        title: 'Services',
        route: 'MapPage',
    },
    {
        action: 'mdi-bullhorn-outline',
        title: 'Publications',
        route: 'MapPage',
    },
    {
        action: 'mdi-assistant',
        title: 'Suggestions',
        route: 'MapPage',
    },
    {
        action: 'mdi-widgets-outline',
        title: 'Thèmes',
        route: 'MapPage',
    },
    {
        action: 'mdi-account-multiple-outline',
        title: 'Utilisateurs',
        route: 'MapPage',
    },
    {
        action: 'mdi-poll',
        title: 'Statistiques',
        route: 'MapPage',
    },
    {
        action: 'mdi-cog-outline',
        title: 'Paramètres',
        route: 'MapPage',
        route: ['GeneralPage', 'TutorialPage', 'FaqPage', 'ProposPage', 'AccessPage', 'CguPage'],

        items: [
            { title: 'Général', route: 'GeneralPage', routes: ['GeneralPage'] },
            { title: 'Tutoriels', route: 'TutorialPage', routes: ['TutorialPage'] },
            { title: 'FAQ', route: 'FaqPage', routes: ['FaqPage'] },
            { title: 'À propos', route: 'ProposPage', routes: ['ProposPage'] },
            { title: 'Accessibilité', route: 'AccessPage', routes: ['AccessPage'] },
            { title: 'CGU', route: 'CguPage', routes: ['CguPage'] },
        ],
    },
];
