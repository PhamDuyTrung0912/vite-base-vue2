<template>
    <CDialog :show="show">
        <template slot="header"> <v-card-title class="text-h6"> Use Google's location service? </v-card-title> </template>
        <template slot="content">
            <v-card-text class="pb-0">Are you sure you want to delete this item ?</v-card-text>
        </template>
        <template slot="action">
            <v-spacer></v-spacer>
            <v-btn small text @click="$emit('close')"> Cancel </v-btn>
            <v-btn color="error" small text @click="$emit('accept')"> Oui </v-btn>
        </template>
    </CDialog>
</template>

<script>
import CDialog from '@/components/dialog/CDialog.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ConfirmCategoryDialog',
    components: { CDialog },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
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

