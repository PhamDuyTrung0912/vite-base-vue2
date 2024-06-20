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

const deleteCategory = (id) => {
    return api.delete(`api/categories/${id}`);
};

export default {
    getCategories,
    getCategoriesByFilter,
    addCategory,
    deleteCategory
};
