<template>
    <div style="position: relative">
        <attachments @upload="uploadImage" height="400px" />
        <div class="form_container">
            <v-card class="pa-6" elevation="3" rounded="lg">
                <v-form v-model="valid" ref="form">
                    <v-row no-gutters>
                        <v-col cols="12" md="12">
                            <v-text-field :rules="rules.required" v-model="form.name" label="Nom du lieu" dense></v-text-field>
                        </v-col>
                        <v-col class="py-2">
                            <v-autocomplete
                                :rules="rules.required"
                                item-text="name"
                                item-value="id"
                                v-model="form.category_id"
                                clearable
                                hide-details
                                dense
                                outlined
                                :search-input.sync="keySearch"
                                :items="dataCategories"
                                @change="onChangeTheme"
                                label="Catégorie"></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-form>
                <v-row>
                    <v-col cols="12" md="12" class="pt-5">
                        <v-card height="350px">
                            <v-btn
                                absolute
                                top
                                right
                                style="z-index: 10"
                                x-small
                                height="35"
                                @click="reloadFeature"
                                elevation="0"
                                class="rounded-md"
                                color="draft"
                                ><v-icon color="primary" size="20">mdi-reload</v-icon></v-btn
                            >
                            <map-container ref="refMap" :isShowTile="false" mapId="place-map" />
                        </v-card>
                    </v-col>
                    <v-col cols="12" class="py-2" v-if="categorySelected">
                        <place-form-properties @updateDataProperties="updateDataProperties" :propertiesProps="categorySelected.properties" />
                    </v-col>
                    <v-col cols="12" md="12" class="pt-2">
                        <v-btn @click="save" :loading="isLoading" :disabled="!validForm" small height="45" color="primary" width="100%">
                            <v-icon class="px-5">mdi-content-save</v-icon>
                            Sauvegarder</v-btn
                        >
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import categoryServices from '@/apis/categoryService/index';
import pictureServices from '@/apis/pictureService/index';
import placeServices from '@/apis/placeService/index';
import debounce from '@/utils/debounce';
import Attachments from '@/components/Attachments.vue';
import Quill from '@/components/Quill.vue';
import MapContainer from '@/modules/map/MapContainer.vue';
import mapActionsHandler from '@/modules/map/mixins/mapActionsHandler';
import PlaceFormProperties from '@/modules/dashboard/place/list/action/create/PlaceFormProperties.vue';

export default defineComponent({
    components: { Attachments, MapContainer, Quill, PlaceFormProperties },
    name: 'PlaceCreateContainer',
    mixins: [mapActionsHandler],
    props: {},
    data() {
        return {
            rules: {
                required: [(v) => !!v || 'Données requises pour entrer'],
            },
            valid: true,
            isLoading: false,
            validCoordinates: false,
            validPropertes: true,
            keySearch: null,
            loading: false,
            searchCategories: null,
            dataCategories: [],
            categorySelected: null,
            form: {
                name: null,
                category_id: null,
                picture_id: null,
                status: 'Draft',
            },
            propertyValues: [],
        };
    },
    watch: {
        keySearch: {
            immediate: false,
            handler: debounce(function () {
                this.getCategories();
            }, 500),
        },
        coordinates: {
            immediate: false,
            handler(value) {
                if (value) {
                    this.validCoordinates = true;
                } else this.validCoordinates = false;
            },
        },
    },
    computed: {
        validForm() {
            return this.valid && this.validPropertes && this.validCoordinates;
        },
    },
    methods: {
        //Upload
        uploadImage(file) {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                pictureServices.createPicture(formData).then((data) => {
                    this.form.picture_id = data.id;
                });
            } else {
                this.form.picture_id = null;
            }
        },
        updateDataProperties(dataForm) {
            this.validPropertes = dataForm.validCheck;
            this.propertyValues = dataForm.data;
        },
        onChangeTheme(value) {
            this.keySearch = null;
            if (value) {
                categoryServices
                    .getCategoryById(value)
                    .then((data) => {
                        this.categorySelected = data;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.categorySelected = null;
            }
        },
        getCategories() {
            const payload = {
                limit: this.limit,
                offset: 0,
                search: {
                    name: this.keySearch,
                },
            };
            categoryServices
                .getCategoriesByFilter(payload)
                .then((data) => {
                    this.dataCategories = data.items;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        save() {
            this.isLoading = true;
            const payload = {
                ...this.form,
                coordinates: this.coordinates,
                property_values: this.propertyValues.map((e) => ({
                    property_id: e.id,
                    value: e.value,
                })),
            };
            placeServices.addPlace(payload).then(() => {
                this.$toast.success({
                    message: 'Nouvelle catégorie ajoutée avec succès !',
                });
                this.isLoading = false;
                this.$router.push({ name: 'PlaceCreatePage' });
            });
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
    mounted() {
        this.handleAddPoint('place-map');
    },
    created() {
        this.getCategories();
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
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
