import api from '../index';

const getCategories = () => {
    return api.get('api/categories');
};

const getCategoriesByFilter = (data) => {
    return api.post('api/categories/search', data);
};

const addCategory = (data) => {
    return api.post('api/categories', data);
};

export default {
    getCategories,
    getCategoriesByFilter,
    addCategory,
};
