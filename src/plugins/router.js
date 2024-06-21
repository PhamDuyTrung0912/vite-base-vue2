import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from './cookies';

//Layout Dashboard
const DashboardLayout = () => import('@/pages/dashboard/DashboardLayout.vue');

//Pages (Auth) (Dashboard)
//1-Home
const HomePage = () => import('@/pages/dashboard/home/HomePage.vue');
//2-Place
//Layout Place
const PlaceLayout = () => import('@/pages/dashboard/place/PlaceLayout.vue');

//2.1-List
const PlaceListPage = () => import('@/pages/dashboard/place/list/PlaceListPage.vue');
//  2.1.1-Create
const PlaceCreatePage = () => import('@/pages/dashboard/place/list/action/PlaceCreatePage.vue');
//  2.1.2-Import
const PlaceImportPage = () => import('@/pages/dashboard/place/list/action/PlaceImportPage.vue');

//2.1-Category
const PlaceCategoryPage = () => import('@/pages/dashboard/place/category/PlaceCategoryPage.vue');
//  2.1.1-Create
const CategoryCreatePage = () => import('@/pages/dashboard/place/category/action/CategoryCreatePage.vue');
//  2.1.2-Update
const CategoryUpdatePage = () => import('@/pages/dashboard/place/category/action/CategoryUpdatePage.vue');
//3.1-Sourcing
const PlaceSourcingPage = () => import('@/pages/dashboard/place/sourcing/PlaceSourcingPage.vue');

//3-Map
const MapPage = () => import('@/pages/dashboard/map/MapPage.vue');

//11-Paramètres
//Layout Parameter
const ParameterLayout = () => import('@/pages/dashboard/parameter/ParameterLayout.vue');

//11.1-General
const GeneralPage = () => import('@/pages/dashboard/parameter/general/GeneralPage.vue');
//11.2-Tutoriels
const TutorialPage = () => import('@/pages/dashboard/parameter/tutorial/TutorialPage.vue');
//11.3-FAQ
const FaqPage = () => import('@/pages/dashboard/parameter/faq/FaqPage.vue');
//11.4-À propos
const ProposPage = () => import('@/pages/dashboard/parameter/propos/ProposPage.vue');
//11.5-Accessibilité
const AccessPage = () => import('@/pages/dashboard/parameter/access/AccessPage.vue');
//11.6-CGU
const CguPage = () => import('@/pages/dashboard/parameter/cgu/CguPage.vue');

// Pages (Not Auth)
const SigninPage = () => import('@/pages/auth/signin/SigninPage.vue');
const SignupPage = () => import('@/pages/auth/signup/SignupPage.vue');

// Pages (Notfound)
const NotFoundPage = () => import('@/pages/NotFoundPage.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: DashboardLayout,
        children: [
            {
                path: '/',
                name: 'HomePage',
                component: HomePage,
                meta: { requiresAuth: true },
            },
            {
                path: '/lieux',
                name: 'PlaceLayout',
                component: PlaceLayout,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: 'liste',
                        name: 'PlaceListPage',
                        component: PlaceListPage,
                    },
                    {
                        path: 'creation',
                        name: 'PlaceCreatePage',
                        component: PlaceCreatePage,
                    },
                    {
                        path: 'import',
                        name: 'PlaceImportPage',
                        component: PlaceImportPage,
                    },
                    {
                        path: 'categories',
                        name: 'PlaceCategoryPage',
                        component: PlaceCategoryPage,
                    },
                    {
                        path: 'crowdsourcing',
                        name: 'PlaceSourcingPage',
                        component: PlaceSourcingPage,
                    },

                    {
                        path: 'creation-categories/:id?',
                        name: 'CategoryCreatePage',
                        component: CategoryCreatePage,
                    },
                    {
                        path: 'update-categories/:id?',
                        name: 'CategoryUpdatePage',
                        component: CategoryUpdatePage,
                    },
                ],
            },
            {
                path: '/parameter',
                name: 'ParameterLayout',
                component: ParameterLayout,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: 'general',
                        name: 'GeneralPage',
                        component: GeneralPage,
                    },
                    {
                        path: 'tutoriels',
                        name: 'TutorialPage',
                        component: TutorialPage,
                    },
                    {
                        path: 'faq',
                        name: 'FaqPage',
                        component: FaqPage,
                    },
                    {
                        path: 'propos',
                        name: 'ProposPage',
                        component: ProposPage,
                    },
                    {
                        path: 'accessibilite',
                        name: 'AccessPage',
                        component: AccessPage,
                    },

                    {
                        path: 'cgu',
                        name: 'CguPage',
                        component: CguPage,
                    },
                ],
            },
            {
                path: '/map',
                name: 'MapPage',
                component: MapPage,
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: '/signin',
        name: 'SigninPage',
        component: SigninPage,
    },
    {
        path: '/signup',
        name: 'SignupPage',
        component: SignupPage,
    },

    //Not found
    {
        path: '*',
        name: 'NotFoundPage',
        component: NotFoundPage,
    },
];
const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.VITE_APP_SUFFIX,
    routes,
});

router.beforeEach((to, from, next) => {
    const hasToken = VueCookies.get('token');
    const isMatched = to.matched.some((record) => record.meta.requiresAuth);
    if (isMatched) {
        if (!hasToken) {
            next({
                name: 'SigninPage',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
