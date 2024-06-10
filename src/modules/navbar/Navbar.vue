<template>
    <v-card width="280" class="nav_container rounded-0">
        <v-card flat class="pa-5">
            <v-img class="bg-grey-lighten-2" height="125" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
        </v-card>
        <v-divider class="mx-5"></v-divider>
        <v-list class="pa-3">
            <v-list-group
                @click="changeRouteParent(item)"
                v-for="item in items"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.action"
                v-show="item.items === undefined || item.items.length > 0"
                link
                :append-icon="!item.items ? null : '$expand'"
                no-action>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item v-for="child in item.items" :key="child.title">
                    <v-list-item-content class="hover_item" @click="changeRouteChild(child)">
                        <div class="d-flex justify-space-between">
                            <v-list-item-title>{{ child.title }}</v-list-item-title>
                        </div>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Navbar',
    props: {},
    data() {
        return {
            items: [
                {
                    action: 'mdi-home-outline',
                    title: 'Accueil',
                    route: 'HomePage',
                },
                {
                    action: 'mdi-map-marker-outline',
                    active: true,
                    items: [
                        { title: 'Liste', route: 'PlaceListPage' },
                        { title: 'Catégories', route: 'PlaceCategoryPage' },
                        { title: 'Crowdsourcing', route: 'PlaceSourcingPage' },
                    ],
                    title: 'Lieux',
                },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        changeRouteParent(item) {
            if (!item.items) {
                if (this.$route.name !== item.route) this.$router.push({ name: item.route });
                else this.$router.go();
            }
        },

        changeRouteChild(child) {
            console.log('child', child);
            if (this.$route.name !== child.route) this.$router.push({ name: child.route });
            else this.$router.go();
            this.$emit('closeNav');
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.nav_container {
    height: calc(100vh);
    // border-right: 1px solid $overlay-color;
    position: fixed;
}
.hover_item {
    cursor: pointer;
}
</style>
