import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from './cookies';

// Layouts
const DashboardLayout = () => import('@/pages/dashboard/DashboardLayout.vue');
// Pages (Dashboard)
const HomePage = () => import('@/pages/dashboard/home/HomePage.vue');

const MapPage = () => import('@/pages/dashboard/map/MapPage.vue');

// place
const PlacePage = () => import('@/pages/dashboard/place/PlacePage.vue');
const PlaceListPage = () => import('@/pages/dashboard/place/list/PlaceListPage.vue');
const PlaceCategoryPage = () => import('@/pages/dashboard/place/category/PlaceCategoryPage.vue');
const PlaceSourcingPage = () => import('@/pages/dashboard/place/sourcing/PlaceSourcingPage.vue');

// Pages (Auth)
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
                name: 'Place',
                component: PlacePage,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: 'liste',
                        name: 'PlaceListPage',
                        component: PlaceListPage,
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
