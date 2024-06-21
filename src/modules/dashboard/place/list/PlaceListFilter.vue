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
                <form-select-theme @onSelectTheme="onSelectTheme" />
            </v-col>
            <v-col cols="4">
                <form-select-category @onSelectCategory="onSelectCategory" />
            </v-col>
            <v-col cols="4">
                <v-autocomplete
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
import debounce from '@/utils/debounce';
import FormSelectCategory from '../components/FormSelectCategory.vue';
import FormSelectTheme from '../components/FormSelectTheme.vue';
export default {
    components: { FormSelectTheme, FormSelectCategory },
    name: 'PlaceListFilter',
    data() {
        return {
            status: [
                {
                    text: 'Brouillon',
                    value: 'Draft',
                },
                {
                    text: 'Published',
                    value: 'Published',
                },
                {
                    text: 'Archived',
                    value: 'Archived',
                },
            ],
            form: {
                name: null,
                categories_id: [],
                status: [],
                themes_id: [],
            },
        };
    },
    watch: {
        form: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val) {
                    this.$emit('formFilter', this.form);
                }
            },
        },
    },
    methods: {
        onSelectTheme(value) {
            this.form.themes_id = value;
        },
        onSelectCategory() {
            this.form.categories_id = value;
        },
        setValueName(event) {
            this.debouncedSetName(event);
        },
    },
    created() {
        this.debouncedSetName = debounce((event) => {
            this.form.name = event;
        }, 500);
    },
};
</script>

<style lang="scss" scoped>
</style>
