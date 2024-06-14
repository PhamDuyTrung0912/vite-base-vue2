<template>
    <v-container>
        <general-container />
    </v-container>
</template>

<script>
import GeneralContainer from '@/modules/dashboard/parameter/general/GeneralContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {GeneralContainer  },
    name: 'GeneralPage',
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
