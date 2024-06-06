<script>
import AppHeader from '@/modules/header/AppHeader.vue';
import Navbar from '@/modules/navbar/Navbar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { AppHeader, Navbar },
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
        <div class="content_container">
            <navbar />
            <div class="section_container">
                <router-view></router-view>
            </div>
        </div>
    </v-container>
</template>

<style lang="scss" scoped>
.content_container {
    margin-top: 65px;
    .section_container {
        margin-left: 280px;
    }
}
</style>
