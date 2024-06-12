<template>
    <v-card-text class="text-subtitle-2 py-1 text-decoration-underline breadcrum_container"
        >Lieux <v-icon>mdi-chevron-right</v-icon> Liste</v-card-text
    >
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CBreadcrumb',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {
        console.log(this.$route);
    },
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.breadcrum_container {
    cursor: pointer;
}
</style>

