<template>
    <v-container style="height: 100vh" class="d-flex align-center justify-center">
        <signup-container />
    </v-container>
</template>

<script>
import SignupContainer from '@/modules/auth/SignupContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { SignupContainer },
    name: 'SignupPage',
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

