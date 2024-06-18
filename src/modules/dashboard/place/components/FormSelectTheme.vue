<template>
    <v-autocomplete
        multiple
        clearable
        hide-details
        dense
        outlined
        label="Thèmes"
        v-model="themes"
        :search-input.sync="searchThemes"
        :items="dataThemes"
        item-text="name"
        item-value="id"
        @change="searchThemes = ''"></v-autocomplete>
</template>

<script>
import { defineComponent } from 'vue';
import themeService from '@/apis/themeService/index';

export default defineComponent({
    name: 'FormSelectTheme',
    props: {},
    data() {
        return {
            dataThemes: [],
            searchThemes: null,
            themes: [],
        };
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {
        themeService
            .getThemes()
            .then((data) => {
                this.dataThemes = data;
            })
            .catch();
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>

