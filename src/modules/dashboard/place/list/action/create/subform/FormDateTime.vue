<template>
    <v-row>
        <v-col cols="6">
            <date-picker :rules="getRules" @clear="clearForm" :fillDate="form.date" @selectDate="(val) => (form.date = val)" dense hideDetails>
            </date-picker>
        </v-col>
        <v-col cols="3">
            <v-autocomplete hide-details="true" suffix="h" v-model="form.hour" placeholder="Hour" outlined dense :items="itemHours"></v-autocomplete>
        </v-col>
        <v-col cols="3">
            <v-autocomplete
                hide-details="true"
                suffix="m"
                v-model="form.minutes"
                placeholder="Minutes"
                outlined
                dense
                :items="itemMinutes"></v-autocomplete>
        </v-col>
    </v-row>
</template>

<script>
import DatePicker from '../../../pickers/DatePicker.vue';

export default {
    name: 'FormDateTime',
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
            form: {
                date: null,
                hour: '00',
                minutes: '00',
            },

            itemHours: [],
            itemMinutes: [],
        };
    },
    computed: {
        getNameAttr() {
            return this.name;
        },
        getRules() {
            if (this.$utils.validArrayNotEmpty(this.rules)) {
                return this.rules;
            }
            return null;
        },
    },
    watch: {
        form: {
            deep: true,
            handler(value) {
                if (value.date) {
                    const datetime = `${value.date} ${value.hour}:${value.minutes}`;
                    this.$emit('updateData', { [this.getNameAttr]: datetime });
                } else {
                    this.$emit('updateData', { [this.getNameAttr]: null });
                }
            },
        },
    },
    methods: {
        clearForm() {
            this.form = {
                date: null,
                hour: '00',
                minutes: '00',
            };
        },
        generateItemHour() {
            const hourArray = [];
            for (let i = 0; i < 24; i++) {
                hourArray.push(`0${i}`.slice(-2));
            }

            this.itemHours = hourArray;
        },
        generateItemMinutes() {
            const hourArray = [];
            for (let i = 0; i < 60; i++) {
                hourArray.push(`0${i}`.slice(-2));
            }
            this.itemMinutes = hourArray;
        },
    },
    mounted() {
        const regex = /^(?:(?:\d{1,2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})(?: (?:\d{1,2}:\d{2}|\d{2}:\d{2}:\d{2}))?|)$/;
        if (this.value && regex.test(this.value)) {
            const dateParts = this.value.split(' ')[0];
            let hour = '00';
            let minutes = '00';
            const timeParts = this.value.split(' ')[1] || null;
            if (timeParts) {
                const timeComponents = timeParts.split(':');
                hour = timeComponents[0];
                minutes = timeComponents[1];
            }

            this.form = {
                date: dateParts,
                hour,
                minutes,
            };
        }
    },
    created() {
        this.generateItemHour();
        this.generateItemMinutes();
    },
};
</script>

<style scoped></style>
