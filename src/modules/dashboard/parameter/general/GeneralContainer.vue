<template>
    <div>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters>
                <v-col cols="12" class="py-1">
                    <v-text-field v-model="form.email" label="Email de contact" dense></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                    <v-text-field v-model="form.nameMax" label="Nombre maximum de favoris à l’écran" dense></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                    <v-text-field v-model="form.numberPin" label="Nombre de punaises sur la carte" dense></v-text-field>
                </v-col>
                <v-col cols="6" class="pr-2 py-1">
                    <v-text-field v-model="form.zoomMin" label="Zoom minimum" dense></v-text-field>
                </v-col>
                <v-col cols="6" class="pl-2 py-1">
                    <v-text-field v-model="form.zoomMax" label="Zoom maximum" dense></v-text-field>
                </v-col>
            </v-row>
        </v-form>
        <div>
            <general-history :histories="histories" />
        </div>
        <v-btn small height="44" :loading="loading" color="secondary" width="100%" class="my-2" @click="save">
            <v-icon class="px-5">mdi-content-save</v-icon>
            Sauvegarder</v-btn
        >
        <v-btn small height="44" :loading="loading" color="color_under_investigation" width="100%" class="my-2" @click="save">
            <v-icon class="px-5" color="white">mdi-reload</v-icon>

            <span class="white--text"> Ré-indexation </span>
        </v-btn>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import GeneralHistory from './GeneralHistory.vue';

export default defineComponent({
    components: { GeneralHistory },
    name: 'GeneralContainer',
    props: {},
    data() {
        return {
            loading: false,
            valid: true,
            form: {
                email: null,
                nameMax: null,
                numberPin: null,
                zoomMin: null,
                zoomMax: null,
            },
            histories: [
                {
                    id: 1,
                    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                },
                {
                    id: 2,
                    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        save() {
            if (this.$refs.form.validate()) {
                console.log('log.form', this.form);
            }
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
