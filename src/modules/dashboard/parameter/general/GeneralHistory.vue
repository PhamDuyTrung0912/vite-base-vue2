<template>
    <div>
        <v-card-text class="text-subtitle-1 py-1 pa-0 font-weight-bold"> Historique des recherches </v-card-text>
        <v-card class="pa-2 my-3 d-flex justify-space-between" v-for="(history, index) in histories" :key="index">
            <span>
                {{ history.title }}
            </span>
            <v-btn x-small fab icon elevation="0" class="rounded-0 ma-0 pa-0 mt-1"
                ><v-icon color="color_rejected" size="30">mdi-delete</v-icon></v-btn
            >
        </v-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GeneralHistory',
    props: {
        histories: {
            type: Array,
            default: () => [],
        },
    },
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
