<template>
    <v-container>
        <c-table :numberColumnFixed="3" :isCheckbox="true" :tableHeaders="tableHeaders" :tableDatas="tableDatas">
            <div slot="action" class="d-flex align-center">
                <div class="status_item"></div>
                <v-icon class="ml-3 mr-2" dense>mdi-pencil-outline</v-icon>
                <v-icon dense>mdi-delete-outline</v-icon>
            </div>
        </c-table>
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
        return {
            tableHeaders: [
                {
                    text: 'Image',
                    value: 'image',
                    width: 120,
                    sortable: false,
                },
                { text: 'ID externe', value: 'id', width: 120 },
                { text: 'Actions', value: 'action', width: 120, sortable: false },
                { text: 'Nom', value: 'name', width: 150 },
                { text: 'Catégorie', value: 'category', width: 150 },
                { text: 'Date de création', value: 'created_at', width: 200 },
                { text: 'Date de mise à jour', value: 'updated_at', width: 200 },
                { text: 'Column 1', value: 'column_1', width: 150 },
                { text: 'Column 2', value: 'column_2', width: 150 },
                { text: 'Column 3', value: 'column_3', width: 150 },
                { text: 'Column 4', value: 'column_4', width: 150 },
                { text: 'Column 5', value: 'column_5', width: 150 },
                { text: 'Column 6', value: 'column_6', width: 150 },
            ],
            tableDatas: [
                {
                    name: 'Frozen Yogurt',
                    created_at: 159,
                    updated_at: 6.0,
                    category: 24,
                    image: 4.0,
                    id: 1,
                },
                {
                    name: 'Ice cream sandwich',
                    created_at: 237,
                    updated_at: 9.0,
                    category: 37,
                    image: 4.3,
                    id: 2,
                },
                {
                    name: 'Eclair',
                    created_at: 262,
                    updated_at: 16.0,
                    category: 23,
                    image: 6.0,
                    id: 3,
                },
                {
                    name: 'Cupcake',
                    created_at: 305,
                    updated_at: 3.7,
                    category: 67,
                    image: 4.3,
                    id: 4,
                },
                {
                    name: 'Gingerbread',
                    created_at: 356,
                    updated_at: 16.0,
                    category: 49,
                    image: 3.9,
                    id: 5,
                },
                {
                    name: 'Jelly bean',
                    created_at: 375,
                    updated_at: 0.0,
                    category: 94,
                    image: 0.0,
                    id: 6,
                },
                {
                    name: 'Lollipop',
                    created_at: 392,
                    updated_at: 0.2,
                    category: 98,
                    image: 0,
                    id: 7,
                },
                {
                    name: 'Honeycomb',
                    created_at: 408,
                    updated_at: 3.2,
                    category: 87,
                    image: 6.5,
                    id: 8,
                },
                {
                    name: 'Donut',
                    created_at: 452,
                    updated_at: 25.0,
                    category: 51,
                    image: 4.9,
                    id: 9,
                },
                {
                    name: 'KitKat',
                    created_at: 518,
                    updated_at: 26.0,
                    category: 65,
                    image: 7,
                    id: 10,
                },
            ],
        };
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
