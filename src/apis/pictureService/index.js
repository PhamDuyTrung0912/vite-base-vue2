import api from '../index';

const createPicture = (file) => {
    return api.post('api/pictures', file);
};

export default {
    createPicture,
};
