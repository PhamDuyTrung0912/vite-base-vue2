<template>
    <v-container fluid class="map_container pa-0">
        <map-container />
    </v-container>
</template>

<script>
import MapContainer from '@/modules/map/MapContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { MapContainer },
    name: 'MapPage',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {},
    beforeDestroy() {
        this.$map;
    },
});
</script>

<style lang="scss" scoped>
.map_container {
    height: calc(100vh - 65px);
}
</style>

