<template>
    <div style="position: relative">
        <attachments @upload="uploadAttachments" height="400px" />
        <div class="form_container">
            <v-card class="pa-6" elevation="3" rounded="lg">
                <v-row no-gutters>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="form.name" label="Nom du lieu" dense></v-text-field>
                    </v-col>
                    <v-col class="py-2">
                        <v-autocomplete
                            multiple
                            :items="dataThemes"
                            v-model="form.themes"
                            :search-input.sync="searchThemes"
                            clearable
                            hide-details
                            dense
                            outlined
                            label="Catégorie"></v-autocomplete>
                    </v-col>
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
                    <v-col cols="12" class="py-2">
                        <place-form-properties />
                    </v-col>
                    <v-col cols="12" md="12" class="pt-2">
                        <v-btn small height="45" color="primary" width="100%">
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
import Attachments from '@/components/Attachments.vue';
import Quill from '@/components/Quill.vue';
import MapContainer from '@/modules/map/MapContainer.vue';
import { defineComponent } from 'vue';
import mapActionsHandler from '@/modules/map/mixins/mapActionsHandler';
import PlaceFormProperties from '@/modules/dashboard/place/list/action/create/PlaceFormProperties.vue';

export default defineComponent({
    components: { Attachments, MapContainer, Quill, PlaceFormProperties },
    name: 'PlaceCreateContainer',
    mixins: [mapActionsHandler],
    props: {},
    data() {
        return {
            loading: false,
            searchThemes: null,
            dataThemes: [],
            form: {
                name: null,
                description: null,
                isAccess: true,
                themes: [],
            },
        };
    },
    watch: {},
    computed: {},
    methods: {
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
    mounted() {
        this.handleAddPoint('place-map');
    },
    created() {},
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
