import Vue from 'vue';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/plugins/router';
import toast from '@/plugins/toast';
import cookies from '@/plugins/cookies';
import map from '@/plugins/map';
import utils from '@/utils';
import store from '@/store';
import '@/styles/global.scss';

Vue.config.productionTip = false;

Vue.use(toast);
Vue.use(cookies);
Vue.use(map);
Vue.use(utils);

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
