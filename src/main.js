import Vue from 'vue';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/plugins/router';
import store from '@/store';
import toast from '@/plugins/toast';
import '@/styles/global.scss';

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    store,
    toast,
    render: (h) => h(App),
}).$mount('#app');
