import Vue from 'vue';
import Vuex from 'vuex';
import appStore from '@/store/appStore';
import userStore from '@/store/userStore';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app: appStore,
        users: userStore,
    },
    plugins: [
        createPersistedState({
            key: import.meta.env.VITE_APP_STORAGE,
            storage: localStorage,
            paths: ['app'],
        }),
    ],
});
