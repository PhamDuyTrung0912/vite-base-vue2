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
.container {
    font-family: Arial, sans-serif;
    background-color: $primary-color;
    .text {
        color: red;
    }
}
</style>
