<template>
    <v-autocomplete multiple outlined dense hide-details v-model="form.status" :items="statusItems" :label="label" small-chips deletable-chips>
        <template v-slot:selection="{ item, index }">
            <div v-if="$vuetify.breakpoint.xl">
                <v-chip v-if="index < 2">
                    <span>{{ item.text }}</span>
                </v-chip>
                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                    <span v-if="form.status.length - 2 === 1"> (+{{ form.status.length - 2 }} autre) </span>
                    <span v-else> (+{{ form.status.length - 2 }} autres) </span>
                </span>
            </div>
            <div v-else>
                <v-chip v-if="index < 1">
                    <span>{{ item.text }}</span>
                </v-chip>
                <span v-if="index === 1" class="text-grey text-caption align-self-center">
                    <span v-if="form.status.length - 1 === 1"> (+ 1 autre) </span>
                    <span v-else> (+{{ form.status.length - 1 }} autres) </span>
                </span>
            </div>
        </template>
    </v-autocomplete>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Template',
    props: {
        items: {
            require: true,
            default: () => []
        },
        rules: {
            required: false
        },
        dense: {
            default: false
        },
        value: {
            default: null
        },
        label: {
            default: "Input"
        },
        readonly: {
            default: false
        },
        clearable: {
            default: true
        },
        outlined: {
            default: true
        },
        fillHeight: {
            default: true
        },
        hideDetails: {
            default: false
        },
        filterMap: {
            default: false
        },
        disabled: {
            default: false
        },
        dataThrough: {
            default: null
        }
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

<style lang="scss" scoped></style>
