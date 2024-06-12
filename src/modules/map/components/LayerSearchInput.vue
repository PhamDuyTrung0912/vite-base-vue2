<template>
    <v-autocomplete
        :prepend-inner-icon="$vuetify.breakpoint.mdAndUp ? 'mdi-magnify' : ''"
        :loading="loading"
        clearable
        v-model="address"
        hide-details
        dense
        label="Rechercher un village, une rue, ..."
        :items="addressesItems"
        :search-input.sync="searchValue"
        :class="{
            'mt-0': $vuetify.breakpoint.smAndDown,
        }"
        :style="{
            'font-size': $vuetify.breakpoint.smAndDown ? '12px' : 'auto',
        }"
        hide-no-data
        no-filter
        @change="zoomOnAddress"
        @focus="$emit('focused')"
        @blur="$emit('blured')" />
</template>

<script>
import axios from 'axios';
import Feature from 'ol/Feature';
import { Point, Polygon } from 'ol/geom';
import { get } from 'ol/proj';
import { zoomFeature } from '@/modules/map/helpers';

export default {
    name: 'LayerSearchInput',
    props: {
        mapId: {
            require: true,
            type: String,
        },
    },
    data() {
        return {
            loading: false,
            search: false,
            searchValue: null,
            addressesItems: [],
            isZooming: false,
            address: null,
            addressTimeout: null,
            mapInstance: null,
        };
    },
    watch: {
        searchValue: {
            handler() {
                if (this.searchValue) this.checkHasStopTap();
            },
        },
    },
    methods: {
        zoomOnAddress() {
            if (this.address) {
                this.isZooming = true;
                setTimeout(() => {
                    this.isZooming = false;
                }, 300);
                let marker = null;
                if (this.address.length === 2) {
                    marker = new Feature(new Point(this.address));
                } else if (this.address.length === 4) {
                    marker = new Feature(
                        new Polygon([
                            [
                                [this.address[2], this.address[3]],
                                [this.address[2], this.address[1]],
                                [this.address[0], this.address[1]],
                                [this.address[0], this.address[3]],
                                [this.address[2], this.address[3]],
                            ],
                        ]),
                    );
                }
                if (marker) {
                    const defaultProjection = get('EPSG:3857');
                    const transformedCoordinates = marker.getGeometry().transform(this.$map.projection, defaultProjection).getCoordinates();
                    console.log('marker', transformedCoordinates);

                    marker.getGeometry().setCoordinates(transformedCoordinates);

                    zoomFeature({ feature: marker, mapInstance: this.mapInstance });
                }
            }
        },
        checkHasStopTap() {
            if (this.addressTimeout) {
                clearTimeout(this.addressTimeout);
                this.addressTimeout = null;
            }
            if (!this.isZooming && this.searchValue) {
                this.addressTimeout = setTimeout(() => {
                    this.search = true;
                    this.loading = true;
                    this.addressesItems = [];
                    axios.get(`https://geoservices.wallonie.be/geolocalisation/rest/searchAll/${this.searchValue}`).then((res) => {
                        const addressesItems = [];
                        for (const address of res.data.resultats) {
                            if (!addressesItems.map((el) => el.text).includes(address.text)) {
                                if (address.type === 'COMMUNE') {
                                    addressesItems.push({
                                        text: address.nom,
                                        value: [address.xMax, address.yMax, address.xMin, address.yMin],
                                    });
                                } else if (address.type === 'LOCALITE') {
                                    addressesItems.push({
                                        text: `${address.nom} (${address.cps[0]} ${address.commune})`,
                                        value: [address.xMax, address.yMax, address.xMin, address.yMin],
                                    });
                                } else if (address.type === 'RUE') {
                                    addressesItems.push({
                                        text: `${address.nom} ${address.cps[0]} ${address.localites[0]} (${address.commune})`,
                                        value: [address.xMax, address.yMax, address.xMin, address.yMin],
                                    });
                                } else if (address.type === 'POSITION') {
                                    addressesItems.push({
                                        text: address.adresse,
                                        value: [address.x, address.y],
                                    });
                                }
                            }
                        }
                        const searchValueSplitted = this.searchValue.split(' ').map((el) => this.$utils.slugify(el).toUpperCase());
                        this.addressesItems = addressesItems.sort((a, b) => {
                            const aTextSplitted = a.text.split(' ');
                            const bTextSplitted = b.text.split(' ');
                            let aCount = 0;
                            let bCount = 0;
                            for (const wordSearch of searchValueSplitted) {
                                if (aTextSplitted.includes(wordSearch)) aCount++;
                                if (bTextSplitted.includes(wordSearch)) bCount++;
                            }
                            if (aCount > bCount) return -1;
                            if (aCount < bCount) return 1;

                            if (aTextSplitted.length < bTextSplitted.length) return -1;
                            if (aTextSplitted.length > bTextSplitted.length) return 1;
                            return 0;
                        });
                        this.loading = false;
                    });
                    setTimeout(() => {
                        this.search = false;
                    }, 300);
                }, 300);
            }
        },
    },

    mounted() {
        this.mapInstance = this.$map.getInstanceById(this.mapId);
    },
};
</script>
