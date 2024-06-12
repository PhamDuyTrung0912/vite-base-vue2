<template>
    <div>
        <!-- <router-view></router-view> -->
        <place-list-action />
        <place-list-filter />
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
