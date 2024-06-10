import { toLonLat } from 'ol/proj';

const tranformToLonLat = (coordinates) => {
    if (!coordinates) return null;
    return toLonLat(coordinates);
};

// Tile layer
const removeTileLayer = () => {};

export { tranformToLonLat };
