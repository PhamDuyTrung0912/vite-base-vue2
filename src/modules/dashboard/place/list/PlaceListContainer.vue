<template>
    <div>
        <place-list-action />
        <place-list-filter @formFilter="(v) => (filters = v)" />
        <place-list-table />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import PlaceListTable from './PlaceListTable.vue';
import PlaceListFilter from './PlaceListFilter.vue';
import PlaceListAction from './PlaceListAction.vue';

export default defineComponent({
    components: { PlaceListTable, PlaceListFilter, PlaceListAction },
    name: 'PlaceListContainer',
    props: {},
    data() {
        return {
            filters: null,
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
                this.getPlaces();
            },
        },
    },
    computed: {},
    methods: {
        getPlaces() {
            const payload = {
                limit: this.limit,
                offset: this.offset,
                search: this.filters,
                sort: this.sort,
            };

            // eventBus.$emit('isLoading');
            // categoryServices
            //     .getCategoriesByFilter(payload)
            //     .then((data) => {
            //         this.tableDatas = data.items;
            //         this.totalPages = data.totalPages;
            //         this.currentPage = data.currentPage;
            //         this.totalItems = data.totalItems;
            //         eventBus.$emit('isLoaded');
            //     })
            //     .catch(() => {
            //         eventBus.$emit('isLoaded');
            //     });
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
