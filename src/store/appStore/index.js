export default {
    state: {
        token: null,
    },
    getters: {
        getToken(state) {
            return state.token;
        },
    },
    mutations: {
        mutateToken(state, token) {
            state.token = token;
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('mutateToken', token);
        },
    },
};
