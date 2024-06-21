<template>
    <div>
        <place-list-action />
        <place-list-filter @formFilter="(v) => (filters = v)" />
        <place-list-table
            :totalPages="totalPages"
            :currentPage="currentPage"
            :totalItems="totalItems"
            :tableDatas="tableDatas"
            @onChangePage="onChangePage"
            @onSort="onSort" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import PlaceListTable from './PlaceListTable.vue';
import PlaceListFilter from './PlaceListFilter.vue';
import PlaceListAction from './PlaceListAction.vue';
import placeService from '@/apis/placeService/index';
import eventBus from '@/eventBus';

export default defineComponent({
    components: { PlaceListTable, PlaceListFilter, PlaceListAction },
    name: 'PlaceListContainer',
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
                this.getPlaces();
            },
        },
    },
    computed: {},
    methods: {
        onChangePage() {},
        onSort() {},
        getPlaces() {
            const payload = {
                limit: this.limit,
                offset: this.offset,
                search: this.filters,
                sort: this.sort,
            };

            eventBus.$emit('isLoading');
            placeService
                .getPlacesByFilter(payload)
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
