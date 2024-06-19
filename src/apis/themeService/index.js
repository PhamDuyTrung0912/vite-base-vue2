import api from '../index';

const getThemes = () => {
    return api.get('api/themes');
};

const getThemesByFilter = (data) => {
    return api.post('api/themes/search', data);
};

export default {
    getThemes,
    getThemesByFilter,
};
