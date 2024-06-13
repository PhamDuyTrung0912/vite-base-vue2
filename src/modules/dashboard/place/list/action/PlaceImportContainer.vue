<template>
    <div>
        <step-import-csv v-if="step === 1" @nextStep="onNextStepMapping" />
        <step-mapping-csv
            v-if="step === 2 && categoryId && dataCSV"
            :dataCSV="dataCSV"
            :categoryId="categoryId"
            @nextStep="onNextStepValidateTable" />
        <step-validate-csv v-if="step === 3 && dataLinked" :dataLinked="dataLinked" :categoryFields="categoryFields" @nextStep="onNextStepConfirm" />
        <step-confirm-csv v-if="step === 4 && dataLinked" />
    </div>
</template>

<script>
import CsvUpload from '@/components/Fileupload/CsvUpload.vue';
import { defineComponent } from 'vue';
import StepConfirmCsv from './import/StepConfirmCsv.vue';
import StepImportCsv from './import/StepImportCsv.vue';
import StepMappingCsv from './import/StepMappingCsv.vue';
import StepValidateCsv from './import/StepValidateCsv.vue';

export default defineComponent({
    components: { CsvUpload, StepImportCsv, StepMappingCsv, StepValidateCsv, StepConfirmCsv },
    name: 'PlaceImportContainer',
    props: {},
    data() {
        return {
            categories: ['Aires de jeux', 'Category 2'],

            step: 1,

            dataCSV: null,
            categoryId: null,
            categoryFields: ['string', 'int', 'double', 'bool', 'date', 'datetime', 'geo_point', 'geo_shape', 'ip', 'uuidv4', 'geo_point_2d'],

            dataLinked: null,
        };
    },
    watch: {},
    computed: {},
    methods: {
        onNextStepMapping(data) {
            this.dataCSV = data?.dataCSV;
            this.categoryId = data?.categoryId;
            this.step += 1;
        },
        onNextStepValidateTable(data) {
            this.dataLinked = data;
            this.step += 1;
        },
        onNextStepConfirm() {
            this.step += 1;
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
