<template>
    <div class="section_map_tile">
        <div @click="onChangeTile(tile)" class="section_map_item" v-for="(tile, index) in tiles" :key="index">
            <v-img width="70" height="70" :src="getImageUrl(tile.path)"></v-img>
            <div class="item_title text-caption font-weight-bold">{{ tile.title }}</div>
        </div>
    </div>
</template>

<script>
import TileLayer from 'ol/layer/Tile';
import { defineComponent } from 'vue';
import { OSM, XYZ } from 'ol/source';
import tileConstant from '@/modules/map/constant';

export default defineComponent({
    name: 'LayerTiles',
    props: {
        mapId: {
            require: true,
            type: String,
        },
    },
    data() {
        return {
            tileSelected: null,
            tiles: [
                {
                    id: 1,
                    title: 'Osm',
                    path: 'osm_tile.png',
                },
                {
                    id: 2,
                    title: 'Street',
                    path: 'road_tile.png',
                },
                {
                    id: 3,
                    title: 'Satelite',
                    path: 'satellite_tile.png',
                },
            ],
        };
    },
    watch: {},
    methods: {
        onChangeTile(item) {
            let tile = new TileLayer({
                source: new OSM(),
                isTile: true,
            });

            if (item) {
                if (item.title === 'Street') {
                    tile = new TileLayer({
                        source: new OSM({
                            url: tileConstant.MAP_TILE_STREET_API,
                            attributions: [],
                        }),
                        isTile: true,
                    });
                }

                if (item.title === 'Satelite') {
                    tile = new TileLayer({
                        source: new XYZ({
                            url: tileConstant.MAP_TILE_SATELITE_API,
                            maxZoom: 18,
                            preload: 10,
                        }),
                        isTile: true,
                    });
                }
                this.sortTiles(item);
            }
            const mapInstance = this.$map.getInstanceById(this.mapId);
            mapInstance.getLayers().forEach((layer) => {
                if (layer.get('isTile')) {
                    mapInstance.removeLayer(layer);
                }
            });
            mapInstance.addLayer(tile);
        },
        getImageUrl(path) {
            return new URL(`../assets/${path}`, import.meta.url).href;
        },

        sortTiles(target) {
            this.tiles = this.tiles.sort((a, b) => {
                if (a.id === target.id) {
                    return -1;
                }
                if (b.id === target.id) {
                    return 1;
                }
                return 0;
            });
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.section_map_tile {
    position: absolute;
    bottom: 60px;
    left: 10px;
    z-index: 10;
    width: 74px;
    height: 74px;
    transition: all 0.1s ease-in-out;
    display: flex;
    overflow: hidden;
    border: 2px solid $overlay-color;
    border-radius: 8px;
    &:hover {
        width: 210px;
    }

    .section_map_item {
        cursor: pointer;
        position: relative;
        .item_title {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            color: white;
            text-shadow: 0 0 2px black;
        }
    }
}
</style>

