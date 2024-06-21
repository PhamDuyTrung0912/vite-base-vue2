<template>
    <div style="position: relative; height: 100%">
        <attachments :previewProp="previewImgProp" @upload="uploadImage" height="400px" />
        <div class="form_container">
            <v-card class="pa-6" elevation="3" rounded="lg">
                <v-form v-model="valid" ref="form">
                    <v-row no-gutters>
                        <v-col cols="12" md="12" class="d-flex justify-start">
                            <icon-file :previewProp="previewPictoProp" @uploadIcon="uploadIcon" />
                            <v-text-field :rules="rules.required" v-model="form.name" label="Nom de la catégorie" dense></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6" class="py-2 pr-2">
                            <v-text-field :rules="rules.required" v-model="form.technical_name" label="Nom technique" dense></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6" class="pl-2">
                            <v-autocomplete
                                multiple
                                :items="themes"
                                v-model="form.themes_id"
                                :rules="rules.themeRequired"
                                item-value="id"
                                item-text="name"
                                clearable
                                dense
                                outlined
                                label="Thèmes"></v-autocomplete>
                        </v-col>
                        <div class="d-flex justify-space-between align-center">
                            <v-card-title class="px-0 mb-0 py-0 text_primary--text font-weight-bold">Propriétés</v-card-title>
                        </div>
                        <list-card-properties
                            ref="listProperties"
                            :dataProperties="dataProperties"
                            @handleReorder="handleReorder"
                            @insertItem="insertItem"
                            @clearPosition="clearPosition" />

                        <v-col>
                            <div class="mt-3 text-center">
                                <v-btn text small @click="addProperty" width="100%" height="45" class="ct_btn_add" color="primary">
                                    <v-icon class="px-5">mdi-plus</v-icon>Ajouter une propriété</v-btn
                                >
                            </div>
                        </v-col>
                        <v-col cols="12" md="12" class="pt-2">
                            <v-btn small height="45" :loading="isLoading" color="primary" width="100%" class="mb-2" @click="onCreate">
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
import { defineComponent } from 'vue';
import Attachments from '@/components/Attachments.vue';
import Quill from '@/components/Quill.vue';
import ListCardProperties from '@/modules/dashboard/place/category/action/ListCardProperties.vue';
import eventBus from '@/eventBus';
import IconFile from '@/components/IconFile.vue';
import themeServices from '@/apis/themeService/index';
import pictureServices from '@/apis/pictureService/index';
import categoryServices from '@/apis/categoryService/index';

import blockLeavePage from '@/mixins/blockLeavePage';

export default defineComponent({
    components: { Attachments, Quill, ListCardProperties, IconFile },
    name: 'CategoryCreateContainer',
    props: {},
    mixins: [blockLeavePage],
    data() {
        return {
            valid: true,
            isLoading: false,
            categorySelected: null,
            previewImgProp: null,
            previewPictoProp: null,
            rules: {
                required: [(v) => !!v || 'Données requises pour entrer'],
                themeRequired: [(v) => !!this.$utils.isEmptyArray(v) || 'Données requises pour entrer'],
            },

            themes: [],
            form: {
                name: null,
                technical_name: null,
                themes_id: [],
                resource_type: 'Place',
                picto_id: null,
                image_id: null,
            },
            dataProperties: [],
            properties: {
                name: null,
                technical_name: null,
                type: null,
                is_filter: true,
                visibility: 'Optional',
                position: 1,
            },
        };
    },
    watch: {},
    computed: {
        isFormUpdate() {
            return !!this.categorySelected;
        },
    },
    methods: {
        getForms() {
            return this.$refs.listProperties.$refs;
        },

        addProperty() {
            this.dataProperties.push({ id: uuidv4(), ...this.properties, position: this.dataProperties.length + 1 });
        },

        updateFormProperty(data) {
            const itemToUpdate = this.dataProperties.findIndex((el) => el.id === data.id);
            if (itemToUpdate > -1) this.dataProperties.splice(itemToUpdate, 1, data);
        },

        removeProperty(id) {
            if (id) {
                const itemToRemoveIndex = this.dataProperties.findIndex((el) => el.id === id);
                this.dataProperties.splice(itemToRemoveIndex, 1);
            }
        },
        toggleActiveProperty(id) {
            if (id) {
                this.dataProperties = this.dataProperties.map((e) => {
                    if (e.id === id)
                        return {
                            ...e,
                            is_filter: !e.is_filter,
                        };
                    return e;
                });
            }
        },

        updatePosition() {
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

        //Event
        onCreate() {
            let formProperty = true;
            Object.values(this.getForms()).forEach((property) => {
                if (property && !property.$refs.form.validate()) {
                    formProperty = false;
                }
            });

            if (this.$refs.form.validate() && formProperty) {
                this.isLoading = true;
                const payload = {
                    ...this.form,
                    properties: this.dataProperties.map(({ id, ...rest }) => rest),
                };
                if (this.categorySelected) {
                    // update
                    categoryServices.updateCategory(this.categorySelected.id, this.removeNullAttributes(payload)).then(() => {
                        this.$toast.success({
                            message: 'Nouvelle catégorie mise à jour avec succès !',
                        });
                        this.isLoading = false;
                        this.$router.push({ name: 'PlaceCategoryPage' });
                    });
                } else {
                    // create
                    categoryServices.addCategory(payload).then(() => {
                        this.$toast.success({
                            message: 'Nouvelle catégorie ajoutée avec succès !',
                        });
                        this.isLoading = false;
                        this.$router.push({ name: 'PlaceCategoryPage' });
                    });
                }
            }
        },
        removeNullAttributes(obj) {
            for (const key in obj) {
                if (obj[key] === null) {
                    delete obj[key];
                }
            }
            return obj;
        },
        //Upload
        uploadImage(file) {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                pictureServices.createPicture(formData).then((data) => {
                    this.form.image_id = data.id;
                });
            } else {
                this.form.image_id = null;
            }
        },
        uploadIcon(file) {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                pictureServices.createPicture(formData).then((data) => {
                    this.form.picto_id = data.id;
                });
            } else {
                this.form.image_id = null;
            }
        },
    },
    mounted() {
        if (!this.$route.params.id) {
            this.addProperty();
        }
    },
    created() {
        if (this.$route.params.id) {
            const id = this.$route.params.id;
            eventBus.$emit('isLoading');
            categoryServices
                .getCategoryById(id)
                .then((data) => {
                    if (data) {
                        this.categorySelected = data;
                        this.previewImgProp = this.categorySelected.image;
                        this.previewPictoProp = this.categorySelected.picto;
                        this.form = {
                            name: data.name,
                            technical_name: data.technical_name,
                            themes_id: data.themes.map((e) => e.id),
                            technical_name: data.technical_name,
                            resource_type: 'Place',
                        };
                        this.dataProperties = data.properties;
                        eventBus.$emit('isLoaded');
                    }
                })
                .catch(() => {
                    eventBus.$emit('isLoaded');
                });
        }
        themeServices.getThemes().then((themes) => {
            this.themes = themes;
        });
        eventBus.$on('removeProperty', this.removeProperty);
        eventBus.$on('toggleActiveProperty', this.toggleActiveProperty);
        eventBus.$on('updateFormProperty', this.updateFormProperty);
        eventBus.$on('updatePosition', this.updatePosition);
    },
    beforeDestroy() {
        eventBus.$off('removeProperty', this.removeProperty);
        eventBus.$off('toggleActiveProperty', this.toggleActiveProperty);
        eventBus.$off('updateFormProperty', this.updateFormProperty);
        eventBus.$off('updatePosition', this.updatePosition);
    },
});
</script>

<style lang="scss" scoped>
.ct_btn_add {
    border: 1px dashed rgb(192, 192, 192);
}

.form_container {
    position: absolute;
    max-width: 800px;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    top: 280px;
    padding: 10px;
}
</style>
