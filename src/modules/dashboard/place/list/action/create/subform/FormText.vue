<template>
    <v-textarea :label="name" :rules="rules" v-model="inputValue" dense class="" rows="4"></v-textarea>
</template>

<script>
export default {
    name: 'FormText',
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
                this.$emit('updateData', { id: this.id, value: value && value !== '' ? value : null });
            },
        },
    },

    created() {
        this.inputValue = this.value || null;
    },
};
</script>

<style></style>
