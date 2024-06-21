<template>
    <div class="pagination_container">
        <v-card-text class="text-start pa-0 text-caption font-weight-bold text_primary--text">Total items : {{ totalItems }}</v-card-text>
        <div class="d-flex align-center">
            <v-btn :disabled="!isActivePrev" @click="onChangePage('oldest')" x-small class="mx-2" fab elevation="1"
                ><v-icon>mdi-chevron-double-left</v-icon></v-btn
            >
            <v-btn :disabled="!isActivePrev" @click="onChangePage('previous')" x-small class="mx-2" fab elevation="1"
                ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <div class="text-subtitle-2 mx-2" style="min-width: 50px">{{ currentPage }} sur {{ totalPages }}</div>
            <v-btn :disabled="!isActiveNext" @click="onChangePage('next')" x-small class="mx-2" fab elevation="1"
                ><v-icon>mdi-chevron-right</v-icon></v-btn
            >
            <v-btn :disabled="!isActiveNext" @click="onChangePage('lastest')" x-small class="mx-2" fab elevation="1"
                ><v-icon>mdi-chevron-double-right</v-icon></v-btn
            >
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CPagination',
    props: {
        totalItems: {
            type: Number,
            default: 0,
        },
        totalPages: {
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
    computed: {
        isActivePrev() {
            return this.totalPages >= this.currentPage && this.currentPage > 1 && this.totalPages > 0;
        },
        isActiveNext() {
            return this.totalPages >= this.currentPage && this.currentPage < this.totalPages && this.totalPages > 0;
        },
    },
    methods: {
        onChangePage(key) {
            let toPage = 1;
            switch (key) {
                case 'oldest':
                    this.$emit('onChangePage', toPage);
                    break;
                case 'previous':
                    toPage = this.currentPage > 1 && this.currentPage - 1;
                    this.$emit('onChangePage', toPage);
                    break;
                case 'next':
                    toPage = this.currentPage < this.totalPages && this.currentPage + 1;
                    this.$emit('onChangePage', toPage);
                    break;
                case 'lastest':
                    toPage = this.totalPages;
                    this.$emit('onChangePage', toPage);
                    break;
                default:
            }
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.pagination_container {
    display: flex;
    align-items: center;
}
</style>

