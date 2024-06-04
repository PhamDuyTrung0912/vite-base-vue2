<script>
import { defineComponent } from 'vue';
import Template from '@/components/Template';

export default defineComponent({
    name: 'App',
    components: { Template },
});
</script>

<template>
    <div>
        <div>hello world</div>
        <Template />
    </div>
</template>

<style>
</style>
