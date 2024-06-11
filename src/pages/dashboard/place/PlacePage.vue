<template>
    <v-container>
        <v-card-title class="text-h5 font-weight-bold text-decoration-underline py-3">Lieux</v-card-title>
        <router-view></router-view>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PlacePage',
});
</script>

<style scoped></style>
