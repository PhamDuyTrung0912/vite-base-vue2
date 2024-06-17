<template>
    <div>
        <tutorial-container />
    </div>
</template>

<script>
import TutorialContainer from '@/modules/dashboard/parameter/tutorial/TutorialContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { TutorialContainer },
    name: 'TutorialPage',
    props: {},
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

<style lang="scss" scoped></style>
