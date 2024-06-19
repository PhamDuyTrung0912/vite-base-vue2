<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="py-2">
                <v-text-field dense @input="(e) => setValueName(e)" hide-details placeholder="Rechercher" class="pt-0">
                    <template v-slot:append>
                        <v-btn width="50" elevation="0" class="rounded-xl mb-1" color="primary">
                            <v-icon size="25">mdi-magnify</v-icon>
                        </v-btn>
                    </template>
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <form-select-theme @onSelectTheme="onSelectTheme" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FormSelectTheme from '@/modules/dashboard/place/components/FormSelectTheme.vue';
import debounce from '@/utils/debounce';

export default {
    components: { FormSelectTheme },
    name: 'PlaceCategoryFilter',
    data() {
        return {
            form: {
                name: null,
                themes: [],
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
            this.form.themes = value;
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
