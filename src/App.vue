<script>
import { defineComponent } from 'vue';
import Template from '@/components/Template.vue';

export default defineComponent({
    name: 'App',
    components: { Template },
});
</script>

<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<style lang="scss" scoped>
</style>
