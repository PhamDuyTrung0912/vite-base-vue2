<template>
    <div class="pa-4 ct_card_data_asset">
        <div class="d-flex">
            <v-card flat class="pa-1" style="flex: 95">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                :rules="rules.required"
                                :value="asset.name_user"
                                @input="(e) => debounceSearch(e, 'name_user')"
                                dense
                                hide-details
                                placeholder="Titre"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                :rules="rules.required"
                                :value="asset.name"
                                @input="(e) => debounceSearch(e, 'name')"
                                dense
                                hide-details
                                placeholder="Valeur"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <div width="100%" class="d-flex align-center">
                                <v-switch
                                    :input-value="asset.is_primary"
                                    @change="(e) => changeColumnBoolean(e, 'is_primary')"
                                    class="mr-4 mt-0"
                                    dense
                                    color="secondary"
                                    label="Obligatoire"></v-switch>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <div style="flex: 1" class="pl-3">
                <div class="text-center">
                    <v-btn @click="removeDataAsset(asset)" x-small height="40" color="color_rejected" elevation="0" class="rounded-0 ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-delete-outline</v-icon></v-btn
                    >
                    <v-btn @click="removeDataAsset(asset)" x-small height="40" color="secondary" elevation="0" class="rounded-0 ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-eye-outline</v-icon></v-btn
                    >

                    <v-btn @click="removeDataAsset(asset)" x-small height="40" color="color_rejected" elevation="0" class="rounded-0 ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-eye-off-outline</v-icon></v-btn
                    >

                    <v-btn
                        style="cursor: grabbing !important"
                        @mouseover="mouseoverLocationDrag"
                        @mouseout="mouseoutLocationDrag"
                        color="primary2"
                        x-small
                        height="50"
                        elevation="0"
                        class="rounded-0 ma-0 pa-0 mt-1"
                        ><v-icon size="30" color="secondary">mdi-drag-vertical</v-icon></v-btn
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from '@/eventBus';

export default {
    name: 'CardDataAsset',
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
        dataAssets: {
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
                name: null,
                name_user: null,
                data_type_id: null,
                description: null,
                is_primary: null,
                is_required: 'optionnal',
                is_sensitive: null,
                is_unique: null,
                additional_rule: null,
                example: null,
                hint_regex: null,
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
        hintRegex() {
            if (this.asset.additional_rule) {
                return `${this.asset.additional_rule}`;
            }
            return null;
        },
        typeSelected() {
            const item = this.dataTypes.find((e) => e.value === this.form.data_type_id);
            if (!item) return null;
            return item.text;
        },
    },

    watch: {
        form: {
            deep: true,
            handler() {
                // const validate = this.$refs.form.validate();
                // if (validate) {
                eventBus.$emit('updateFormDataAsset', this.form);
                // }
            },
        },
    },

    methods: {
        updateRegex(data) {
            this.form.additional_rule = data.value.toString();
            this.form.hint_regex = data?.name || null;
            this.isShowHint = false;
        },
        showPresetHint() {
            this.isShowHint = !this.isShowHint;
        },
        handlerDataType() {
            if (this.typeSelected === 'Sélection') {
                this.form = {
                    ...this.form,
                    example: JSON.stringify(this.answers),
                };
            } else {
                this.form = {
                    ...this.form,
                    example: null,
                };
            }
        },
        handleDeleteAnswer(posAnswer) {
            this.answers.splice(posAnswer, 1);
        },
        handleAddAnswer() {
            this.answers.push(null);
        },
        changeColumnBoolean(e, key) {
            if (e) {
                this.form[key] = e;
            } else {
                this.form[key] = false;
            }
        },
        debounceSearch(event, key) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.form[key] = event;
                if (key === 'additional_rule') {
                    this.form.hint_regex = 'Custom';
                }
            }, 600);
        },

        removeDataAsset(asset) {
            if (asset) {
                eventBus.$emit('removeDataAsset', asset?.key);
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
    created() {
        this.form = { ...this.asset };
        // this.$nextTick(() => {
        //     this.$refs.form.resetValidation();
        // });
    },
};
</script>

<style scoped>
.ct_card_data_asset {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 8px;
}
</style>
