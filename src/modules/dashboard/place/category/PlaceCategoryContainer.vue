<template>
    <div>
        <place-category-action />
        <place-category-filter @formFilter="(v) => (filters = v)" />
        <place-category-table
            :totalPages="totalPages"
            :currentPage="currentPage"
            :totalItems="totalItems"
            :tableDatas="tableDatas"
            @getCategories="getCategories"
            @onChangePage="onChangePage"
            @onSort="onSort" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import PlaceCategoryTable from './PlaceCategoryTable.vue';
import PlaceCategoryFilter from './PlaceCategoryFilter.vue';
import PlaceCategoryAction from './PlaceCategoryAction.vue';
import categoryServices from '@/apis/categoryService/index';
import eventBus from '@/eventBus';

export default defineComponent({
    components: { PlaceCategoryTable, PlaceCategoryFilter, PlaceCategoryAction },
    name: 'PlaceCategoryContainer',
    props: {},
    data() {
        return {
            filters: null,
            tableDatas: [],
            totalPages: 0,
            totalItems: 0,
            currentPage: 0,
            limit: 10,
            offset: 0,
            sort: {},
        };
    },
    watch: {
        filters: {
            immediate: false,
            deep: true,
            handler() {
                this.currentPage = 1;
                this.getCategories();
            },
        },
    },
    computed: {},
    methods: {
        onSort(value) {
            const sortBy = this.$utils.isEmptyArray(value.sortBy) && value.sortBy[0];
            const sortDesc = this.$utils.isEmptyArray(value.sortDesc) && value.sortDesc[0] ? 'asc' : 'desc';
            const sort = {};
            if (sortBy && sortDesc) {
                sort[`${sortBy}`] = sortDesc;
            }
            this.sort = sort;
            this.getCategories();
        },
        onChangePage(toPage) {
            this.currentPage = toPage;
            this.offset = (toPage - 1) * this.limit;
            this.getCategories();
        },

        getCategories() {
            const payload = {
                limit: this.limit,
                offset: this.offset,
                search: this.filters,
                sort: this.sort,
            };

            eventBus.$emit('isLoading');
            categoryServices
                .getCategoriesByFilter(payload)
                .then((data) => {
                    this.tableDatas = data.items;
                    this.totalPages = data.totalPages;
                    this.currentPage = data.currentPage;
                    this.totalItems = data.totalItems;
                    eventBus.$emit('isLoaded');
                })
                .catch(() => {
                    eventBus.$emit('isLoaded');
                });
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
