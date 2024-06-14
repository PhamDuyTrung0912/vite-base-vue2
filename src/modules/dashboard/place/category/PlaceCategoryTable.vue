<template>
    <v-container>
        <c-table :numberColumnFixed="3" :isCheckbox="true" :tableHeaders="tableHeaders" :tableDatas="tableDatas">
            <template v-slot:[`item.picto`]="{}">
                <v-img width="30" height="30" contain src="/logo.png" />
            </template>

            <template v-slot:[`item.image`]="{}">
                <v-img width="30" height="30" contain src="/logo.png" />
            </template>
            <template v-slot:[`item.action`]="{}">
                <v-icon @click="onHandleEdit" class="mr-2" dense>mdi-pencil-outline</v-icon>
                <v-icon @click="onHandleDelete" dense>mdi-delete-outline</v-icon>
            </template>
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
    name: 'PlaceCategoryTable',
    props: {},
    data() {
        return {
            tableHeaders: [
                {
                    text: 'Picto',
                    value: 'picto',
                    width: 120,
                    sortable: false,
                },
                {
                    text: 'Image',
                    value: 'image',
                    width: 120,
                    sortable: false,
                },
                { text: 'Actions', value: 'action', width: 120, sortable: false },
                { text: 'Nom', value: 'name' },
                { text: 'Thèmes', value: 'category' },
                { text: 'Date de création', value: 'created_at', width: 200 },
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
    methods: {
        onHandleEdit() {},
        onHandleDelete() {},
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>
