<template>
    <v-container>
        <cgu-container />
    </v-container>
</template>

<script>
import CguContainer from '@/modules/dashboard/parameter/cgu/CguContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CguContainer },
    name: 'CguPage',
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
