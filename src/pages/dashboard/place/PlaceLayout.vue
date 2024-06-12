<template>
    <v-container>
        <!-- <c-breadcrumb /> -->
        <v-card-title class="text-h5 font-weight-bold py-2">{{ getRouteCurrent.title }} </v-card-title>
        <router-view></router-view>
    </v-container>
</template>

<script>
// import CBreadcrumb from '@/components/breadcrumb/CBreadcrumb.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    // components: { CBreadcrumb },
    name: 'PlaceLayout',
    data() {
        return {
            routes: [
                {
                    id: 1,
                    title: 'Liste',
                    name: 'PlaceListPage',
                },
                {
                    id: 2,
                    title: 'Catégories de lieux',
                    name: 'PlaceCategoryPage',
                },
                {
                    id: 3,
                    title: 'Crowdsourcing',
                    name: 'PlaceSourcingPage',
                },
                {
                    id: 4,
                    title: 'Création d’un lieu',
                    name: 'PlaceCreatePage',
                },
                {
                    id: 5,
                    title: 'Import de lieux',
                    name: 'PlaceImportPage',
                },
                {
                    id: 6,
                    title: 'Création d’une catégorie',
                    name: 'CategoryCreatePage',
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
