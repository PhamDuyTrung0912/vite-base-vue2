<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" lg="2" md="12" sm="6" v-for="(action, key) in actions" :key="key">
                    <v-card @click="changeRoute(action.route)" style="cursor: pointer" :style="{ border: 'solid 1px ' + action.color }">
                        <v-row no-gutters class="pa-2">
                            <v-col cols="2" class="d-flex justify-center align-center">
                                <v-icon :color="action.color">{{ action.icon }}</v-icon>
                            </v-col>
                            <v-col cols="10" class="pa-0 px-2">
                                <v-col cols="12" class="text-subtitle-2 pa-0">
                                    <span>
                                        {{ action.title }}
                                    </span>
                                </v-col>
                                <v-col cols="12" class="text-h5 pa-0"> {{ action.text }} </v-col>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
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
                    route: 'PlaceCreatePage',
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

<style lang="scss" scoped></style>
