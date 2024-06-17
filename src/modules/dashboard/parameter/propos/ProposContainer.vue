<template>
    <v-container fluid class="pa-0">
        <quill :valueProp="description" v-model="description" class="pt-2" height="500px" />
        <v-btn small height="44" :loading="loading" color="secondary" width="100%" class="my-2 mt-5" @click="save">
            <v-icon class="px-5">mdi-content-save</v-icon>
            Sauvegarder</v-btn
        >
    </v-container>
</template>

<script>
import Quill from '@/components/Quill.vue';

export default {
    name: 'ProposContainer',
    components: {
        Quill,
    },
    data() {
        return {
            loading: false,
            description: null,
        };
    },
    methods: {
        save() {},
    },
    created() {},
};
</script>
