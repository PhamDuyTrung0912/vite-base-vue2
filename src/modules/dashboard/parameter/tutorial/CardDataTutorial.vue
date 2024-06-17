<template>
    <div class="pa-3 ct_card_data_asset">
        <div class="d-flex">
            <v-card flat class="pa-4" style="flex: 95">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="3">
                            <v-card flat :class="`${asset.url ? '' : 'secondary lighten-4'}`" class="py-0">
                                <iframe
                                    v-if="innerWidth"
                                    :width="(innerWidth - 500) / 4"
                                    height="150"
                                    :src="asset.url"
                                    frameborder="0"
                                    allowfullscreen />
                            </v-card>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field
                                :rules="rules.required"
                                :value="asset.name"
                                @input="(e) => debounceSearch(e, 'name')"
                                label="Titre"
                                dense></v-text-field>
                            <v-text-field
                                class="pt-5"
                                :rules="rules.required"
                                :value="asset.url"
                                @input="(e) => debounceSearch(e, 'url')"
                                v-model="asset.url"
                                label="URL"
                                dense></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <div style="flex: 1" class="pl-1">
                <!-- add new -->
                <div v-if="asset.isDefault" class="d-flex align-center" style="height: 100%">
                    <v-btn
                        width="40"
                        :disabled="!valid"
                        outlined
                        color="secondary"
                        @click="addDataAsset()"
                        x-small
                        height="80%"
                        elevation="0"
                        class="rounded-2 ma-0 pa-0 mt-1"
                        ><v-icon color="secondary" size="20">mdi-plus</v-icon></v-btn
                    >
                </div>
                <!-- acction -->
                <div v-else class="d-flex justify-center flex-column" style="height: 100%">
                    <v-btn
                        width="40"
                        @click="removeDataAsset(asset)"
                        x-small
                        height="50"
                        color="color_rejected"
                        elevation="0"
                        class="rounded-0 ma-0 pa-0 mt-1"
                        ><v-icon color="white" size="20">mdi-delete-outline</v-icon></v-btn
                    >
                    <v-btn
                        width="40"
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
import Quill from '@/components/Quill.vue';

export default {
    components: { Quill },
    name: 'CardDataFaq',
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
            innerWidth: null,
        };
    },

    computed: {
        typeSelected() {
            const item = this.dataTypes.find((e) => e.value === this.form.type);
            if (!item) return null;
            return item.text;
        },
    },

    watch: {},

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
            }, 100);
        },

        removeDataAsset(asset) {
            if (asset) {
                eventBus.$emit('removeDataAsset', asset?.uid);
            }
        },

        addDataAsset() {
            const validate = this.$refs.form.validate();
            if (validate) {
                eventBus.$emit('updateFormDataAsset', {
                    ...this.form,
                    isDefault: false,
                });
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
        this.innerWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.innerWidth = window.innerWidth;
        });
    },
    created() {},
};
</script>

<style scoped>
.ct_card_data_asset {
    box-shadow: #535353 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 0px -1px;
}
</style>
