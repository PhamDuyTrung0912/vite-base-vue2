<template>
    <div>
        <place-category-action />
        <place-category-filter @formFilter="(v) => (filters = v)" />
        <place-category-table :tableDatas="tableDatas" />
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
        };
    },
    watch: {
        filters: {
            immediate: false,
            deep: true,
            handler() {
                this.getCategories();
            },
        },
    },
    computed: {},
    methods: {
        getCategories() {
            const payload = {
                limit: 10,
                offset: 0,
                search: this.filters,
            };

            eventBus.$emit('isLoading');
            categoryServices
                .getCategoriesByFilter(payload)
                .then((data) => {
                    this.tableDatas = data.items;
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
