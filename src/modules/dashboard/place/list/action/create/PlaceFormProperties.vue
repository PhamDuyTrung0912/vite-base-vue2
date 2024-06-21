<template>
    <div class="my-3 mt-5">
        <v-row>
            <v-col class="py-0" cols="12" v-for="(property, index) in properties" :key="index">
                <div class="py-2">
                    <component
                        :rules="property.visibility === 'Required' ? [(v) => !!v] : []"
                        @updateData="updateDataRecord"
                        :name="property.name"
                        :id="property.id"
                        :is="setComponentByType(property.type)" />
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

// Form
const FormBool = () => import('@/modules/dashboard/place/list/action/create/subform/FormBool.vue');
const FormDate = () => import('@/modules/dashboard/place/list/action/create/subform/FormDate.vue');
const FormDateTime = () => import('@/modules/dashboard/place/list/action/create/subform/FormDateTime.vue');
const FormInteger = () => import('@/modules/dashboard/place/list/action/create/subform/FormInteger.vue');
const FormFloat = () => import('@/modules/dashboard/place/list/action/create/subform/FormFloat.vue');
const FormText = () => import('@/modules/dashboard/place/list/action/create/subform/FormText.vue');
const FormString = () => import('@/modules/dashboard/place/list/action/create/subform/FormString.vue');

export default defineComponent({
    name: 'PlaceFormProperties',
    components: {
        FormBool,
        FormDate,
        FormDateTime,
        FormInteger,
        FormFloat,
        FormText,
        FormString,
    },
    props: {
        propertiesProps: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            properties: [],
            propertiesValues: [],
        };
    },
    watch: {},
    computed: {},
    methods: {
        checkValidate(array) {
            let validCheck = true;
            array.forEach((element) => {
                if (element.visibility === 'Required' && (!element.value || element.value === '')) validCheck = false;
            });
            return validCheck;
        },
        updateDataRecord(data) {
            this.propertiesValues = this.propertiesValues.map((e) => {
                if (e.id === data.id) {
                    return {
                        ...e,
                        ...data,
                    };
                }
                return e;
            });
            const check = this.checkValidate(this.propertiesValues);
            const dataProperties = {
                validCheck: check,
                data: this.propertiesValues,
            };
            this.$emit('updateDataProperties', dataProperties);
        },
        setComponentByType(type) {
            if (type === 'text') {
                return FormText;
            }
            if (type === 'integer') {
                return FormInteger;
            }
            if (type === 'double') {
                return FormFloat;
            }
            if (type === 'boolean') {
                return FormBool;
            }
            if (type === 'date') {
                return FormDate;
            }
            if (type === 'datetime') {
                return FormDateTime;
            }
            if (type === 'string') {
                return FormString;
            }

            return FormString;
        },
    },
    mounted() {},
    created() {
        this.properties = [...this.propertiesProps];
        this.propertiesValues = this.properties.map((e) => ({
            id: e.id,
            value: null,
            visibility: e.visibility,
        }));
    },
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
