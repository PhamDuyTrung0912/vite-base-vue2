<template>
    <v-autocomplete
        multiple
        clearable
        hide-details
        dense
        outlined
        label="Thèmes"
        :search-input.sync="keySearch"
        :items="dataThemes"
        item-text="name"
        item-value="id"
        @change="onChangeTheme"
        v-model="themes"></v-autocomplete>
</template>
  
  <script>
import { defineComponent } from 'vue';
import themeService from '@/apis/themeService/index';
import debounce from '@/utils/debounce';

export default defineComponent({
    name: 'FormSelectTheme',
    data() {
        return {
            keySearch: null,
            themes: [],
            dataThemes: [],
            limit: 10,
        };
    },
    watch: {
        keySearch: {
            immediate: false,
            handler: debounce(function () {
                this.getThemes();
            }, 500),
        },
    },
    methods: {
        onChangeTheme(value) {
            this.keySearch = null;
            this.$emit('onSelectTheme', value);
        },

        getThemes() {
            const payload = {
                limit: this.limit,
                offset: 0,
                search: {
                    name: this.keySearch,
                },
            };
            themeService
                .getThemesByFilter(payload)
                .then((data) => {
                    this.dataThemes = data.items;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    created() {
        this.getThemes();
    },
});
</script>
  
  <style lang="scss" scoped>
</style>
  