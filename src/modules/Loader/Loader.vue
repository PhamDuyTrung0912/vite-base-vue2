<template>
    <div class="loader_container">
        <div v-if="visiable" class="overlay d-flex align-center justify-center">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import eventBus from '@/eventBus';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Loader',
    props: {},
    data() {
        return {
            visiable: false,
        };
    },
    watch: {},
    computed: {},
    methods: {
        onLoading() {
            this.visiable = true;
        },
        onLoaded() {
            this.visiable = false;
        },
    },
    mounted() {},
    created() {
        eventBus.$on('isLoading', this.onLoading);
        eventBus.$on('isLoaded', this.onLoaded);
    },
    beforeDestroy() {
        eventBus.$off('isLoading', this.onLoading);
        eventBus.$off('isLoaded', this.onLoaded);
    },
});
</script>

<style lang="scss" scoped>
.loader_container {
    .overlay {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: $overlay-color;
        z-index: 100;

        .loader {
            width: 75px;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 8px solid;
            border-color: $grey-lighten-1-color #0000;
            animation: spine 0.5s infinite;
        }
    }
}

@keyframes spine {
    to {
        transform: rotate(0.5turn);
    }
}
</style>

