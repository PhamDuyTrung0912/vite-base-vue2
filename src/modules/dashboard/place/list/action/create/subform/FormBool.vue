<template>
    <v-switch :label="name" class="pa-0 ma-0" hide-details v-model="inputValue" :value="value" @change="(val) => $emit('updateData', { [getNameAttr]: val })" />
</template>

<script>
export default {
    name: 'FormSelectBool',
    props: {
        name: {
            type: String,
            require: true,
            default: 'default',
        },
        value: {},
    },
    computed: {
        getNameAttr() {
            return this.name;
        },
    },
    data() {
        return {
            inputValue: false,
        };
    },
    created() {
        this.inputValue = this.value || false;
        this.$emit('updateData', { [this.getNameAttr]: this.inputValue });
    },
};
</script>

<style>
</style>