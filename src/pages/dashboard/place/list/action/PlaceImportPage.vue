<template>
    <v-container>
        <place-import-container />
    </v-container>
</template>

<script>
import PlaceImportContainer from '@/modules/dashboard/place/list/action/PlaceImportContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {PlaceImportContainer  },
    name: 'PlaceImportPage',
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
