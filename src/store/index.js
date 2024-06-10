import Vue from 'vue';
import Vuex from 'vuex';
import appStore from '@/store/appStore';
import userStore from '@/store/userStore';

Vue.use(Vuex);

export default new Vuex.Store({
    ...appStore,
    modules: {
        users: userStore,
    },
});
