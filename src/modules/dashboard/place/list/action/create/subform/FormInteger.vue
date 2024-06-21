<template>
    <v-text-field
        :label="name"
        :rules="rules"
        @keydown="(event) => preventNonNumericalInput(event)"
        v-model="inputValue"
        type="number"
        hide-details
        dense></v-text-field>
</template>

<script>
export default {
    name: 'FormNumberInterge',
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
                this.$emit('updateData', { id: this.id, value: value ? parseInt(value) : null });
            },
        },
    },

    methods: {
        preventNonNumericalInput(evt) {
            const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', '-'];
            const keyPressed = evt.key;

            if (!keysAllowed.includes(keyPressed)) {
                evt.preventDefault();
            }
        },
    },
    created() {
        this.inputValue = this.value || null;
    },
};
</script>

<style></style>
