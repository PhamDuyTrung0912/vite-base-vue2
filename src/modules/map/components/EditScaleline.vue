<template>
    <div></div>
</template>

<script>
import { defineComponent } from 'vue';
import { ScaleLine } from 'ol/control.js';

export default defineComponent({
    name: 'EditScaleline',
    props: {
        mapId: {
            require: true,
            type: String,
        },
    },
    data() {
        return {
            mapInstance: null,
        };
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {
        this.mapInstance = this.$map.getInstanceById(this.mapId);
        const controlsEditScaline = new ScaleLine({
            units: 'metric',
            bar: true,
            steps: 4,
            text: 'Show scale text',
            minWidth: 150,
        });
        this.mapInstance.addControl(controlsEditScaline);
    },
    created() {},
    beforeDestroy() {
        this.mapInstance.getControls().forEach((control) => {
            if (control instanceof ScaleLine) {
                this.mapInstance.removeControl(control);
            }
        });
    },
});
</script>

<style lang="scss" scoped>
</style>

