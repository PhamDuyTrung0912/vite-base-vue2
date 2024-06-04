import api from '../index';

const getUsers = () => {
    return api.get('users');
};

const getUser = (id) => {
    return api.post('users', id);
};

export default {
    getUsers,
    getUser,
};
