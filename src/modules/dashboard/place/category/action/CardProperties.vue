<template>
    <div class="pa-4 ct_card_data_asset">
        <div class="d-flex">
            <v-card flat class="pa-1" style="flex: 95">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row class="mt-1">
                        <v-col cols="6" class="py-0">
                            <v-text-field
                                :rules="rules.requiredAndUnique"
                                :value="asset.name"
                                @input="(e) => debounceSearch(e, 'name')"
                                dense
                                label="Nom"></v-text-field>
                        </v-col>
                        <v-col cols="6" class="py-0">
                            <v-text-field
                                :rules="rules.requiredAndUniqueTechnical"
                                :value="asset.technical_name"
                                @input="(e) => debounceSearch(e, 'technical_name')"
                                dense
                                label="Nom technique"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="py-0">
                            <v-autocomplete
                                @change="handlerDataType"
                                :rules="rules.required"
                                :items="dataTypes"
                                v-model="form.type"
                                dense
                                label="Type"></v-autocomplete>
                        </v-col>
                        <v-col cols="6" class="py-0">
                            <div width="100%" class="d-flex align-center">
                                <v-switch
                                    class="mt-0 pt-0"
                                    dense
                                    v-model="asset.visibility"
                                    false-value="Optionnal"
                                    true-value="Required"
                                    hide-details></v-switch>
                                <v-card-text class="text-subtitle-2 py-1 text_primary--text px-0"> Obligatoire</v-card-text>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <div style="flex: 1" class="pl-3">
                <div class="text-center">
                    <v-btn @click="removeProperty(asset)" x-small height="40" color="color_rejected" elevation="0" class="rounded-md ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-delete-outline</v-icon></v-btn
                    >
                    <v-btn
                        v-if="asset.is_filter"
                        @click="toggleActiveProperty(asset)"
                        x-small
                        height="40"
                        color="secondary"
                        elevation="0"
                        class="rounded-md ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-eye-outline</v-icon></v-btn
                    >

                    <v-btn
                        v-else
                        @click="toggleActiveProperty(asset)"
                        x-small
                        height="40"
                        color="color_rejected"
                        elevation="0"
                        class="rounded-md ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-eye-off-outline</v-icon></v-btn
                    >

                    <v-btn
                        style="cursor: grabbing !important"
                        @mouseover="mouseoverLocationDrag"
                        @mouseout="mouseoutLocationDrag"
                        x-small
                        height="50"
                        elevation="0"
                        class="rounded-md ma-0 pa-0 mt-1"
                        ><v-icon size="30" color="text_primary">mdi-drag-vertical</v-icon></v-btn
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from '@/eventBus';

export default {
    name: 'CardProperties',
    props: {
        asset: {
            type: Object,
            require: true,
            default: () => {},
        },

        dataProperties: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            answers: [],
            valid: true,
            rules: {
                requiredAndUnique: [
                    (v) => !!v || 'Données requises pour entrer',
                    (v) => this.unqiueFuction(v, 'name', this.form.uid) || 'Name must be unique',
                ],
                requiredAndUniqueTechnical: [
                    (v) => !!v || 'Données requises pour entrer',
                    (v) => this.unqiueFuction(v, 'technical_name', this.form.uid) || 'Name technique must be unique',
                ],
                required: [(v) => !!v || 'Données requises pour entrer'],
            },
            form: {
                ...this.asset,
            },
            debounce: null,
            debounceForm: null,
            isShowHint: false,

            dataTypes: [
                { text: 'Texte', value: 'text' },
                { text: 'Entier', value: 'integer' },
                { text: 'Décimal', value: 'double' },
                { text: 'Booléen', value: 'boolean' },
                { text: 'Date', value: 'date' },
                { text: 'Date et heure', value: 'datetime' },
            ],
        };
    },

    computed: {
        typeSelected() {
            const item = this.dataTypes.find((e) => e.value === this.form.type);
            if (!item) return null;
            return item.text;
        },
    },

    watch: {
        form: {
            deep: true,
            handler() {
                eventBus.$emit('updateFormProperty', this.form);
            },
        },
    },

    methods: {
        unqiueFuction(v, key, uid) {
            const check = !this.dataProperties.some((form) => form[key] === v && form.uid !== uid);
            return check;
        },
        handlerDataType() {
            if (this.typeSelected === 'Sélection') {
                this.form = {
                    ...this.form,
                };
            } else {
                this.form = {
                    ...this.form,
                };
            }
        },
        changeColumnBoolean(e, key) {
            if (e) {
                this.form[key] = 'Mandatory';
            } else {
                this.form[key] = 'Optional';
            }
        },
        debounceSearch(event, key) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.form[key] = event;
            }, 300);
        },

        removeProperty(asset) {
            if (asset) {
                eventBus.$emit('removeProperty', asset?.uid);
            }
        },
        toggleActiveProperty(asset) {
            if (asset) {
                eventBus.$emit('toggleActiveProperty', asset?.uid);
            }
        },
        mouseoverLocationDrag() {
            eventBus.$emit('mouseoverLocationDrag');
        },
        mouseoutLocationDrag() {
            eventBus.$emit('mouseoutLocationDrag');
        },
    },
    mounted() {},
    created() {},
};
</script>

<style scoped>
.ct_card_data_asset {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.15) 0px 1px 3px -1px;
    border-radius: 8px;
}
</style>
