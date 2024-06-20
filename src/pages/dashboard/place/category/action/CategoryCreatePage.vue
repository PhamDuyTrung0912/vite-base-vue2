<template>
    <v-container> <category-create-container /> </v-container>
</template>

<script>
import CategoryCreateContainer from '@/modules/dashboard/place/category/action/CategoryCreateContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CategoryCreateContainer },
    name: 'PlaceCreatePage',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {
        
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
