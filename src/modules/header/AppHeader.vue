<template>
    <v-app-bar fixed elevation="1">
        <v-spacer></v-spacer>
        <v-btn icon @click="handleLogout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppHeader',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        ...mapMutations(['mutateToken']),
        handleLogout() {
            this.mutateToken(null);
            if (localStorage.getItem(import.meta.env.VITE_APP_STORAGE)) {
                localStorage.removeItem(import.meta.env.VITE_APP_STORAGE);
            }
            this.$router.push({ name: 'SigninPage' });
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>
