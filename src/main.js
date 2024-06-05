import Vue from 'vue';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/plugins/router';
import toast from '@/plugins/toast';
import store from '@/store';
import '@/styles/global.scss';

Vue.config.productionTip = false;

Vue.use(toast);

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
