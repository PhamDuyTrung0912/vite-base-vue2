<template>
    <div class="d-flex align-center justify-center">
        <input ref="fileInput" type="file" accept="image/*" @change="onFileChange" style="display: none" />
        <div class="mr-3" v-if="!previewImage" @click="triggerFileInput">
            <v-btn class="mt-0" small fab elevation="0">
                <v-icon color="text_primary">mdi-plus</v-icon>
            </v-btn>
        </div>
        <div v-else style="width: 52px; height: 48px; position: relative">
            <img
                v-if="previewDefault"
                :src="$utils.apiAsset(previewImage)"
                style="height: 40px; width: 40px; object-fit: cover; border-radius: 40px" />
            <img v-else :src="previewImage" style="height: 40px; width: 40px; object-fit: cover; border-radius: 40px" />
            <v-icon small style="z-index: 10; top: -5px; right: 5px; position: absolute" color="error" @click="removeAttachments">mdi-delete</v-icon>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        previewProp: {
            default: null,
        },
    },
    data() {
        return {
            file: null,
            previewImage: null,
            previewDefault: null,
        };
    },
    watch: {
        previewProp: {
            immediate: true,
            handler() {
                if (this.previewProp) {
                    this.previewDefault = this.previewProp;
                    this.previewImage = this.previewDefault;
                }
            },
        },
    },
    methods: {
        onFileChange(event) {
            this.previewDefault = null;
            const files = event.target.files || event.dataTransfer.files;
            if (!files.length) return;
            this.file = files[0];
            this.previewImage = URL.createObjectURL(this.file);
            this.$emit('uploadIcon', this.file);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        removeAttachments() {
            this.file = null;
            this.previewImage = null;
            this.$refs.fileInput.value = null;
            this.$emit('uploadIcon', this.file);
        },
    },
};
</script>

<style scoped>
.file-input-container {
    cursor: pointer;
}
</style>
