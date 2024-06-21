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
            <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center">
                    <div
                        :class="[
                            'status_item',
                            { status_item_draft: item.status === 'Draft' },
                            ,
                            { status_item_published: item.status === 'Published' },
                            ,
                            { status_item_archived: item.status === 'Archived' },
                        ]"></div>
                    <v-icon @click="onHandleEdit(item)" class="ml-3 mr-2" dense>mdi-pencil-outline</v-icon>
                    <v-icon @click="onHandleDelete(item)" dense>mdi-delete-outline</v-icon>
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

            <template v-slot:[`item.created_at`]="{ item }">
                <div>{{ $utils.getFullDate(item.created_at) }}</div>
            </template>
        </c-table>
    </v-container>
</template>

<script>
import CTable from '@/components/table/CTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CTable },
    name: 'PlaceListTable',
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
            tableHeaders: [
                {
                    text: 'Image',
                    value: 'image',
                    width: 60,
                    sortable: false,
                },
                { text: 'ID externe', value: 'id', width: 80 },
                { text: 'Actions', value: 'action', width: 100, sortable: false },
                { text: 'Nom', value: 'name', width: 150 },
                { text: 'Catégorie', value: 'category', width: 150 },
                { text: 'Date de création', value: 'created_at', width: 200 },
                { text: 'Date de mise à jour', value: 'updated_at', width: 200 },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        onHandleEdit(item) {},
        onHandleDelete(item) {},
    },
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
    &_draft {
        background-color: $text-white-color;
    }
    &_published {
        background-color: $toast_color_success;
    }
    &_archived {
        background-color: $toast_color_error;
    }
}
</style>
