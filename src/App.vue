<script>
import { defineComponent } from 'vue';
import Template from '@/components/Template.vue';

export default defineComponent({
    name: 'App',
    components: { Template },
});
</script>

<template>
    <div>
        <div class="container">
            <div class="text">Hello</div>
        </div>
        <Template></Template>
    </div>
</template>

<style lang="scss" scoped>
.container {
    font-family: Arial, sans-serif;
    background-color: $primary-color;
    .text {
        color: red;
    }
}
</style>
