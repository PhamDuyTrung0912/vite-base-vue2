import api from '../index';

const getPlaces = () => {
    return api.get('api/places');
};

const getPlaceById = (id) => {
    return api.get(`api/places/${id}`);
};

const getPlacesByFilter = (data) => {
    return api.post('api/places/search', data);
};

const addPlace = (data) => {
    return api.post('api/places', data);
};

const updatePlace = (id, data) => {
    return api.put(`api/places/${id}`, data);
};

const deletePlace = (id) => {
    return api.delete(`api/places/${id}`);
};

export default {
    getPlaces,
    getPlaceById,
    getPlacesByFilter,
    addPlace,
    updatePlace,
    deletePlace,
};
