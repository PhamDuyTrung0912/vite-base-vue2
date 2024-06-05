
<template>
    <v-container>
        <div class="text-h4 mb-2">Home page</div>
        <v-row>
            <v-col cols="2">
                <v-card>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
                    <v-card-title> Top western road trips </v-card-title>
                    <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import userService from '@/apis/userService/index';
import { defineComponent } from 'vue';

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
    mounted() {},
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

