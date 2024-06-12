<template>
    <v-card flat :height="height">
        <input ref="fileInput" type="file" accept="image/*" @change="onFileChange" style="display: none" />
        <div class="mr-3" v-if="!previewImage" @click="triggerFileInput">
            <v-btn class="mt-0" x-small fab elevation="0">
                <v-icon color="primary">mdi-upload-box-outline</v-icon>
            </v-btn>
        </div>
        <div v-else class="file-input-container">
            <v-avatar size="40" @click="triggerFileInput">
                <img :src="previewImage" />
            </v-avatar>
            <v-icon small style="transform: translateX(-20px); z-index: 10; top: -20px" absolute top right color="error" @click="removeAttachments"
                >mdi-delete</v-icon
            >
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
    },
    data() {
        return {
            file: null,
            previewImage: null,
        };
    },
    methods: {
        onFileChange(event) {
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
