<template>
    <v-switch
        :rules="rules"
        :label="name"
        class="pa-0 ma-0"
        hide-details
        v-model="inputValue"
        :value="value"
        @change="(val) => $emit('updateData', { id: this.id, value: val })" />
</template>

<script>
export default {
    name: 'FormSelectBool',
    props: {
        id: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
            default: 'default',
        },
        rules: {
            type: Array,
            default: () => [],
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
        this.$emit('updateData', { id: this.id, value: this.inputValue });
    },
};
</script>

<style></style>
