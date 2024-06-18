<template>
    <v-autocomplete
        multiple
        clearable
        hide-details
        dense
        outlined
        label="Catégories"
        v-model="categories"
        :search-input.sync="searchCategories"
        :items="dataCategories"
        item-text="name"
        item-value="id"
        @change="searchCategories = ''"></v-autocomplete>
</template>

<script>
import { defineComponent } from 'vue';
import categoryService from '@/apis/categoryService';

export default defineComponent({
    name: 'FormSelectCategory',
    props: {},
    data() {
        return {
            dataCategories: [],
            searchCategories: null,
            categories: [],
        };
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {
        categoryService
            .getCategories()
            .then((data) => {
                this.dataCategories = data;
            })
            .catch();
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>

