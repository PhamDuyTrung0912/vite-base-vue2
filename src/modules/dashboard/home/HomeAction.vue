<template>
    <v-container>
        <div class="d-flex align-center py-3" style="overflow-x: auto">
            <v-card
                v-for="(action, key) in actions"
                :key="key"
                @click="changeRoute(action.route)"
                elevation="2"
                class="item-action"
                style="cursor: pointer"
                :style="{ border: 'solid 1px ' + action.color }">
                <v-row no-gutters class="pa-2">
                    <v-col cols="2" class="d-flex justify-center align-center">
                        <v-icon :color="action.color">{{ action.icon }}</v-icon>
                    </v-col>
                    <v-col cols="10" class="pa-0 px-2">
                        <v-col cols="12" class="text-subtitle-2 pa-0 text_primary--text">
                            {{ action.title }}
                        </v-col>
                        <v-col cols="12" class="text-h6 pa-0 text_primary--text font-weight-bold"> {{ action.text }} </v-col>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeAction',
    props: {},
    data() {
        return {
            actions: [
                {
                    id: 1,
                    icon: 'mdi-home-city',
                    title: 'Créer un',
                    text: 'Lieu',
                    color: '#16DAAB',
                    route: 'PlaceCreatePage',
                },
                {
                    id: 2,
                    icon: 'mdi-calendar',
                    title: 'Créer un',
                    text: 'Événement',
                    color: '#0070F3',
                    route: 'PlaceCreatePage',
                },
                {
                    id: 3,
                    icon: 'mdi-bullhorn',
                    title: 'Créer un',
                    text: 'Publication',
                    color: '#FFA450',
                    route: 'PlaceCreatePage',
                },
                {
                    id: 4,
                    icon: 'mdi-bullhorn',
                    title: 'Créer un',
                    text: 'Catégorie L',
                    color: '#FFA450',
                    route: 'CategoryCreatePage',
                },
                {
                    id: 5,
                    icon: 'mdi-room-service-outline',
                    title: 'Créer un',
                    text: '7 signale',
                    color: '#9022FE',
                    route: 'PlaceCreatePage',
                },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        changeRoute(route) {
            if (this.$route.name !== route) this.$router.push({ name: route });
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.item-action {
    @include hover-effect(_, $primary_color);
    margin: 0px 10px;
    min-width: 180px;

    @include screenTo(xlarge) {
        min-width: 220px;
    }
}
</style>
