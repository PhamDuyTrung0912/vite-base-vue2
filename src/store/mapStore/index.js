import apiService from '@/apis/userService';

export default {
    namespaced: true,
    state: {
        mapInstances: [],
    },
    getters: {
        getInstanceById: (state) => (mapId) => {
            return state.mapInstances.find((intances) => intances.getTarget() === mapId);
        },
    },
    mutations: {
        addInstances(state, instance) {
            state.mapInstances.push(instance);
        },
        removeInstanceById(state, id) {},

        removeInstances(state) {
            state.mapInstances = [];
        },
    },
    actions: {},
};
