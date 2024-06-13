<template>
    <div>
        <csv-upload @upload="uploadDataCSV" />
        <v-sheet max-width="100%" class="d-flex align-center flex-column">
            <v-card elevation="0" flat width="800" class="mt-4">
                <v-autocomplete
                    v-model="form.categoryId"
                    :items="categories"
                    class="my-4"
                    hide-details="auto"
                    outlined
                    dense
                    placeholder="Catégorie"></v-autocomplete>
                <v-btn @click="nextProcess" :disabled="!isFormValid" height="40" color="primary" width="100%">Continuer</v-btn>
            </v-card>
        </v-sheet>
    </div>
</template>

<script>
import Congratulation from '@/components/congratulation/Congratulation.vue';
import CsvUpload from '@/components/Fileupload/CsvUpload.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CsvUpload, Congratulation },
    name: 'StepImportCsv',
    props: {},
    data() {
        return {
            categories: ['Aires de jeux', 'Category 2'],
            form: {
                dataCSV: null,
                categoryId: null,
            },
        };
    },
    watch: {},
    computed: {
        isFormValid() {
            return this.form.dataCSV !== null && this.form.categoryId !== null;
        },
    },
    methods: {
        uploadDataCSV(file) {
            this.form.dataCSV = file;
        },
        nextProcess() {
            this.$emit('nextStep', this.form);
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
