<template>
    <div class="pagination_container">
        <v-btn x-small class="mx-2" fab elevation="1"><v-icon>mdi-chevron-double-left</v-icon></v-btn>
        <v-btn x-small class="mx-2" fab elevation="1"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <span class="text-subtitle-2">1 sur 9</span>
        <v-btn x-small class="mx-2" fab elevation="1"><v-icon>mdi-chevron-right</v-icon></v-btn>
        <v-btn x-small class="mx-2" fab elevation="1"><v-icon>mdi-chevron-double-right</v-icon></v-btn>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CPagination',
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

