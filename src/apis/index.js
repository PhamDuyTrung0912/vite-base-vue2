import eventBus from '@/eventBus';
import store from '@/store/index';
import axios from 'axios';

class APIService {
    constructor() {
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
        });
        this.axios.interceptors.request.use((config) => {
            eventBus.$emit('isLoading');
            const token = store.getters.getToken;
            if (token) {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                };
            }
            return config;
        });

        this.axios.interceptors.response.use(
            (res) => {
                eventBus.$emit('isLoaded');
                return res.data;
            },
            (err) => {
                eventBus.$emit('isLoaded');
                throw err;
            },
        );
    }
}

export default new APIService().axios;
