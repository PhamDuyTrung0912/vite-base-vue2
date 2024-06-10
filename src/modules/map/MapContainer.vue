 <template>
    <div :id="mapId" class="map_container">
        <layer-tiles :mapId="mapId" v-if="mapInstance && isShowTile" />
        <edit-scaleline :mapId="mapId" v-if="mapInstance && isShowScaleline" />
    </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import mapConfigs from '@/modules/map/config/mapConfigs';
import 'ol/ol.css';
import LayerTiles from '@/modules/map/components/LayerTiles.vue';
import EditScaleline from './components/EditScaleline.vue';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

export default {
    components: { LayerTiles, EditScaleline },
    name: 'MapContainer',
    props: {
        mapId: {
            type: String,
            default: 'map-root',
        },
        isShowScaleline: {
            type: Boolean,
            default: true,
        },
        isShowTile: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            mapInstance: null,
        };
    },
    watch: {},

    methods: {
        initMap() {
            this.mapInstance = new Map({
                target: this.mapId,
                layers: [
                    new TileLayer({
                        source: new OSM({
                            crossOrigin: 'anonymous',
                        }),
                        transition: 0.5,
                        isTile: true,
                        preload: 4,
                        useInterimTilesOnError: true,
                    }),
                ],
                view: new View({
                    center: mapConfigs.center,
                    zoom: mapConfigs.zoom,
                }),
            });
            this.$map.addInstance(this.mapInstance);
        },
    },

    mounted() {
        this.initMap();
    },

    beforeDestroy() {
        this.mapInstance = null;
        this.$map.removeInstances();
    },
};
</script>

<style lang="scss" scoped>
.map_container {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
