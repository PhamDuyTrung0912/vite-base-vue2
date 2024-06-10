import Vue from 'vue';
import Vuetify from 'vuetify';
import fr from 'vuetify/es5/locale/fr';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { fr },
        current: 'fr',
    },
    icons: {
        iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
        themes: {
            light: {
                primary: '#E4003A',
                secondary: '#ffd166',
                published: '#413939',
                primary2: '#f2f0f0',
                draft: '#fcf8e3',
                color_rejected: '#d30628',
                color_under_investigation: '#F98C45',

                text_primary: '#757575',
                text_primary_darken: '#616161',
            },
        },
    },
});
