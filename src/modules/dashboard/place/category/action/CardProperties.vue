<template>
    <div class="pa-4 ct_card_data_asset">
        <div class="d-flex">
            <v-card flat class="pa-1" style="flex: 95">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                :rules="rules.required"
                                :value="asset.name"
                                @input="(e) => debounceSearch(e, 'name')"
                                dense
                                hide-details
                                placeholder="Nom"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                :rules="rules.required"
                                :value="asset.technical_name"
                                @input="(e) => debounceSearch(e, 'technical_name')"
                                dense
                                hide-details
                                placeholder="Nom technique"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                @change="handlerDataType"
                                :rules="rules.required"
                                :items="dataTypes"
                                v-model="form.type"
                                hide-details
                                dense
                                placeholder="Type"></v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                            <div width="100%" class="d-flex align-center">
                                <v-switch
                                    dense
                                    class="mr-4 mt-0"
                                    v-model="asset.visibility"
                                    label="Obligatoire"
                                    false-value="Optional"
                                    true-value="Mandatory"
                                    hide-details></v-switch>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <div style="flex: 1" class="pl-3">
                <div class="text-center">
                    <v-btn @click="removeDataAsset(asset)" x-small height="40" color="color_rejected" elevation="0" class="rounded-md ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-delete-outline</v-icon></v-btn
                    >
                    <v-btn
                        v-if="asset.is_filter"
                        @click="toggleActiveDataAsset(asset)"
                        x-small
                        height="40"
                        color="secondary"
                        elevation="0"
                        class="rounded-md ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-eye-outline</v-icon></v-btn
                    >

                    <v-btn
                        v-else
                        @click="toggleActiveDataAsset(asset)"
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
        dataTypes: {
            type: Array,
            default: () => [],
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
                required: [(v) => !!v || 'Données requises pour entrer'],
            },
            form: {
                ...this.asset,
            },
            debounce: null,
            requiredTypes: [
                {
                    text: 'Obligatoire',
                    value: 'required',
                },
                {
                    text: 'Recommandé',
                    value: 'recommended',
                },
                {
                    text: 'Optionnel',
                    value: 'optionnal',
                },
            ],
            isShowHint: false,
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
                const validate = this.$refs.form.validate();
                if (validate) {
                    eventBus.$emit('updateFormDataAsset', this.form);
                }
            },
        },
    },

    methods: {
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

        removeDataAsset(asset) {
            if (asset) {
                eventBus.$emit('removeDataAsset', asset?.uid);
            }
        },
        toggleActiveDataAsset(asset) {
            if (asset) {
                eventBus.$emit('toggleActiveDataAsset', asset?.uid);
            }
        },
        mouseoverLocationDrag() {
            eventBus.$emit('mouseoverLocationDrag');
        },
        mouseoutLocationDrag() {
            eventBus.$emit('mouseoutLocationDrag');
        },
    },
    mounted() {
        this.$refs.form.validate();
    },
    created() {},
};
</script>

<style scoped>
.ct_card_data_asset {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.15) 0px 1px 3px -1px;
    border-radius: 8px;
}
</style>
