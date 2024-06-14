<template>
    <v-container>
        <v-card-title class="text-h5 font-weight-bold py-2 px-2">{{ getRouteCurrent.title }} </v-card-title>
        <router-view></router-view>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ParameterLayout',
    data() {
        return {
            routes: [
                {
                    title: 'Général',
                    name: 'GeneralPage',
                },
                {
                    title: 'Tutoriels',
                    name: 'TutorialPage',
                },
                {
                    title: 'FAQ',
                    name: 'FaqPage',
                },
                {
                    title: 'À propos',
                    name: 'ProposPage',
                },
                {
                    title: 'Accessibilité',
                    name: 'AccessPage',
                },
                {
                    title: 'CGU',
                    name: 'CguPage',
                },
            ],
        };
    },
    computed: {
        getRouteCurrent() {
            return this.routes.find((e) => e.name === this.$route.name);
        },
    },
    created() {},
});
</script>

<style lang="scss" scoped>
</style>
