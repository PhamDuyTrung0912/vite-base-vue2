<template>
    <div style="position: relative">
        <attachments @upload="uploadAttachments" height="400px" />
        <div class="d-flex justify-center">
            <v-card class="pa-6" elevation="1" rounded="lg" style="position: absolute; max-width: 1050px; width: 80%; top: 280px">
                <v-form v-model="valid" ref="form">
                    <v-row no-gutters>
                        <v-col cols="12" md="12" class="d-flex justify-start">
                            <icon-file @uploadIcon="uploadIcon" />
                            <v-text-field v-model="form.name" label="Nom de la catégorie" dense></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6" class="py-2 pr-2">
                            <v-text-field v-model="form.technical_name" label="Nom technique" dense></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6" class="pl-2">
                            <v-autocomplete
                                multiple
                                :items="dataThemes"
                                v-model="form.themes"
                                :search-input.sync="searchThemes"
                                item-value="id"
                                item-text="value"
                                clearable
                                hide-details
                                dense
                                outlined
                                placeholder="Thèmes"></v-autocomplete>
                        </v-col>
                        <div class="d-flex justify-space-between align-center">
                            <v-card-title class="px-0 mb-0 py-0">Propriétés</v-card-title>
                        </div>
                        <list-card-properties
                            :dataTypes="dataTypes"
                            :dataProperties="dataProperties"
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
                                    height="45"
                                    class="ct_btn_add"
                                    color="secondary">
                                    <v-icon class="px-5">mdi-plus</v-icon>Ajouter une propriété</v-btn
                                >
                            </div>
                        </v-col>
                        <v-col cols="12" md="12" class="pt-2">
                            <v-btn
                                :disabled="!(valid && validDataAssets)"
                                small
                                height="45"
                                :loading="loading"
                                color="secondary"
                                width="100%"
                                class="mb-2"
                                @click="OnCreate">
                                <v-icon class="px-5">mdi-content-save</v-icon>
                                Sauvegarder</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Attachments from '@/components/Attachments.vue';
import Quill from '@/components/Quill.vue';
import { defineComponent } from 'vue';
import ListCardProperties from '@/modules/dashboard/place/category/action/ListCardProperties.vue';
import eventBus from '@/eventBus';
import IconFile from '@/components/IconFile.vue';

export default defineComponent({
    components: { Attachments, Quill, ListCardProperties, IconFile },
    name: 'CategoryCreateContainer',
    props: {},
    data() {
        return {
            valid: true,
            dataTypes: [
                { text: 'Texte', value: 1 },
                { text: 'Entier', value: 2 },
                { text: 'Décimal', value: 3 },
                { text: 'Booléen', value: 4 },
                { text: 'Date', value: 5 },
                { text: 'Date et heure', value: 6 },
            ],
            dataProperties: [],
            loading: false,
            searchThemes: null,
            dataThemes: [
                {
                    id: 1,
                    value: 'Theme 1',
                },
                {
                    id: 2,
                    value: 'Theme 2',
                },
                {
                    id: 3,
                    value: 'Theme 3',
                },
            ],
            form: {
                name: null,
                technical_name: null,
                isAccess: true,
                themes: [],
            },
            modelDataAsset: {
                name: null,
                technical_name: null,
                type: null,
                is_filter: true,
                visibility: 'Optional',
            },
        };
    },
    watch: {},
    computed: {
        validDataAssets() {
            const itemCheck = this.dataProperties.find((e) => !e.name);
            if (itemCheck) return false;
            return true;
        },
    },
    methods: {
        addDataAsset() {
            this.dataProperties.push({ uid: uuidv4(), ...this.modelDataAsset, position: this.dataProperties.length + 1 });
        },
        checkItem(input, data) {
            if (input === 'name' || input === 'name_user') {
                const itemCheck = this.dataProperties.find(
                    (e) =>
                        e[input] &&
                        e[input]?.toLowerCase() &&
                        data[input]?.toLowerCase() &&
                        e[input].toLowerCase() === data[input].toLowerCase() &&
                        e.uid !== data.uid,
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
            const itemToUpdate = this.dataProperties.findIndex((el) => el.uid === data.uid);
            if (this.checkItem('name', data) || this.checkItem('name_user', data)) {
                if (itemToUpdate > -1) {
                    this.dataProperties.splice(itemToUpdate, 1, {
                        ...data,
                        name: null,
                    });
                }
            } else if (itemToUpdate > -1) this.dataProperties.splice(itemToUpdate, 1, data);
        },

        removeDataAsset(uid) {
            if (uid) {
                const itemToRemoveIndex = this.dataProperties.findIndex((el) => el.uid === uid);
                this.dataProperties.splice(itemToRemoveIndex, 1);
            }
        },
        toggleActiveDataAsset(uid) {
            if (uid) {
                this.dataProperties = this.dataProperties.map((e) => {
                    if (e.uid === uid)
                        return {
                            ...e,
                            is_filter: !e.is_filter,
                        };
                    return e;
                });
            }
        },

        updatePositionDataAsset() {
            this.dataProperties = [...this.dataProperties].map((item, index) => ({ ...item, position: index + 1 }));
        },

        //Emit
        handleReorder(sk) {
            sk.apply(this.dataProperties);
        },
        insertItem(event) {
            this.dataProperties.splice(event.index, 0, event.data);
        },

        clearPosition(item) {
            const index = this.dataProperties.indexOf(item);
            this.dataProperties.splice(index, 1);
        },
        OnCreate() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                console.log(this.form, this.dataProperties);
            }
        },
        uploadAttachments() {
            // console.log('files', files);
        },
        uploadIcon() {
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
