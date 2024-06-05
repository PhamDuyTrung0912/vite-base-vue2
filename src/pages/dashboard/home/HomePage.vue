
<template>
    <v-container>
        <div id="tour-homepage-1" class="text-h4 mb-2">Home page</div>
        <v-row>
            <v-col cols="2">
                <v-card id="tour-homepage-2">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
                    <v-card-title id="tour-homepage-3"> Top western road trips </v-card-title>
                    <v-card-subtitle id="tour-homepage-4"> 1,000 miles of wonder </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import userService from '@/apis/userService/index';
import useDriver from '@/modules/Driver/driver';
import { defineComponent } from 'vue';
import { STEPS_TOUR_HOMEPAGE } from '@/modules/Driver/steps/stepsHomepage';

export default defineComponent({
    components: {},
    name: 'HomePage',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {
        useDriver(STEPS_TOUR_HOMEPAGE);
    },
    created() {
        userService.getUsers().then((res) => {
            console.log(res);
        });
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style> 

