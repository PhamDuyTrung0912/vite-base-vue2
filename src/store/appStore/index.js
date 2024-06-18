export default {
    namespaced: true,
    state: {
        user: null,
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    mutations: {
        mutateUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit('mutateToken', user);
        },
    },
};
