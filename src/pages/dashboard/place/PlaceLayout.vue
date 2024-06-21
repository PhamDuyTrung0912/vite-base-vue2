<template>
    <v-container>
        <!-- <c-breadcrumb /> -->
        <v-card-title class="text-h5 font-weight-bold py-2 px-2">{{ getRouteCurrent.title }} </v-card-title>
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
                    title: 'Liste',
                    name: 'PlaceListPage',
                },
                {
                    title: 'Catégories de lieux',
                    name: 'PlaceCategoryPage',
                },
                {
                    title: 'Crowdsourcing',
                    name: 'PlaceSourcingPage',
                },
                {
                    title: 'Création d’un lieu',
                    name: 'PlaceCreatePage',
                },
                {
                    title: 'Import de lieux',
                    name: 'PlaceImportPage',
                },
                {
                    title: 'Création d’une catégorie',
                    name: 'CategoryCreatePage',
                },
                {
                    title: 'Modifier une catégorie',
                    name: 'CategoryUpdatePage',
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
