<template>
    <v-container>
        <v-card-title class="text-h5 font-weight-bold py-3"
            >Lieux
            <span class="px-2 text-h6 "> <v-icon color="primary">mdi-chevron-right</v-icon></span>
            <span v-if="getRouteCurrent">
                {{ getRouteCurrent.title }}
            </span></v-card-title
        >
        <router-view></router-view>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PlacePage',
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
                    title: 'Catégories',
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

<style scoped></style>
