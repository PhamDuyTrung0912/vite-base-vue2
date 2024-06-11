<template>
    <v-container> <place-create-container /> </v-container>
</template>

<script>
import PlaceCreateContainer from '@/modules/dashboard/place/list/action/PlaceCreateContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { PlaceCreateContainer },
    name: 'PlaceCreatePage',
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
