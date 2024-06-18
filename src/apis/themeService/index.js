import api from '../index';

const getThemes = () => {
    return api.get('api/themes');
};

export default {
    getThemes,
};
