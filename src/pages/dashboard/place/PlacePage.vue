<template>
    <v-container>
        <v-container>
            <div class="text-h5 font-weight-bold">Lieux</div>
        </v-container>
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
