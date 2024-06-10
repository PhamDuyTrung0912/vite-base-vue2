import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import appStore from '@/store/appStore';
import userStore from '@/store/userStore';

Vue.use(Vuex);

export default new Vuex.Store({
    ...appStore,
    modules: {
        users: userStore,
    },
    // plugins: [
    //     createPersistedState({
    //         key: import.meta.env.VITE_APP_STORAGE,
    //         storage: localStorage,
    //     }),
    // ],
});
