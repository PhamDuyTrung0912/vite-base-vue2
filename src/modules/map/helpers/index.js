import { toLonLat } from 'ol/proj';

const tranformToLonLat = (coordinates) => {
    if (!coordinates) return null;
    return toLonLat(coordinates);
};

export { tranformToLonLat };
