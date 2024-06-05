
<template>
    <v-container>
        <div class="text-h4" @click="showToast">Home page</div>
        <v-card max-width="600" max-height="600" class="overflow-auto" tile>
            <v-list-item v-for="(user, index) in users" :key="index">
                <v-list-item-content>
                    <v-list-item-title>{{ user.firstName }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-container>
</template>

<script>
import Toast from '@/modules/Toast/Toast.vue';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
    components: { Toast },
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

        showToast() {
            this.$toast.warning({
                message: 'Add item success !!',
            });
        },
    },
    mounted() {},
    created() {
        this['users/setUsers']();
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style> 

