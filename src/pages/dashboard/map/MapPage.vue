<template>
    <v-container fluid class="section_container pa-0 ma-0">
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
.section_container {
    height: calc(100vh - 65px);
}
</style>

