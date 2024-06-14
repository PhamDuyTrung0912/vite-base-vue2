<template>
    <v-container>
        <propos-container />
    </v-container>
</template>

<script>
import ProposContainer from '@/modules/dashboard/parameter/propos/ProposContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { ProposContainer },
    name: 'ProposPage',
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
