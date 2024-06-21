<template>
    <v-app>
        <router-view></router-view>
        <loader />
    </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import Loader from '@/modules/loader/Loader.vue';
import eventBus from '@/eventBus';
import debounce from '@/utils/debounce';

export default defineComponent({
    name: 'App',
    components: { Loader },
    methods: {
        onResetToken() {
            this.debounceResetToken();
        },
        resetToken() {
            if (this.$cookies.isKey('token')) {
                this.$cookies.remove('token');
            }
            this.$toast.error({ message: 'Your login password has expired, please log in again !' });
            this.$router.push({ name: 'SigninPage' });
        },
    },
    created() {
        this.debounceResetToken = debounce((event) => {
            this.resetToken();
        }, 500);
        eventBus.$on('onUnauthorized', this.onResetToken);
    },
    beforeDestroy() {
        eventBus.$off('onUnauthorized', this.onResetToken);
    },
});
</script>

<style lang="scss">
</style>
;
