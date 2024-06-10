 <template>
    <div :id="mapId" style="width: 100%; height: 100%">
		<v-btn @click="testInstance">123</v-btn>
	</div>
</template>

<script>
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import mapConfigs from '@/modules/map/config/mapConfigs';

import 'ol/ol.css';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'MapContainer',
    props: {
        mapId: {
            type: String,
            default: 'map-root',
        },
    },
    data() {
        return {};
    },
    watch: {},
    computed: {
        ...mapGetters(['maps/getInstanceById']),
        getInstance() {
            return this['maps/getInstanceById']('map-root');
        },
    },

    methods: {
        ...mapMutations(['maps/addInstances']),
        initMap() {
            const mapInstance = new Map({
                target: this.mapId,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: mapConfigs.center,
                    zoom: mapConfigs.zoom,
                }),
            });

            this['maps/addInstances'](mapInstance);
            // console.log(this.mapInstance.getTarget());
        },

		testInstance(){
			console.log(this.getInstance);
		}
    },

    mounted() {
        this.initMap();
    },

    beforeDestroy() {},
};
</script>
