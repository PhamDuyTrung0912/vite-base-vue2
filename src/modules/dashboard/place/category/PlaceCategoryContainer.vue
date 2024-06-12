<template>
    <div>
        <router-view></router-view>
        <place-category-action />
        <place-category-filter />
        <place-category-table />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import PlaceCategoryTable from './PlaceCategoryTable.vue';
import PlaceCategoryFilter from './PlaceCategoryFilter.vue';
import PlaceCategoryAction from './PlaceCategoryAction.vue';

export default defineComponent({
    components: { PlaceCategoryTable, PlaceCategoryFilter, PlaceCategoryAction },
    name: 'PlaceCategoryContainer',
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
