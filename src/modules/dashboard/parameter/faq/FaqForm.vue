<template>
    <v-container fluid>
        <v-form ref="form" v-model="valid" >
            <v-row>
                <v-col cols="12">
                    <v-text-field :rules="rules.required" label="Titre" v-model="form.title" hide-details />
                </v-col>
                <v-col cols="12" class="pt-0">
                    <quill :valueProp="form.description" v-model="form.description" class="pt-2" height="500px" />
                </v-col>
            </v-row>
        </v-form>

        <v-btn :disabled="!valid" small height="44" :loading="loading" color="secondary" width="100%" class="my-2 mt-5" @click="save">
            <v-icon class="px-5">mdi-content-save</v-icon>
            Sauvegarder</v-btn
        >
    </v-container>
</template>

<script>
import Quill from '@/components/Quill.vue';
import eventBus from '@/eventBus';

export default {
    name: 'FaqForm',
    components: {
        Quill,
    },
    data() {
        return {
            loading: false,
            valid: true,
            rules: {
                required: [(v) => !!v || 'Données requises pour entrer'],
            },
            form: {
                title: null,
                description: null,
            },
        };
    },
    methods: {
        save() {
            const validate = this.$refs.form.validate();
            if (validate) {
                eventBus.$emit('updateFormDataAsset', this.form);
            }
        },
    },
    created() {},
};
</script>
