<template>
    <v-container>
        <c-table />
        <div class="pa-3 mt-3 text-end">
            <c-pagination />
        </div>
    </v-container>
</template>

<script>
import CPagination from '@/components/pagination/CPagination.vue';
import CTable from '@/components/table/CTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CTable, CPagination },
    name: 'PlaceListTable',
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
.status_item {
    height: 15px;
    width: 15px;
    border-radius: 20px;
    background-color: $toast_color_success;
}

.header_item_title {
    font-size: 13px;
    font-weight: 700;
    color: $text-black-color;
}
</style>
