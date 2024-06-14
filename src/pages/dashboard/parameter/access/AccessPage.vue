<template>
    <v-container>
        <access-container />
    </v-container>
</template>

<script>
import AccessContainer from '@/modules/dashboard/parameter/access/AccessContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { AccessContainer },
    name: 'AccessPage',
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

