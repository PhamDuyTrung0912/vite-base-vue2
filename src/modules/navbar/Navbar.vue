<template>
    <v-card width="280" class="nav_container rounded-0">
        <v-list class="pa-3" dense>
            <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item v-for="child in item.items" :key="child.title">
                    <v-list-item-content>
                        <div class="d-flex justify-space-between">
                            <v-icon left size="12">mdi-circle</v-icon>
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
                    action: 'mdi-ticket',
                    items: [],
                    title: 'Attractions',
                },
                {
                    action: 'mdi-silverware-fork-knife',
                    active: true,
                    items: [{ title: 'Breakfast & brunch' }, { title: 'New American' }, { title: 'Sushi' }],
                    title: 'Dining',
                },
                {
                    action: 'mdi-school',
                    items: [{ title: 'List Item' }],
                    title: 'Education',
                },
                {
                    action: 'mdi-human-male-female-child',
                    items: [{ title: 'List Item' }],
                    title: 'Family',
                },
                {
                    action: 'mdi-bottle-tonic-plus',
                    items: [{ title: 'List Item' }],
                    title: 'Health',
                },
                {
                    action: 'mdi-briefcase',
                    items: [{ title: 'List Item' }],
                    title: 'Office',
                },
                {
                    action: 'mdi-tag',
                    items: [{ title: 'List Item' }],
                    title: 'Promotions',
                },
            ],
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
.nav_container {
    height: calc(100vh - 65px);
    border-right: 1px solid $overlay-color;
    position: fixed;
}
</style>

