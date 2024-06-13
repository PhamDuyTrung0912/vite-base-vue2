<template>
    <v-container style="height: 100vh" class="d-flex align-center justify-center">
        <signin-container />
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import SigninContainer from '@/modules/auth/SigninContainer.vue';

export default defineComponent({
    components: { SigninContainer },
    name: 'SigninPage',
    props: {},
    data() {
        return {};
    },
    methods: {},
});
</script>

<style lang="scss" scoped></style>
