import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import GeoJSON from 'ol/format/GeoJSON';

export default {
    data() {
        return {
            mapInstance: null,
            vectorLayer: null,
            coordinates: null,
        };
    },
    methods: {
        handleAddPoint(mapId) {
            this.mapInstance = this.$map.getInstanceById(mapId);
            this.mapInstance.on('click', this.addPoint);
            this.vectorLayer = new VectorLayer({
                source: new VectorSource(),
            });

            this.mapInstance.addLayer(this.vectorLayer);
        },
        addPoint(event) {
            this.removeAllFeature();
            const coordinate = event.coordinate;
            this.drawFeature = new Feature({
                geometry: new Point(coordinate),
            });

            // Tạo một biểu diễn hình ảnh cho điểm
            const imageStyle = new Style({
                image: new Icon({
                    src: '../images/placeholder.png', // Đường dẫn đến hình ảnh của bạn
                    scale: 0.5, // Điều chỉnh tỉ lệ nếu cần
                }),
            });

            this.drawFeature.setStyle(imageStyle);

            this.vectorLayer.getSource().addFeature(this.drawFeature);

            this.coordinates = this.getGeojsonFeature();
        },
        getGeojsonFeature() {
            const geoJSONFormat = new GeoJSON();

            const coordinates = JSON.stringify(
                geoJSONFormat.writeFeatureObject(this.drawFeature, {
                    featureProjection: 'EPSG:3857',
                    dataProjection: 'EPSG:4326',
                }).geometry,
            );

            return coordinates;
        },
        removeAllFeature() {
            this.coordinates = null;
            this.vectorLayer.getSource().clear();
        },
    },

    beforeDestroy() {
        this.removeAllFeature();
    },

    mounted() {},
};
