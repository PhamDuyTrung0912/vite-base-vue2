<template>
    <div>
        <v-card-text class="py-1 px-0">Faites correspondre les champs des propriétés de la catégorie avec ceux de votre fichier.</v-card-text>

        <v-row>
            <v-col cols="6">
                <v-card-text class="font-weight-bold h6 px-0">Catégorie</v-card-text>

                <v-text-field
                    v-for="(field, index) in headersCategory"
                    :key="`property-${index}`"
                    class="mb-8 mt-4"
                    readonly
                    :value="field"
                    dense
                    hide-details
                    placeholder="Producteur"></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-card-text class="font-weight-bold h6 px-0">Colonnes de votre fichier</v-card-text>
                <v-form ref="formCSV">
                    <v-autocomplete
                        clearable
                        v-for="(_, index) in headersCategory"
                        style="margin-bottom: 18px; margin-top: 4px"
                        outlined
                        dense
                        hide-details
                        :key="`column-csv-${index}`"
                        :items="getHeadersCsv"
                        v-model="form[index]"
                        :placeholder="`Select column ${index + 1}`"></v-autocomplete>
                </v-form>
            </v-col>
        </v-row>

        <v-btn @click="nextProcess" width="100%" small height="45" color="primary">Continuer</v-btn>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
    components: {},
    name: 'StepMappingCsv',
    props: {
        dataCSV: {
            require: true,
            type: Object,
        },
        categoryId: {
            require: true,
            type: String,
        },
    },
    data() {
        return {
            form: {},
            headersCategory: ['string', 'int', 'double', 'bool', 'date', 'datetime', 'geo_point', 'geo_shape', 'ip', 'uuidv4', 'geo_point_2d'],
        };
    },
    watch: {},
    computed: {
        getHeadersCsv() {
            return this.dataCSV.headers;
        },

        getDataCsv() {
            return this.dataCSV.data;
        },
    },
    methods: {
        nextProcess() {
            const dataLinked = this.getDataCsv.map((item) => {
                const newItem = {};
                this.headersCategory.forEach((field, index) => {
                    const mappedKey = this.form[index];
                    newItem[field] = mappedKey ? item[mappedKey] : null;
                });
                newItem.uuidv4 = uuidv4();
                return newItem;
            });
            this.$emit('nextStep', dataLinked);
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
