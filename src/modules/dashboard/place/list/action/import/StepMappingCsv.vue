<template>
    <div>
        <v-card-text class="py-1 px-0">Faites correspondre les champs des propriétés de la catégorie avec ceux de votre fichier.</v-card-text>

        <v-row>
            <v-col cols="6">
                <v-card-text class="font-weight-bold h6 px-0">Catégorie</v-card-text>

                <v-text-field
                    v-for="(field, index) in headers"
                    :key="`property-${index}`"
                    class="mb-8 mt-4"
                    readonly
                    dense
                    hide-details
                    placeholder="Producteur"></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-card-text class="font-weight-bold h6 px-0">Colonnes de votre fichier</v-card-text>
                <v-form ref="formCSV">
                    <v-autocomplete
                        clearable
                        v-for="(_, index) in headers"
                        style="margin-bottom: 18px; margin-top: 4px"
                        outlined
                        dense
                        hide-details
                        :key="`column-csv-${index}`"
                        :items="headers"
                        v-model="form[index]"
                        :placeholder="`Select column ${index + 1}`"></v-autocomplete>
                </v-form>
            </v-col>
        </v-row>

        <div class="d-flex flex-row-reverse">
            <v-btn width="100%" small height="45" color="primary">Continuer</v-btn>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    components: {},
    name: 'StepMappingCsv',
    props: {
        dataStepImport: {
            require: true,
        },
    },
    data() {
        return {
            form: {},
            headers: ['string', 'int', 'double', 'bool', 'date', 'datetime', 'geo_point', 'geo_shape', 'ip', 'uuidv4', 'geo_point_2d'],
        };
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
