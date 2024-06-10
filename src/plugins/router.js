import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from './cookies';

// Layouts
const DashboardLayout = () => import('@/pages/dashboard/DashboardLayout.vue');
// Pages (Dashboard)
const HomePage = () => import('@/pages/dashboard/home/HomePage.vue');
const AboutPage = () => import('@/pages/dashboard/about/AboutPage.vue');

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
                path: '/about',
                name: 'AboutPage',
                component: AboutPage,
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
