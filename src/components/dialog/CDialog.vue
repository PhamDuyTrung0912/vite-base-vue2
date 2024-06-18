<template>
    <v-dialog v-model="show" persistent :max-width="width">
        <v-card>
            <v-card-title v-if="!isHideTitle" class="text-h6 font-weight-bold text_primary--text"> {{ title }} </v-card-title>
            <slot name="header"></slot>
            <div class="px-6">
                <slot name="content"></slot>
            </div>
            <v-card-actions v-if="!isHideAction">
                <v-spacer></v-spacer>
                <v-btn width="80" small text @click="$emit('close')" class="text_primary--text font-weight-bold"> Cancel </v-btn>
                <v-btn width="80" small text @click="$emit('accept')" color="primary" class="font-weight-bold"> Oui </v-btn>
            </v-card-actions>
            <v-card-actions v-else>
                <slot name="action"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CDialog',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 350,
        },
        title: {
            type: String,
            default: 'Title',
        },
        isHideTitle: {
            type: Boolean,
            default: false,
        },
        isHideAction: {
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

