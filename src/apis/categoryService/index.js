import api from '../index';

const getCategories = () => {
    return api.get('api/categories');
};

const addCategory = (data) => {
    return api.post('api/categories', data);
};

export default {
    getCategories,
    addCategory,
};
