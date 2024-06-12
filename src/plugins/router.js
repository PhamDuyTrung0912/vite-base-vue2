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
//2.1-Sourcing
const PlaceSourcingPage = () => import('@/pages/dashboard/place/sourcing/PlaceSourcingPage.vue');

// category
import CategoryCreatePage from '@/pages/dashboard/place/category/action/CategoryCreatePage.vue';

//3-Map
const MapPage = () => import('@/pages/dashboard/map/MapPage.vue');

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
                        path: 'creation-categories',
                        name: 'CategoryCreatePage',
                        component: CategoryCreatePage,
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
