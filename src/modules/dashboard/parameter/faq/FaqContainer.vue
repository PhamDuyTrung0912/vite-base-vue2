<template>
    <div>
        <div v-if="isAdd">
            <faq-form />
        </div>
        <v-container v-else fluid class="py-0">
            <v-row>
                <v-col cols="12">
                    <list-card-data-faq
                        :dataTypes="dataTypes"
                        :dataAssets="dataAssets"
                        @handleReorder="handleReorder"
                        @insertItem="insertItem"
                        @clearPosition="clearPosition" />
                </v-col>
                <v-col cols="12">
                    <div class="mt-3 text-center">
                        <v-btn
                            text
                            @click="
                                () => {
                                    isAdd = true;
                                }
                            "
                            width="100%"
                            height="50"
                            class="ct_btn_add"
                            color="secondary">
                            <v-icon class="px-5">mdi-plus</v-icon>Ajouter une propriété</v-btn
                        >
                    </div>
                    <v-btn small height="44" :loading="loading" color="secondary" width="100%" class="my-2 mt-5" @click="save">
                        <v-icon class="px-5">mdi-content-save</v-icon>
                        Sauvegarder</v-btn
                    >
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import eventBus from '@/eventBus';
import { v4 as uuidv4 } from 'uuid';
import { defineComponent } from 'vue';
import FaqForm from './FaqForm.vue';
import ListCardDataFaq from './ListCardDataFaq.vue';

export default defineComponent({
    components: { ListCardDataFaq, FaqForm },
    name: 'FaqContainer',
    props: {},
    data() {
        return {
            isAdd: false,
            loading: false,
            dataTypes: [
                { text: 'Texte', value: 1 },
                { text: 'Entier', value: 2 },
                { text: 'Décimal', value: 3 },
                { text: 'Booléen', value: 4 },
                { text: 'Date', value: 5 },
                { text: 'Date et heure', value: 6 },
            ],
            dataAssets: [],
            modelDataAsset: {
                name: null,
                technical_name: null,
            },
        };
    },
    watch: {},
    computed: {
        validDataAssets() {
            const itemCheck = this.dataAssets.find((e) => !e.name);
            if (itemCheck) return false;
            return true;
        },
    },
    methods: {
        addDataAsset() {
            this.dataAssets.push({ uid: uuidv4(), ...this.modelDataAsset, position: this.dataAssets.length + 1 });
        },
        //Emit
        handleReorder(sk) {
            sk.apply(this.dataAssets);
        },
        insertItem(event) {
            this.dataAssets.splice(event.index, 0, event.data);
        },

        clearPosition(item) {
            const index = this.dataAssets.indexOf(item);
            this.dataAssets.splice(index, 1);
        },
        removeDataAsset(uid) {
            if (uid) {
                const itemToRemoveIndex = this.dataAssets.findIndex((el) => el.uid === uid);
                this.dataAssets.splice(itemToRemoveIndex, 1);
            }
        },
        updatePositionDataAsset() {
            this.dataAssets = [...this.dataAssets].map((item, index) => ({ ...item, position: index + 1 }));
        },
        updateFormDataAsset(data) {
            this.dataAssets.push({
                ...data,
                uid: uuidv4(),
            });
            this.isAdd = false;
        },
        checkItem(input, data) {
            if (input === 'name') {
                const itemCheck = this.dataAssets.find(
                    (e) =>
                        e[input] &&
                        e[input]?.toLowerCase() &&
                        data[input]?.toLowerCase() &&
                        e[input].toLowerCase() === data[input].toLowerCase() &&
                        e.uid !== data.uid,
                );
                if (itemCheck) {
                    let message = '';
                    if (input === 'name') {
                        message = 'Le nom de la propriété existait';
                    }
                    eventBus.$emit('displaySnackbar', {
                        message,
                        color: 'error',
                        timeout: 4000,
                    });
                    return true;
                }
            }
            return false;
        },
        save() {
            if (this.$refs.form.validate()) {
                console.log('log.form', this.form);
            }
        },
    },
    mounted() {},
    created() {
        eventBus.$on('removeDataAsset', this.removeDataAsset);
        eventBus.$on('updateFormDataAsset', this.updateFormDataAsset);
        eventBus.$on('updatePositionDataAsset', this.updatePositionDataAsset);
    },
    beforeDestroy() {
        eventBus.$off('removeDataAsset', this.removeDataAsset);
        eventBus.$off('updateFormDataAsset', this.updateFormDataAsset);
        eventBus.$off('updatePositionDataAsset', this.updatePositionDataAsset);
    },
});
</script>

<style lang="scss" scoped>
.ct_btn_add {
    border: 1px dashed rgb(192, 192, 192);
}
</style>
