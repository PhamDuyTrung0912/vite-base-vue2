<template>
    <c-dialog title="Confirm" :show="show" @close="$emit('close')" @accept="$emit('accept')">
        <template slot="content">
            <v-card-text class="py-0 px-0">Are you sure you want to delete this item ?</v-card-text>
        </template>
    </c-dialog>
</template>

<script>
import CDialog from '@/components/dialog/CDialog.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ConfirmCategoryDialog',
    components: { CDialog },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
</style>

