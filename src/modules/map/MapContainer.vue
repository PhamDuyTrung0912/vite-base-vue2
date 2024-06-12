 <template>
    <div :id="mapId" class="map_container">
        <layer-tiles :mapId="mapId" v-if="mapInstance && isShowTile" />
        <edit-scaleline :mapId="mapId" v-if="mapInstance && isShowScaleline" />
        <div class="geolocation_search" v-if="mapInstance">
            <layer-search-input :mapId="mapId" />
        </div>
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
import LayerSearchInput from '@/modules/map/components/LayerSearchInput.vue';
import proj4 from 'proj4';

export default {
    components: { LayerTiles, EditScaleline, LayerSearchInput },
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

        initProjection() {
            if (this.$map.projection === null) {
                proj4.defs('default', config.projection.definition);
                register(proj4);
                this.$map.projection = new this.$map.library.ol.Projection({
                    code: 'default',
                    units: 'm',
                });
            }
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

    .geolocation_search {
        position: absolute;
        top: 10px;
        left: 50px;
        z-index: 10;
        background-color: white;
        padding: 7px;
        border-radius: 5px;
        width: 380px;
    }
}
</style>
