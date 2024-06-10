<template>
    <div>
        <place-list-container />
    </div>
</template>

<script>
import PlaceListContainer from '@/modules/dashboard/place/list/PlaceListContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { PlaceListContainer },
    name: 'PlaceListPage',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {
        console.log('create.places');
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
