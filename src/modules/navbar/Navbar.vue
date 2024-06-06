<template>
    <v-card elevation="0" class="rounded-0 nav_container" width="280">
        <v-btn text><v-icon left>mdi-home</v-icon>Home</v-btn>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Navbar',
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
.nav_container {
    height: calc(100vh - 65px);
    border-right: 1px solid $overlay-color;
    position: fixed;
}
</style>

