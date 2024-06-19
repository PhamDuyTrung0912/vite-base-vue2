<template>
    <v-container>
        <c-table :numberColumnFixed="3" :isCheckbox="true" :tableHeaders="tableHeaders" :tableDatas="tableDatas">
            <template v-slot:[`item.picto`]="{ item }">
                <div>
                    <v-img width="40" height="40" style="object-fit: cover; border-radius: 100%" :src="item.picto" alt="picto" />
                </div>
            </template>

            <template v-slot:[`item.image`]="{ item }">
                <div>
                    <v-img width="40" height="40" style="object-fit: cover; border-radius: 100%" :src="item.image" alt="image" />
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

export default defineComponent({
    components: { CTable, ConfirmCategoryDialog },
    name: 'PlaceCategoryTable',
    props: {
        tableDatas: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isConfirmDialog: false,
            tableHeaders: [
                {
                    text: 'Picto',
                    value: 'picto',
                    width: 60,
                    sortable: false,
                },
                {
                    text: 'Image',
                    value: 'image',
                    width: 60,
                    sortable: false,
                },
                { text: 'Actions', value: 'action', width: 100, sortable: false },
                { text: 'Nom', value: 'name', width: 300 },
                { text: 'Thèmes', value: 'themes', width: 250 },
                { text: 'Date de création', value: 'created_at' },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        onHandleEdit() {},
        onHandleDelete() {
            this.isConfirmDialog = true;
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>
