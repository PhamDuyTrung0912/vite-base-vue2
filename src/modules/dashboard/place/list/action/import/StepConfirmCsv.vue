<template>
    <div>
        <div class="content_container text-center mb">
            <div>
                <congratulation />
                <div class="primary--text text-h6 font-weight-bold">84 lieux importés avec succès !</div>
                <div class="text-subtitle-1">Note: les lieux ne sont pas encore publiés.</div>
            </div>
        </div>
        <v-btn @click="nextProcess" width="100%" small height="45" color="primary">Continuer</v-btn>
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
            console.log('vao day');
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
    height: 400px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
