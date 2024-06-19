<template>
    <div class="pagination_container">
        <v-btn @click="onOldest" x-small class="mx-2" fab elevation="1"><v-icon>mdi-chevron-double-left</v-icon></v-btn>
        <v-btn @click="onPrevious" x-small class="mx-2" fab elevation="1"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <span class="text-subtitle-2">{{ currentPage }} sur {{ totalPage }}</span>
        <v-btn @click="onNext" x-small class="mx-2" fab elevation="1"><v-icon>mdi-chevron-right</v-icon></v-btn>
        <v-btn @click="onNewtest" x-small class="mx-2" fab elevation="1"><v-icon>mdi-chevron-double-right</v-icon></v-btn>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CPagination',
    props: {
        totalPage: {
            type: Number,
            default: 0,
        },
        currentPage: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        onOldest() {
            this.$emit('onOldest');
        },
        onPrevious() {
            this.$emit('onPrevious');
        },
        onNext() {
            this.$emit('onNext');
        },
        onNewtest() {
            this.$emit('onNewtest');
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>

