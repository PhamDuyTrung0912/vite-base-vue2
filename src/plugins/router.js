import Vue from 'vue';
import VueRouter from 'vue-router';

// Home
const HomePage = () => import('@/pages/home/HomePage.vue');
const AboutPage = () => import('@/pages/about/AboutPage.vue');

Vue.use(VueRouter);

const routes = [
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
];

export default new VueRouter({
    mode: 'history',
    base: import.meta.env.VITE_APP_SUFFIX,
    routes,
});
