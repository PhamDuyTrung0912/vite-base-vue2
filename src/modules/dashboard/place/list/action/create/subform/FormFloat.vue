<template>
    <v-text-field :rules="rules" v-model="inputValue" type="number" dense :label="name"></v-text-field>
</template>

<script>
export default {
    name: 'FormNumberFloat',
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
        value: {},
        rules: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        getNameAttr() {
            return this.name;
        },
    },

    data() {
        return {
            inputValue: null,
        };
    },

    watch: {
        inputValue: {
            handler(value) {
                this.$emit('updateData', { id: this.id, value: value ? parseFloat(value) : null });
            },
        },
    },
    created() {
        this.inputValue = this.value || null;
    },
};
</script>

<style></style>
