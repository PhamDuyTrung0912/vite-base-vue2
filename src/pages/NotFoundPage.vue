<template>
    <v-container fluid class="not_found_container">
        <v-card flat width="100%">
            <div class="four_zero_four_bg">
                <h1 class="text-center text-h1 font-weight-bold text_primary_darken--text">404</h1>
            </div>
            <div class="text-center">
                <h3 class="text-h6 text_primary--text">Look like you're lost</h3>
                <p class="text-h6 text_primary--text">the page you are looking for not avaible!</p>
                <v-btn color="green lighten-2 white--text pa-5" @click="onChangeRoute">Go to home</v-btn>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NotFoundPage',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        onChangeRoute() {
            this.$router.push({ name: 'HomePage' });
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.not_found_container {
    height: 100vh;
    display: flex;
    align-items: center;
}

.four_zero_four_bg {
    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
}
</style>

