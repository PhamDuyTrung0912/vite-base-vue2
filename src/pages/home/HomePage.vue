<script>
import { defineComponent } from 'vue';

import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
    name: 'HomePage',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {
        ...mapGetters(['users/getUsers']),
        users() {
            return this['users/getUsers'];
        },
    },
    methods: {
        ...mapActions(['users/setUsers']),
    },
    mounted() {},
    created() {
        console.log('vuetify', this.$vuetify);
        console.log('router', this.$router);
        console.log('store', this.$store);
        console.log('toast', this.$toast);
        this.$toast.open({
            message: 'Welcome to D2d3!',
            position: 'top-right',
        });
        this['users/setUsers']();
    },
    beforeDestroy() {},
});
</script>

<template>
    <v-container>
        <div class="text-h4">Home page</div>
        <v-card max-width="600" max-height="600" class="overflow-auto" tile>
            <v-list-item v-for="(user, index) in users" :key="index">
                <v-list-item-content>
                    <v-list-item-title>{{ user.firstName }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-container>
</template>

<style scoped></style>
