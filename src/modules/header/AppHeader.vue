<template>
    <v-app-bar fixed elevation="1">
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppHeader',
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

<style lang="scss" scoped>
</style>
