<template>
    <v-card elevation="1">
        <v-data-table
            :loading="loading"
            ref="dataTable"
            item-key="id"
            checkbox-color="primary"
            :show-select="isCheckbox"
            :items="tableDatas"
            :headers="tableHeaders"
            :sortBy.sync="sort.sortBy"
            :sortDesc.sync="sort.sortDesc"
            :custom-sort="customSort"
            hide-default-footer>
            <template v-slot:[`header.data-table-select`]="{ props }">
                <v-checkbox
                    v-model="selectAllCheckbox"
                    :indeterminate="props.indeterminate"
                    :disabled="props.disabled"
                    @change="selectAllCheckbox ? selectAll() : deselectAll()" />
            </template>

            <template v-for="(header, index) in tableHeaders" v-slot:[`header.${header.value}`]="{}">
                <span :key="`${header.text}-${index + 1}`" class="header_item_title">{{ header.text }}</span>
            </template>

            <template v-for="header in tableHeaders" v-slot:[`item.${header.value}`]="props">
                <slot :name="`item.${header.value}`" v-bind="props">
                    {{ props.item[header.value] }}
                </slot>
            </template>
        </v-data-table>
        <v-divider></v-divider>
        <div class="pa-3 mt-3">
            <c-pagination
                @onChangePage="(toPage) => $emit('onChangePage', toPage)"
                :totalItems="totalItems"
                :totalPages="totalPages"
                :currentPage="currentPage" />
        </div>
    </v-card>
</template>

<script>
import fixedColumnTable from '@/mixins/fixedColumnTable';
import { defineComponent } from 'vue';
import CPagination from '@/components/pagination/CPagination.vue';
import debounce from '@/utils/debounce';

export default defineComponent({
    name: 'CTable',
    components: { CPagination },
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
        tableHeaders: {
            type: Array,
            require: true,
        },
        tableDatas: {
            type: Array,
            default: () => [],
        },
        isCheckbox: {
            type: Boolean,
            default: false,
        },
        numberColumnFixed: {
            type: Number,
            default: 0,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    mixins: [fixedColumnTable],

    data() {
        return {
            selectAllCheckbox: false,
            sort: {
                sortBy: [],
                sortDesc: [],
            },
        };
    },
    watch: {
        sort: {
            immediate: false,
            deep: true,
            handler: debounce(function (value) {
                this.$emit('onSort', value);
            }, 200),
        },
    },
    computed: {},
    methods: {
        selectAll() {
            console.log('select all');
        },
        deselectAll() {
            console.log('deselect all');
        },

        customSort(items) {
            return items;
        },
    },
    mounted() {
        this.mountedObserver();
        this.updateFixedColumns();
    },
    created() {},
    beforeDestroy() {
        this.beforeDestroyObserver();
    },
});
</script>

<style lang="scss" scoped>
.header_item_title {
    font-size: 13px;
    font-weight: 700;
    color: $text-black-color;
}
</style>
