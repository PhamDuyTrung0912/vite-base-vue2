import api from '../index';
import Vue from 'vue';

const signIn = async (data) => {
    try {
        const response = await api.post('api/login', data);
        return response;
    } catch (error) {
        if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            Vue.prototype.$toast.error({ message: 'Your account or password is incorrect !' });
        }
        throw error;
    }
};

export default {
    signIn,
};
