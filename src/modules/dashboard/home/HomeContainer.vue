<template>
    <div>
        <home-action />
        <home-activities />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import HomeAction from './HomeAction.vue';
import HomeActivities from './HomeActivities.vue';

export default defineComponent({
    components: { HomeAction, HomeActivities },
    name: 'HomeContainer',
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
