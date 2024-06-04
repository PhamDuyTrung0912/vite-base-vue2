import axios from 'axios';

class APIService {
    constructor() {
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
        });
        this.axios.interceptors.request.use((config) => {
            const token = null;
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
