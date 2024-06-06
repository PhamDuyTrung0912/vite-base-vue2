<template>
    <div :class="[visible ? 'toast show' : 'toast', type]">
        <div class="toast-content">
            <span :class="['mdi toast-icon', icon]"></span>
            <p class="toast-label">{{ message }}</p>
            <span class="mdi mdi-close toast-close" @click="hideToast"></span>
        </div>
    </div>
</template>

<script>
import { ToastTypes, ToastIcons } from './toastContants';

export default {
    name: 'Toast',
    props: {
        duration: {
            type: Number,
            default: 3000,
        },
        type: {
            type: String,
            validator(value) {
                return Object.values(ToastTypes).includes(value);
            },
            default: ToastTypes.SUCCESS,
        },
        icon: {
            type: String,
            validator(value) {
                return Object.values(ToastIcons).includes(value);
            },
            default: ToastIcons.SUCCESS,
        },
        message: {
            type: String,
            default: 'This is a notification !',
        },
    },
    data() {
        return {
            visible: false,
            timeout: null,
        };
    },
    methods: {
        showToast(callback = () => null) {
            this.visible = true;
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setTimeout(() => {
                this.hideToast();
                setTimeout(() => {
                    callback();
                }, 1000);
            }, this.duration);
        },
        hideToast() {
            this.visible = false;
            clearTimeout(this.timeoutId);
            this.$emit('clearToast')
        },
    },
};
</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    min-width: 150px;
    color: white;
    padding: 15px 15px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    &.show {
        opacity: 1;
    }

    &.success {
        background-color: $toast_color_success;
    }

    &.error {
        background-color: $toast_color_error;
    }

    &.warning {
        background-color: $toast_color_warning;
    }

    &.info {
        background-color: $toast_color_info;
    }

    .toast-content {
        display: flex;
        align-items: center;

        .toast-label {
            font-family: $body-font-family;
            font-size: 14px;
        }

        .toast-icon {
            color: white;
            margin-right: 15px;
            font-size: 25px;
            cursor: pointer;
        }

        .toast-close {
            color: white;
            margin-left: 15px;
            font-size: 15px;
            cursor: pointer;
        }
    }
}
</style>
