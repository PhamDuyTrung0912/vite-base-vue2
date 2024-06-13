<template>
    <v-container class="pa-0 mt-4" fluid>
        <drop-list
            class="list1"
            :items="dataAssets"
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
                        <card-data-asset :dataAssets="dataAssets" :dataTypes="dataTypes" v-if="item" :asset="item" />
                    </div>
                </drag>
            </template>
        </drop-list>
    </v-container>
</template>

<script>
import { Drag, DropList } from 'vue-easy-dnd';
import CardDataAsset from './CardDataAsset.vue';
import eventBus from '@/eventBus';

export default {
    name: 'ListCardDataAsset',
    components: { CardDataAsset, Drag, DropList, CardDataAsset },
    props: {
        dataAssets: {
            type: Array,
            default: () => [],
        },
        dataTypes: {
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
        dragendHandle() {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                eventBus.$emit('updatePositionDataAsset');
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
