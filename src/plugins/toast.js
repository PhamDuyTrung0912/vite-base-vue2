import Vue from 'vue';
import Toast from '@/modules/Toast/Toast.vue';

const initToast = () => {
    const ToastConstructor = Vue.extend(Toast);
    const toastInstance = new ToastConstructor();
    toastInstance.$mount(document.createElement('div'));
    document.body.appendChild(toastInstance.$el);
    return toastInstance;
};

const updatePropsData = (toastInstance, newPropsData) => {
    for (const prop in newPropsData) {
        if (Object.prototype.hasOwnProperty.call(newPropsData, prop)) {
            toastInstance.$props[prop] = newPropsData[prop];
        }
    }
};

const ToastPlugin = {
    install(Vue) {
        const toastInstance = initToast();

        Vue.prototype.$toast = {
            success(options) {
                const newPropsData = { ...options, type: 'success', icon: 'mdi-check-circle', duration: 3000 };
                updatePropsData(toastInstance, newPropsData);
                toastInstance.showToast();
            },

            error(options) {
                const newPropsData = { ...options, type: 'error', icon: 'mdi-alert-circle', duration: 3000 };
                updatePropsData(toastInstance, newPropsData);
                toastInstance.showToast();
            },

            warning(options) {
                const newPropsData = { ...options, type: 'warning', icon: 'mdi-shield-alert', duration: 3000 };
                updatePropsData(toastInstance, newPropsData);
                toastInstance.showToast();
            },

            info(options) {
                const newPropsData = { ...options, type: 'info', icon: 'mdi-information-slab-circle', duration: 3000 };
                updatePropsData(toastInstance, newPropsData);
                toastInstance.showToast();
            },
        };
    },
};

export default ToastPlugin;
