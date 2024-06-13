<template>
    <div class="congratulation_container">
        <lottie-animation
            :animationData="animationData"
            :loop="false"
            :autoPlay="true"
            :loopDelayMin="2.5"
            :loopDelayMax="5"
            :speed="1"
            :width="125"
            :height="125" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import LottieAnimation from 'lottie-web-vue';
import animationData from '@/assets/lotties/confetti.json';

export default defineComponent({
    name: 'Congratulation',
    components: { LottieAnimation },
    props: {},
    data() {
        return {
            animationData,
        };
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.congratulation_container {
    z-index: 15;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
}
</style>

