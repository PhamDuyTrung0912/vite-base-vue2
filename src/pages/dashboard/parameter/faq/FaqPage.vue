<template>
    <v-container>
        <faq-container />
    </v-container>
</template>

<script>
import FaqContainer from '@/modules/dashboard/parameter/faq/FaqContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { FaqContainer },
    name: 'FaqPage',
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

<style lang="scss" scoped>
</style>

