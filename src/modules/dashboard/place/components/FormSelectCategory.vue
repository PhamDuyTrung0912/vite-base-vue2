<template>
    <v-autocomplete
        :multiple="isMutiple"
        :rules="rules"
        clearable
        hide-details
        dense
        outlined
        label="Catégories"
        v-model="categories"
        :search-input.sync="keySearch"
        :items="dataCategories"
        item-text="name"
        @change="onChangeTheme"
        item-value="id"></v-autocomplete>
</template>

<script>
import { defineComponent } from 'vue';
import categoryService from '@/apis/categoryService';
import debounce from '@/utils/debounce';

export default defineComponent({
    name: 'FormSelectCategory',
    props: {
        isMutiple: {
            type: Boolean,
            default: false,
        },

        rules: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            keySearch: null,
            categories: [],
            dataCategories: [],
            limit: 10,
        };
    },
    watch: {
        keySearch: {
            immediate: false,
            handler: debounce(function () {
                this.getCategories();
            }, 500),
        },
    },
    computed: {},
    methods: {
        onChangeTheme(value) {
            this.keySearch = null;
            this.$emit('onSelectCategory', value);
        },
        getCategories() {
            const payload = {
                limit: this.limit,
                offset: 0,
                search: {
                    name: this.keySearch,
                },
            };
            categoryService
                .getCategoriesByFilter(payload)
                .then((data) => {
                    this.dataCategories = data.items;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    mounted() {},
    created() {
        this.getCategories();
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
