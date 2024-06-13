export default [
    {
        action: 'mdi-home-outline',
        title: 'Accueil',
        route: 'HomePage',
    },
    {
        action: 'mdi-map-marker-outline',
        route: ['PlaceListPage', 'PlaceCategoryPage', 'PlaceSourcingPage', 'PlaceCreatePage', 'PlaceImportPage'],
        items: [
            { title: 'Liste', route: 'PlaceListPage', routes: ['PlaceCreatePage', 'PlaceListPage', 'PlaceImportPage'] },
            { title: 'Catégories', route: 'PlaceCategoryPage', routes: ['PlaceCategoryPage'] },
            { title: 'Crowdsourcing', route: 'PlaceSourcingPage', routes: ['PlaceSourcingPage'] },
        ],
        title: 'Lieux',
    },
    {
        action: 'mdi-map-outline',
        title: 'Événements',
        route: 'MapPage',
    },
];
