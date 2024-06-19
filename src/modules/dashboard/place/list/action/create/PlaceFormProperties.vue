<template>
    <div class="my-3 mt-5">
        <v-row>
            <v-col class="py-0" cols="12" v-for="(property, index) in properties" :key="index">
                <div class="py-1">
                    <component :name="property.name" :is="setComponentByType(property.type)" />
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

export default defineComponent({
    name: 'PlaceFormProperties',
    components: {
        FormBool,
        FormDate,
        FormDateTime,
        FormInteger,
        FormFloat,
        FormText,
    },
    props: {},
    data() {
        return {
            properties: [
                {
                    uid: '14ab5d60-903e-4224-95c0-e0a1b47f485b',
                    name: 'Property 1',
                    technical_name: 'p1',
                    type: 'text',
                    is_filter: true,
                    visibility: 'Optional',
                    position: 1,
                },
                {
                    uid: '1b7c3b31-70d6-4ef4-b069-f9f24899c142',
                    name: 'Property 2',
                    technical_name: 'p2',
                    type: 'double',
                    is_filter: true,
                    visibility: 'Mandatory',
                    position: 2,
                },
                {
                    uid: 'd7ca5483-2ce5-4926-a92d-17a3a40bb4de',
                    name: 'Property 3',
                    technical_name: 'p3',
                    type: 'boolean',
                    is_filter: false,
                    visibility: 'Optional',
                    position: 3,
                },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
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

            return FormText;
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>

