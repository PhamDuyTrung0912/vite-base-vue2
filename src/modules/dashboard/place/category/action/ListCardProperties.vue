<template>
    <v-container class="pa-0" fluid>
        <drop-list
            class="list1"
            :items="dataProperties"
            @reorder="(sk) => this.$emit('handleReorder', sk)"
            @insert="(e) => this.$emit('insertItem', e)"
            mode="cut">
            <template v-slot:item="{ item, index }">
                <drag
                    :disabled="isValidDrag"
                    @dragend="(event) => dragendHandle(event, index)"
                    :key="item.uid"
                    :data="item"
                    @cut="() => this.$emit('clearPosition', item)">
                    <div class="mt-4">
                        <card-properties
                            :ref="`formProperty${item.uid}`"
                            :dataProperties="dataProperties"
                            v-if="item"
                            :asset="item" />
                    </div>
                </drag>
            </template>
        </drop-list>
    </v-container>
</template> 

<script>
import { Drag, DropList } from 'vue-easy-dnd';
import CardProperties from '@/modules/dashboard/place/category/action/CardProperties.vue';
import eventBus from '@/eventBus';

export default {
    name: 'ListCardProperties',
    components: { CardProperties, Drag, DropList, CardProperties },
    props: {
        dataProperties: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            debounce: null,
            isValidDrag: true,
        };
    },
    methods: {
        getForms() {
            return this.$refs.formProperty;
        },
        dragendHandle() {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                eventBus.$emit('updatePosition');
            }, 500);
        },

        //Emit
        mouseoverLocationDrag() {
            this.isValidDrag = false;
        },
        mouseoutLocationDrag() {
            this.isValidDrag = true;
        },
    },
    mounted() {},
    created() {
        eventBus.$on('mouseoverLocationDrag', this.mouseoverLocationDrag);
        eventBus.$on('mouseoutLocationDrag', this.mouseoutLocationDrag);
    },
    beforeDestroy() {
        eventBus.$off('mouseoverLocationDrag', this.mouseoverLocationDrag);
        eventBus.$off('mouseoutLocationDrag', this.mouseoutLocationDrag);
    },
};
</script>

<style></style>
