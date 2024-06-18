<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="py-2">
                <v-text-field dense @input="(e) => setValueName(e)" hide-details placeholder="Rechercher" class="pt-0">
                    <template v-slot:append>
                        <v-btn @click="$emit('updateFormFilter')" width="50" elevation="0" class="rounded-xl mb-1" color="primary">
                            <v-icon size="25">mdi-magnify</v-icon>
                        </v-btn>
                    </template>
                </v-text-field>
            </v-col>
            <v-col cols="4">
                <form-select-theme />
            </v-col>
            <v-col cols="4">
                <form-select-category />
            </v-col>
            <v-col cols="4">
                <v-autocomplete
                    :search-input.sync="searchStatus"
                    @change="searchStatus = ''"
                    clearable
                    multiple
                    :items="status"
                    v-model="form.status"
                    hide-details
                    dense
                    outlined
                    placeholder="Status"></v-autocomplete>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FormSelectCategory from '../components/FormSelectCategory.vue';
import FormSelectTheme from '../components/FormSelectTheme.vue';
export default {
    components: { FormSelectTheme, FormSelectCategory },
    name: 'PlaceListFilter',
    data() {
        return {
            searchStatus: null,
            status: [
                {
                    text: 'Brouillon',
                    value: 'draft',
                },
                {
                    text: 'Adopté',
                    value: 'adopted',
                },
            ],
            form: {
                name: null,
                categories: [],
                status: [],
                themes: [],
                sortBy: null,
                sortDesc: null,
            },
        };
    },
    watch: {
        form: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val) {
                    this.$emit('updateFormFilter', this.form);
                }
            },
        },
    },
    methods: {
        setValueName(event) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.form.name = event;
            }, 600);
        },
    },
    created() {},
};
</script>

<style lang="scss" scoped>
</style>
