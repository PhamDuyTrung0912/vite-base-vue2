<template>
    <c-dialog title="Profile" :width="500" :show="show" @close="$emit('close')">
        <template slot="content">
            <v-form ref="form">
                <v-row no-gutters>
                    <v-col cols="6" class="pr-2">
                        <v-text-field dense label="First name" prepend-inner-icon="mdi-pencil"></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pl-2">
                        <v-text-field dense label="Last name" prepend-inner-icon="mdi-pencil"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field dense label="Phone" prepend-inner-icon="mdi-phone"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field dense label="Mail" prepend-inner-icon="mdi-email"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field dense label="Password" type="password" prepend-inner-icon="mdi-lock"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field dense label="Confirm Password" type="password" prepend-inner-icon="mdi-lock"></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </template>
    </c-dialog>
</template>

<script>
import CDialog from '@/components/dialog/CDialog.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CDialog },
    name: 'ProfileDialog',
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

