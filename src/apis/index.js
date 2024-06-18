import eventBus from '@/eventBus';
import axios from 'axios';
import cookies from '@/plugins/cookies';

class APIService {
    constructor() {
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
        });
        this.axios.interceptors.request.use((config) => {
            const token = cookies.get('token');
            if (token) {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                };
            }
            return config;
        });

        this.axios.interceptors.response.use(
            (res) => {
                return res.data;
            },
            (err) => {
                throw err;
            },
        );
    }
}

export default new APIService().axios;
