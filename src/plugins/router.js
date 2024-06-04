import Vue from 'vue';
import VueRouter from 'vue-router';

// Layouts
const DashboardLayout = () => import('@/pages/dashboard/DashboardLayout.vue');
// Pages (Dashboard)
const HomePage = () => import('@/pages/dashboard/home/HomePage.vue');
const AboutPage = () => import('@/pages/dashboard/about/AboutPage.vue');

// Pages (Auth)

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'DashboardLayout',
        component: DashboardLayout,
        children: [
            {
                path: '/',
                name: 'HomePage',
                component: HomePage,
            },
            {
                path: '/about',
                name: 'AboutPage',
                component: AboutPage,
            },
        ],
    },
    {
        path: '/signin',
        name: 'SigninPage',
    },
    {
        path: '/signup',
        name: 'SignupPage',
    },
];

export default new VueRouter({
    mode: 'history',
    base: import.meta.env.VITE_APP_SUFFIX,
    routes,
});
