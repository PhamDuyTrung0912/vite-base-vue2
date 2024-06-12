<template>
    <div>
        <step-import-csv v-if="step === 1" @nextStep="onNextStepMapping" />
        <step-mapping-csv v-if="step === 2 && form" :dataStepImport="form" />
    </div>
</template>

<script>
import CsvUpload from '@/components/Fileupload/CsvUpload.vue';
import { defineComponent } from 'vue';
import StepImportCsv from './import/StepImportCsv.vue';
import StepMappingCsv from './import/StepMappingCsv.vue';

export default defineComponent({
    components: { CsvUpload, StepImportCsv, StepMappingCsv },
    name: 'PlaceImportContainer',
    props: {},
    data() {
        return {
            categories: ['Aires de jeux', 'Category 2'],
            form: null,
            step: 1,
        };
    },
    watch: {},
    computed: {},
    methods: {
        onNextStepMapping(data) {
            this.form = data;
            this.step += 1;
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
