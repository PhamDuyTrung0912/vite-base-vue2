<template>
    <v-container>
        <c-table :loading="isLoadingTable" :numberColumnFixed="3" :isCheckbox="true" :tableHeaders="tableHeaders" :tableDatas="tableDatas">
            <template v-slot:[`item.picto`]="{ item }">
                <v-img width="35" height="35" contain :src="item.picto" />
            </template>

            <template v-slot:[`item.image`]="{ item }">
                <div>
                    <v-img width="80" height="45" style="object-fit: cover" :src="item.image" />
                </div>
            </template>
            <template v-slot:[`item.action`]="{}">
                <v-icon @click="onHandleEdit" class="mr-2" dense>mdi-pencil-outline</v-icon>
                <v-icon @click="onHandleDelete" dense>mdi-delete-outline</v-icon>
            </template>

            <template v-slot:[`item.created_at`]="{ item }">
                <div>{{ $utils.getFullDate(item.created_at) }}</div>
            </template>

            <template v-slot:[`item.themes`]="{ item }">
                <div>
                    <v-chip class="ml-1" small v-for="(theme, index) in item.themes" :key="index">{{ theme.name }}</v-chip>
                </div>
            </template>
        </c-table>

        <!-- Dialog -->
        <confirm-category-dialog :show="isConfirmDialog" @close="isConfirmDialog = false" />
    </v-container>
</template>

<script>
import CTable from '@/components/table/CTable.vue';
import { defineComponent } from 'vue';
import ConfirmCategoryDialog from '@/modules/dashboard/place/category/dialog/ConfirmCategoryDialog.vue';
import categoryServices from '@/apis/categoryService/index';

export default defineComponent({
    components: { CTable, ConfirmCategoryDialog },
    name: 'PlaceCategoryTable',
    props: {},
    data() {
        return {
            isLoadingTable: false,
            isConfirmDialog: false,
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
                { text: 'Nom', value: 'name', width: 250 },
                { text: 'Thèmes', value: 'themes', width: 250 },
                { text: 'Date de création', value: 'created_at', width: 250 },
            ],
            tableDatas: [],
        };
    },
    watch: {},
    computed: {},
    methods: {
        onHandleEdit() {},
        onHandleDelete() {
            this.isConfirmDialog = true;
        },

        //Api
        getCategories() {
            this.isLoadingTable = true;
            categoryServices
                .getCategories()
                .then((data) => {
                    console.log(data);
                    this.tableDatas = data;
                    this.isLoadingTable = false;
                })
                .catch(() => {
                    this.isLoadingTable = false;
                });
        },
    },
    mounted() {},
    created() {
        this.getCategories();
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>
