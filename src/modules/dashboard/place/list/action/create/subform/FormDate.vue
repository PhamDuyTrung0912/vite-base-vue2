<template>
    <v-row>
        <v-col cols="12" class="">
            <date-picker
                :outlined="false"
                :label="name"
                :rules="getRules"
                @clear="date = null"
                :fillDate="date"
                @selectDate="(val) => (date = val)"
                dense
                :hideDetails="false">
            </date-picker>
        </v-col>
    </v-row>
</template>

<script>
import DatePicker from '@/components/pickers/DatePicker.vue';

export default {
    name: 'FormDate',
    components: { DatePicker },
    props: {
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
    data() {
        return {
            date: null,
            type: 'date',
        };
    },
    computed: {
        getNameAttr() {
            return this.name;
        },
        getRules() {
            if (this.$utils.isEmptyArray(this.rules)) {
                return this.rules;
            }
            return null;
        },
    },
    watch: {
        date: {
            handler(value) {
                this.$emit('updateData', { [this.getNameAttr]: value });
            },
        },
    },
    mounted() {},

    created() {
        const regex = /^(?:(?:\d{1,2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})|)$/;
        if (this.value && regex.test(this.value)) this.date = this.value || null;
    },
};
</script>

<style scoped></style>
