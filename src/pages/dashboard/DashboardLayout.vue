<script>
import AppHeader from '@/modules/header/AppHeader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { AppHeader },
    name: 'DashboardLayout',
    props: {},
    data() {
        return {};
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
        <app-header />
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-container>
</template>

<style lang="scss" scoped>
</style>
