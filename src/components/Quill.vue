<template>
    <div :style="{ width: '100%' }">
        <div ref="editor" :style="{ height: height }" />
    </div>
</template>

<script>
import Quill from 'quill';

export default {
    props: {
        height: {
            type: String,
            default: '80px',
        },
        value: String,
        valueProp: String,
        readonly: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // flag: false,
            valueInput: null,
            debounce: null,
            setDefault: true,
        };
    },
    watch: {
        value: {
            immediate: false,
            handler(newValue) {
                // Kiểm tra nếu giá trị thay đổi
                if (!newValue) {
                    this.quill.root.innerHTML = '';
                }
            },
        },
        valueProp: {
            handler(val) {
                if (val) {
                    if (this.setDefault) {
                        this.quill.root.innerHTML = this.valueProp;
                        this.$nextTick(() => {
                            this.quill.setSelection(this.quill.getLength(), 0);
                        });
                        this.setDefault = false;
                    }
                }
            },
        },
    },

    mounted() {
        this.quill = new Quill(this.$refs.editor, {
            readOnly: this.readonly,
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ font: [] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                ],
            },
            theme: 'snow',
            // Các tùy chọn và cấu hình khác của Quill.js có thể được thêm vào đây
        });

        // Lắng nghe sự kiện thay đổi nội dung
        this.quill.on('text-change', () => {
            this.$emit('input', this.quill.root.innerHTML);
        });
        // Gán giá trị ban đầu từ prop vào trình soạn thảo
        this.quill.root.innerHTML = this.value;
    },
};
</script>
