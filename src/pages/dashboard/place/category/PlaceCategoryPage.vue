
<template>
    <v-container>
        <div>
            <place-category-container />
        </div>
    </v-container>
</template>

<script>
import PlaceCategoryContainer from '@/modules/dashboard/place/category/PlaceCategoryContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { PlaceCategoryContainer },
    name: 'PlaceCategoryPage',
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

<style lang="scss" scoped>
</style>
