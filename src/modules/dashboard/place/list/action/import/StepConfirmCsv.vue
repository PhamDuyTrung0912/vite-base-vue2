<template>
    <div>
        <div class="content_container text-center">
            <congratulation />
            <v-icon size="100" color="success" class="mb-5 scale-up">mdi-check-circle</v-icon>
            <div class="primary--text text-h6 font-weight-bold">84 lieux importés avec succès !</div>
            <div class="text-subtitle-1">Note: les lieux ne sont pas encore publiés.</div>
        </div>
        <div class="d-flex justify-center">
            <v-btn @click="nextProcess" width="50%" small height="45" color="primary">Continuer</v-btn>
        </div>
    </div>
</template>

<script>
import Congratulation from '@/components/congratulation/Congratulation.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { Congratulation },
    name: 'StepConfirmCsv',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        nextProcess() {
            this.$router.push({ name: 'PlaceListPage' });
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.content_container {
    width: 100%;
    height: 460px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
@keyframes scaleUp {
    0% {
        transform: scale(0.5);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
}

.scale-up {
    animation: scaleUp 1s ease-in-out;
}
</style>
