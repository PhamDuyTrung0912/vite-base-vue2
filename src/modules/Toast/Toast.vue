<template>
    <div :class="[visible ? 'toast show' : 'toast', type]">
        <div class="toast-content">
            <span :class="['mdi toast-icon', icon]"></span>

            <div>
                <p v-if="title" class="toast-label toast-label-title">{{ title }}</p>
                <p class="toast-label">{{ message }}</p>
            </div>
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
            default: 'This is a description notification !',
        },
        title: {
            type: String,
            default: null,
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
                callback();
            }, this.duration);
        },
        hideToast() {
            this.visible = false;
            clearTimeout(this.timeoutId);
        },
    },
};
</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    top: 20px;
    right: 10px;
    min-width: 150px;
    max-width: 400px;
    color: white;
    padding: 15px 15px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: all 0.2s ease-in-out;
    transform: translateY(-75px);
    z-index: 100;

    &.show {
        opacity: 1;
        transform: translateY(0px);
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
            font-size: 13px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            &-title {
                font-size: 15px;
                font-weight: 500;
                margin-bottom: 8px;
            }
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
