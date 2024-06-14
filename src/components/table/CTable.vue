<template>
    <v-card elevation="1">
        <v-data-table
            ref="dataTable"
            item-key="id"
            checkbox-color="primary"
            :show-select="isCheckbox"
            :items="tableDatas"
            :headers="tableHeaders"
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
    </v-card>
</template>

<script>
import fixedColumnTable from '@/mixins/fixedColumnTable';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CTable',
    props: {
        tableHeaders: {
            type: Array,
            require: true,
        },
        tableDatas: {
            type: Array,
            require: true,
        },
        isCheckbox: {
            type: Boolean,
            default: false,
        },
        numberColumnFixed: {
            type: Number,
            default: 0,
        },
    },
    mixins: [fixedColumnTable],

    data() {
        return {
            selectAllCheckbox: false,
        };
    },
    watch: {},
    computed: {},
    methods: {
        selectAll() {
            console.log('select all');
        },
        deselectAll() {
            console.log('deselect all');
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
