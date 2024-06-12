import { Vector } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { getCenter } from 'ol/extent';
import { toLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fade from 'ol-ext/featureanimation/Fade';

const tranformToLonLat = (coordinates) => {
    if (!coordinates) return null;
    return toLonLat(coordinates);
};

const zoomFeature = ({ feature, mapInstance }) => {
    const extent = feature.getGeometry().getExtent();
    if (extent && extent.length > 0 && Number.isFinite(extent[0])) {
        const center = getCenter(extent);
        mapInstance.getView().setCenter(center);
        mapInstance.getView().fit(extent, {
            size: mapInstance.getSize(),
            maxZoom: 20,
        });
        const zoom = mapInstance.getView().getZoom();
        mapInstance.getView().setZoom(zoom - 1);
        const zoomFeatureLayer = new Vector({
            zIndex: 1000,
            source: new VectorSource({
                crossOrigin: 'anonymous',
            }),
            style: new Style({
                stroke: new Stroke({
                    color: '#E4003A',
                    width: 10,
                }),
            }),
        });
        mapInstance.addLayer(zoomFeatureLayer);
        const featureCloned = feature.clone();
        zoomFeatureLayer.getSource().addFeature(featureCloned);
        zoomFeatureLayer.animateFeature(featureCloned, [
            new Fade({
                duration: 250,
            }),
            new Fade({
                duration: 2750,
                revers: true,
            }),
        ]);
        setTimeout(() => {
            mapInstance.removeLayer(zoomFeatureLayer);
        }, 3000);
    } else {
        console.error("L'extent de la feature n'a pas de coordonnées finies");
    }
};

// Tile layer
const removeTileLayer = () => {};

export { tranformToLonLat, zoomFeature };
