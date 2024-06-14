<template>
    <v-container>
        <v-card-title class="text-h5 font-weight-bold py-2">Bienvenue </v-card-title>
        <home-container />
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import HomeContainer from '@/modules/dashboard/home/HomeContainer.vue';

export default defineComponent({
    components: { HomeContainer },
    name: 'HomePage',
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

<style lang="scss" scoped></style>
