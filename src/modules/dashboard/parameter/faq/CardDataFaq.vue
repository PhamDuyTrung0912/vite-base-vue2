<template>
    <div class="pa-3 ct_card_data_asset">
        <div class="d-flex">
            <v-card flat class="pa-0" style="flex: 95">
                <div>
                    <span class="font-weight-bold">
                        {{ asset.title }}
                    </span>
                    <pre class="px-0 pt-2" v-html="asset.description"></pre>
                </div>
            </v-card>
            <div style="flex: 1" class="pl-5">
                <div class="d-flex justify-center flex-column" style="height: 100%">
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
            }, 100);
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
    mounted() {},
    created() {},
};
</script>

<style scoped>
.ct_card_data_asset {
    box-shadow: #535353 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
