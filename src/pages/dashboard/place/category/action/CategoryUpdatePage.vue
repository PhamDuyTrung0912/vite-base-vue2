<template>
    <v-container> <category-update-container /> </v-container>
</template>

<script>
import CategoryUpdateContainer from '@/modules/dashboard/place/category/action/CategoryUpdateContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CategoryUpdateContainer },
    name: 'CategoryUpdatePage',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
