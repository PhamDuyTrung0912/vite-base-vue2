<template>
    <v-app>
        <router-view></router-view>
        <loader />
    </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import Loader from '@/modules/loader/Loader.vue';

export default defineComponent({
    name: 'App',
    components: { Loader },
});
</script>

<style lang="scss">
</style>
;
