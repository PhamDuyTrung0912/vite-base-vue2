<template>
    <div>
        <v-card-text class="py-1 px-0 mb-3">Vérifier les champs à importer.</v-card-text>
        <c-table :numberColumnFixed="1" :tableHeaders="getHeaders" :tableDatas="dataLinked">
            <template v-slot:[`item.action`]="{}">
                <v-icon class="mr-2" dense>mdi-pencil-outline</v-icon>
                <v-icon dense>mdi-delete-outline</v-icon>
            </template>
        </c-table>
        <div class="pa-3 my-3 text-end">
            <c-pagination />
        </div>
        <v-btn @click="nextProcess" width="100%" small height="45" color="primary">Continuer</v-btn>
    </div>
</template>

<script>
import CPagination from '@/components/pagination/CPagination.vue';
import CTable from '@/components/table/CTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CTable, CPagination },
    name: 'StepImportValidateCsv',
    props: {
        dataLinked: {
            require: true,
            type: Array,
        },
        categoryFields: {
            require: true,
            type: Array,
        },
    },
    data() {
        return {};
    },
    watch: {},
    computed: {
        getHeaders() {
            const headers = [...this.categoryFields].map((field) => ({
                text: field,
                align: 'start',
                value: field,
                sortable: false,
            }));
            headers.unshift({ text: 'Actions', value: 'action', width: 120, sortable: false });
            return headers;
        },
    },
    methods: {
        nextProcess() {
            this.$emit('nextStep');
        },
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
    background-color: $toast_color_success;
}
</style>
