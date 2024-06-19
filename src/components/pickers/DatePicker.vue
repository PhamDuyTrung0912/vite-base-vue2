<template>
    <v-menu
        :disabled="readonly"
        :close-on-content-click="false"
        :readonly="readonly"
        min-width="auto"
        offset-y
        ref="menu1"
        transition="scale-transition"
        v-model="datePicker">
        <template v-slot:activator="{ on }">
            <v-text-field
                :label="label"
                style="font-size: 13px"
                color="primary"
                :clearable="clearable"
                :hide-details="hideDetails"
                :readonly="readonly || readonlyInput"
                :outlined="outlined"
                append-icon="mdi-calendar"
                v-on="on"
                :dark="filterMap"
                :disabled="disabled"
                @click:clear="clear"
                @click="handleClickInput"
                @blur="handleBlurInput"
                :dense="dense"
                :rules="rules ? [...rules, ...rules_date] : date_input ? [...rules_date] : []"
                v-model="date_input"
                placeholder="jj/mm/aaaa"
                @click:append="handleCalendarClick" />
        </template>
        <v-date-picker
            :first-day-of-week="1"
            :readonly="readonly"
            :min="minDateInput || min_date"
            :max="maxDateInput || max_date"
            @input="datePicker = false"
            :allowed-dates="disablePastDates"
            color="primary lighten-1"
            header-color="primary lighten-1"
            locale="fr-BE"
            no-title
            v-model="date_select" />
    </v-menu>
</template>

<script>
export default {
    name: 'DatePicker',
    props: {
        rules: {
            type: Array,
            default() {
                return null;
            },
        },
        dense: {
            default: true,
        },
        value: {
            default: null,
        },
        label: {
            default: 'Date',
        },
        readonly: {
            default: false,
        },
        readonlyInput: {
            default: false,
        },
        clearable: {
            default: true,
        },
        outlined: {
            default: true,
        },
        fillHeight: {
            default: true,
        },
        hideDetails: {
            default: false,
        },
        filterMap: {
            default: false,
        },
        disabled: {
            default: false,
        },
        allowedMonthPast: {
            type: Boolean,
            default: false,
        },
        allowedMonthFuture: {
            type: Boolean,
            default: false,
        },
        onlyPast: {
            type: Boolean,
            default: false,
        },
        onlyFuture: {
            type: Boolean,
            default: false,
        },
        valueDate: {
            type: String,
            default: null,
        },
        minDateInput: {
            type: String,
            default: null,
        },
        maxDateInput: {
            type: String,
            default: null,
        },
        fillDate: {
            type: String,
            default: null,
        },
        dateOffWeekly: {
            default: null,
        },
        backgroundColor: {
            default: 'white',
        },
    },
    data() {
        return {
            datePicker: null,
            date: null,

            date_select: null,
            date_input: null,

            date_current: new Date(),
            min_date: null,
            max_date: null,

            check: true,

            rules_date: [
                (v) => /^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\d{4}$/.test(v) || 'Le format doit obligatoirement être JJ/MM/AAAA',
            ],
        };
    },
    watch: {
        date_select() {
            this.date_input = this.$utils.getDate(this.date_select);
        },

        valueDate() {
            if (this.check) {
                const date = this.valueDate && this.formatDate(this.valueDate);
                if (/^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\d{4}$/.test(date)) {
                    this.check = false;
                    this.date_input = date;
                }
            }
        },

        fillDate: {
            immediate: true,
            handler() {
                if (this.fillDate) {
                    const date = this.formatDate(this.fillDate);
                    this.date_input = date;
                } else {
                    this.date_input = null;
                }
            },
        },

        date_input: {
            handler() {
                if (/^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\d{4}$/.test(this.date_input)) {
                    this.$emit('selectDate', this.parseDate(this.date_input));
                }
            },
        },

        allowedMonthFuture: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.min_date = new Date().toISOString().slice(0, 10);
                    this.max_date = new Date(this.date_current.getFullYear(), this.date_current.getMonth() + 1, this.date_current.getDate())
                        .toISOString()
                        .slice(0, 10);
                }
            },
        },

        onlyPast: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.max_date = new Date().toISOString().slice(0, 10);
                }
            },
        },

        onlyFuture: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.min_date = new Date().toISOString().slice(0, 10);
                }
            },
        },
        allowedMonthPast: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.max_date = new Date().toISOString().slice(0, 10);
                    this.min_date = new Date(this.date_current.getFullYear(), this.date_current.getMonth() - 1, this.date_current.getDate())
                        .toISOString()
                        .slice(0, 10);
                }
            },
        },
    },
    computed: {},
    methods: {
        handleClickInput() {
            this.$nextTick(() => {
                this.$refs.menu1.isActive = false;
            });
        },

        handleBlurInput() {
            if (this.date_input && /^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\d{4}$/.test(this.date_input)) {
                this.date_select = this.parseDate(this.date_input);
            }
        },
        handleCalendarClick() {
            this.$refs.menu1.isActive = true;
        },
        disablePastDates(date) {
            if (this.dateOffWeekly) {
                let check = true;
                this.dateOffWeekly.forEach((item) => {
                    if (new Date(date).getDay() === item) {
                        check = false;
                    }
                });
                return check;
            }
            return true;
        },

        clear() {
            this.$emit('clear');
        },
        reset() {
            this.date_input = null;
        },

        parseDate(date) {
            if (!date) return null;

            const [day, month, year] = date.split('/');
            if (day && month && year) {
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
            return null;
        },

        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
    },
};
</script>
