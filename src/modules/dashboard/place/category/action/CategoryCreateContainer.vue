<template>
    <div style="position: relative">
        <attachments @upload="uploadAttachments" height="400px" />
        <div class="d-flex justify-center">
            <v-card class="pa-5 my-10" rounded="xxl" style="position: absolute; width: 80%; top: 240px">
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="form.name" label="Nom de la catégorie" dense></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6" class="py-2 pr-2">
                            <v-text-field v-model="form.name" label="Nom technique" dense></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6" class="pl-2">
                            <v-autocomplete
                                multiple
                                :items="dataThemes"
                                v-model="form.themes"
                                :search-input.sync="searchThemes"
                                clearable
                                hide-details
                                dense
                                outlined
                                placeholder="Thèmes"></v-autocomplete>
                        </v-col>
                        <div class="d-flex justify-space-between align-center">
                            <v-card-title class="px-0 mb-0 py-0">Propriétés</v-card-title>
                        </div>
                        <list-card-data-asset
                            :dataTypes="dataTypes"
                            :dataAssets="dataAssets"
                            @handleReorder="handleReorder"
                            @insertItem="insertItem"
                            @clearPosition="clearPosition" />

                        <v-col>
                            <div class="mt-3 text-center">
                                <v-btn
                                    :disabled="!(valid && validDataAssets)"
                                    text
                                    @click="addDataAsset"
                                    width="100%"
                                    height="50"
                                    class="ct_btn_add"
                                    color="secondary">
                                    <v-icon class="px-5">mdi-plus</v-icon>Ajouter une propriété</v-btn
                                >
                            </div>
                        </v-col>
                        <v-col cols="12" md="12" class="pt-2">
                            <v-btn small height="44" :loading="loading" color="secondary" width="100%" class="mb-2" @click="save">
                                <v-icon class="px-5">mdi-content-save</v-icon>
                                Sauvegarder</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Attachments from '@/components/Attachments.vue';
import Quill from '@/components/Quill.vue';
import { defineComponent } from 'vue';
import ListCardDataAsset from './ListCardDataAsset.vue';
import eventBus from '@/eventBus';

export default defineComponent({
    components: { Attachments, Quill, ListCardDataAsset },
    name: 'CategoryCreateContainer',
    props: {},
    data() {
        return {
            valid: true,
            dataTypes: [],
            dataAssets: [],
            loading: false,
            searchThemes: null,
            dataThemes: [],
            form: {
                name: null,
                techName: null,
                isAccess: true,
                themes: [],
            },
            modelDataAsset: {
                title: null,
                value: null,
                isRequired: false,
                isActive: true,
            },
        };
    },
    watch: {},
    computed: {
        validDataAssets() {
            const itemCheck = this.dataAssets.find((e) => !e.title);
            if (itemCheck) return false;
            return true;
        },
    },
    methods: {
        addDataAsset() {
            this.dataAssets.push({ key: uuidv4(), ...this.modelDataAsset, position: this.dataAssets.length + 1 });
        },
        checkItem(input, data) {
            if (input === 'name' || input === 'name_user') {
                const itemCheck = this.dataAssets.find(
                    (e) =>
                        e[input] &&
                        e[input]?.toLowerCase() &&
                        data[input]?.toLowerCase() &&
                        e[input].toLowerCase() === data[input].toLowerCase() &&
                        e.key !== data.key,
                );
                if (itemCheck) {
                    let message = '';
                    if (input === 'name') {
                        message = 'Le nom de la propriété existait';
                    } else if (input === 'name_user') {
                        message = 'Le nom de la technique existait';
                    }

                    eventBus.$emit('displaySnackbar', {
                        message,
                        color: 'error',
                        timeout: 4000,
                    });
                    return true;
                }
            }
            return false;
        },
        updateFormDataAsset(data) {
            const itemToUpdate = this.dataAssets.findIndex((el) => el.key === data.key);
            if (this.checkItem('name', data) || this.checkItem('name_user', data)) {
                if (itemToUpdate > -1) {
                    this.dataAssets.splice(itemToUpdate, 1, {
                        ...data,
                        name: null,
                    });
                }
            } else if (itemToUpdate > -1) this.dataAssets.splice(itemToUpdate, 1, data);
        },

        removeDataAsset(key) {
            if (key) {
                const itemToRemoveIndex = this.dataAssets.findIndex((el) => el.key === key);
                this.dataAssets.splice(itemToRemoveIndex, 1);
            }
        },
        toggleActiveDataAsset(key) {
            if (key) {
                this.dataAssets = this.dataAssets.map((e) => {
                    if (e.key === key)
                        return {
                            ...e,
                            isActive: !e.isActive,
                        };
                    return e;
                });
            }
        },

        updatePositionDataAsset() {
            this.dataAssets = [...this.dataAssets].map((item, index) => ({ ...item, position: index + 1 }));
        },

        //Emit
        handleReorder(sk) {
            sk.apply(this.dataAssets);
        },
        insertItem(event) {
            this.dataAssets.splice(event.index, 0, event.data);
        },

        clearPosition(item) {
            const index = this.dataAssets.indexOf(item);
            this.dataAssets.splice(index, 1);
        },
        insertDataAsset(headers) {
            const assets = [];
            headers.forEach((header, index) => {
                assets.push({
                    key: uuidv4(),
                    name: header,
                    name_user: null,
                    data_type_id: null,
                    description: null,
                    is_primary: false,
                    is_required: 'optionnal',
                    is_sensitive: false,
                    is_unique: false,
                    additional_rule: null,
                    example: null,
                    position: index + 1,
                });
            });
            if (this.$utils.validArrayNotEmpty(assets)) {
                this.dataAssets = [...this.dataAssets, ...assets];
            }
        },
        save() {
            if (this.$refs.form.validate()) {
                this.loading = true;
            }
        },
        uploadAttachments() {
            // console.log('files', files);
        },
        debounceSearch(event, key) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.form[key] = event;
            }, 600);
        },
        reloadFeature() {
            this.removeAllFeature();
        },
    },
    mounted() {},
    created() {
        this.addDataAsset();
        eventBus.$on('removeDataAsset', this.removeDataAsset);
        eventBus.$on('toggleActiveDataAsset', this.toggleActiveDataAsset);
        eventBus.$on('updateFormDataAsset', this.updateFormDataAsset);
        eventBus.$on('updatePositionDataAsset', this.updatePositionDataAsset);
    },
    beforeDestroy() {
        eventBus.$off('removeDataAsset', this.removeDataAsset);
        eventBus.$off('toggleActiveDataAsset', this.toggleActiveDataAsset);
        eventBus.$off('updateFormDataAsset', this.updateFormDataAsset);
        eventBus.$off('updatePositionDataAsset', this.updatePositionDataAsset);
    },
});
</script>

<style lang="scss" scoped>
.ct_btn_add {
    border: 1px dashed rgb(192, 192, 192);
}
</style>