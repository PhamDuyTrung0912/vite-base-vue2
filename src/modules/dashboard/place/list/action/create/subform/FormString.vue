<template>
    <v-text-field :label="name" :rules="rules" v-model="inputValue" dense></v-text-field>
</template>

<script>
export default {
    name: 'FormString',
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
