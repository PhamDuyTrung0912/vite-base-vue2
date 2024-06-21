<template>
    <v-container>
        <c-table
            :totalPages="totalPages"
            :currentPage="currentPage"
            :totalItems="totalItems"
            :numberColumnFixed="3"
            :isCheckbox="true"
            :tableHeaders="tableHeaders"
            :tableDatas="tableDatas"
            @onSort="(v) => $emit('onSort', v)"
            @onChangePage="(toPage) => $emit('onChangePage', toPage)">
            <template v-slot:[`item.picto`]="{ item }">
                <div>
                    <v-img
                        v-if="item.picto"
                        width="40"
                        height="40"
                        style="object-fit: cover; border-radius: 100%"
                        :src="$utils.apiAsset(item.picto)"
                        alt="picto" />
                </div>
            </template>

            <template v-slot:[`item.image`]="{ item }">
                <div>
                    <v-img
                        v-if="item.image"
                        width="40"
                        height="40"
                        style="object-fit: cover; border-radius: 100%"
                        :src="$utils.apiAsset(item.image)"
                        alt="image" />
                </div>
            </template>
            <template v-slot:[`item.action`]="{ item }">
                <v-icon @click="onHandleEdit(item)" class="mr-2" dense>mdi-pencil-outline</v-icon>
                <v-icon @click="onHandleDelete(item)" dense>mdi-delete-outline</v-icon>
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
        <confirm-category-dialog @accept="handleDeleteCategory" :show="isConfirmDialog" @close="isConfirmDialog = false" />
    </v-container>
</template>

<script>
import CTable from '@/components/table/CTable.vue';
import { defineComponent } from 'vue';
import ConfirmCategoryDialog from '@/modules/dashboard/place/category/dialog/ConfirmCategoryDialog.vue';
import categoryService from '@/apis/categoryService/index';
import eventBus from '@/eventBus';

export default defineComponent({
    components: { CTable, ConfirmCategoryDialog },
    name: 'PlaceCategoryTable',
    props: {
        totalPages: {
            type: Number,
            default: 0,
        },
        currentPage: {
            type: Number,
            default: 0,
        },
        totalItems: {
            type: Number,
            default: 0,
        },
        tableDatas: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            categorySelected: null,
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
                { text: 'Thèmes', value: 'themes', width: 350, sortable: false },
                { text: 'Date de création', value: 'created_at' },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        onHandleEdit(item) {
            this.categorySelected = item;
            this.$router.push({ name: 'CategoryUpdatePage', params: { id: this.categorySelected.id } });
        },
        onHandleDelete(item) {
            this.categorySelected = item;
            this.isConfirmDialog = true;
        },
        handleDeleteCategory() {
            if (this.categorySelected) {
                eventBus.$emit('isLoading');
                this.isConfirmDialog = false;
                categoryService
                    .deleteCategory(this.categorySelected.id)
                    .then(() => {
                        this.$emit('getCategories');
                        eventBus.$emit('isLoaded');
                        this.$toast.success({
                            message: 'Supprimer la catégorie avec succès !',
                        });
                    })
                    .catch(() => {
                        eventBus.$emit('isLoaded');
                    });
            }
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
