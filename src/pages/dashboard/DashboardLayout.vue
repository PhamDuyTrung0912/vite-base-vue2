<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DashboardLayout',
    props: {},
    data() {
        return {
            items: [
                ['mdi-email', 'Inbox'],
                ['mdi-account-supervisor-circle', 'Supervisors'],
                ['mdi-clock-start', 'Clock-in'],
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

<template>
    <v-container fluid class="pa-0">
        <v-app-bar>
            <v-toolbar-title class="text_custom">Header</v-toolbar-title>
        </v-app-bar>
        <router-view></router-view>
    </v-container>
</template>

<style lang="scss" scoped>
</style>
