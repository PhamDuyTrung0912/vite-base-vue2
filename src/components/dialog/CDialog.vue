<template>
    <v-dialog v-model="show" persistent max-width="350">
        <v-card>
            <slot name="header"></slot>
            <slot name="content"></slot>
            <v-card-actions>
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

