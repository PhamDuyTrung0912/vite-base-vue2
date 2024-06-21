<template>
    <c-dialog title="Confirm" :show="show" @close="$emit('close')" @accept="$emit('accept')">
        <template slot="content">
            <v-card-text class="py-0 px-0">Etes-vous sûr de vouloir quitter, vous perdrez les données que vous avez saisies ?</v-card-text>
        </template>
    </c-dialog>
</template>

<script>
import CDialog from '@/components/dialog/CDialog.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ConfirmLeaveDialog',
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

