<template>
    <div style="position: relative">
        <attachments @upload="uploadAttachments" height="400px" />
        <div class="d-flex justify-center">
            <v-card class="pa-5 my-10" rounded="xxl" style="position: absolute; width: 80%; top: 240px">
                <v-container>
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
                                placeholder="Aires de jeux"></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" class="py-5">
                            <v-card height="350px">
                                <map-container mapId="place-map" />
                            </v-card>
                        </v-col>
                        <v-col cols="12" class="pt-2">
                            <quill :value="form.description" @input="(e) => debounceSearch(e, 'description')" class="mb-3" height="120px" />
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="form.name" label="Age minimum" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="form.name" label="Age maximum" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" class="">
                            <v-switch v-model="form.isAccess" label="Accessibilité PMR"></v-switch>
                        </v-col>
                        <v-col cols="12" md="8">
                            <v-text-field v-model="form.name" label="Rue" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" class="pl-5">
                            <v-text-field v-model="form.name" label="Numéro" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="pr-2 py-2">
                            <v-autocomplete
                                multiple
                                :items="dataThemes"
                                v-model="form.themes"
                                :search-input.sync="searchThemes"
                                clearable
                                hide-details
                                dense
                                outlined
                                placeholder="Commune"></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="6" class="pl-2 py-2">
                            <v-autocomplete
                                multiple
                                :items="dataThemes"
                                v-model="form.themes"
                                :search-input.sync="searchThemes"
                                clearable
                                hide-details
                                dense
                                outlined
                                placeholder="Village"></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" class="pt-1">
                            <v-text-field v-model="form.name" label="Site web" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="form.name" label="Source de données" dense></v-text-field>
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
import Attachments from '@/components/Attachments.vue';
import Quill from '@/components/Quill.vue';
import MapContainer from '@/modules/map/MapContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { Attachments, MapContainer, Quill },
    name: 'PlaceCreateContainer',
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
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>