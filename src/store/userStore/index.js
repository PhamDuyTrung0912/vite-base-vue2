import apiService from '@/apis/userService';

export default {
    namespaced: true,
    state: {
        users: [],
    },
    getters: {
        getUsers(state) {
            return state.users;
        },
    },
    mutations: {
        mutateUsers(state, users) {
            state.users = users;
        },
    },
    actions: {
        setUsers({ commit }) {
            return apiService
                .getUsers()
                .then((data) => {
                    commit('mutateUsers', data);
                    return data;
                })
                .catch((e) => {
                    throw e;
                });
        },
    },
};
