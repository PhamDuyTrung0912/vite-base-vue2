<template>
    <div>
        <category-create-container />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import CategoryCreateContainer from '@/modules/dashboard/place/category/action/CategoryCreateContainer.vue';

export default defineComponent({
    components: { CategoryCreateContainer },
    name: 'CategoryUpdateContainer',
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

<style lang="scss" scoped>
.ct_btn_add {
    border: 1px dashed rgb(192, 192, 192);
}

.form_container {
    position: absolute;
    max-width: 800px;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    top: 280px;
    padding: 10px;
}
</style>
