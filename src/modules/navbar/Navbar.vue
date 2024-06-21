<template>
    <v-card width="280" class="nav_container rounded-0">
        <div class="pa-5">
            <v-img class="bg-grey-lighten-2 logo-image" src="/logo.png"></v-img>
        </div>
        <v-divider class="mx-5"></v-divider>
        <v-list class="pa-3" dense style="height: calc(100vh - 150px); overflow-y: auto">
            <v-list-group
                class="my-2"
                :class="['root_item my-2', { root_item_active: item.route ? item.route.includes(getRouteCurrent) : false }]"
                @click="changeRouteParent(item)"
                v-for="item in items"
                :key="item.title"
                :append-icon="!item.items ? null : 'mdi-menu-down'">
                <template v-slot:activator>
                    <div class="d-flex justify-space-between align-center" style="width: 100%">
                        <v-icon slot="prependIcon" class="mr-8 icon_menu">{{ item.action }}</v-icon>
                        <v-list-item-title class="text_menu">{{ item.title }}</v-list-item-title>
                    </div>
                </template>

                <v-list-item
                    :class="['sub_item', { sub_item_active: child.routes ? child.routes.includes(getRouteCurrent) : false }]"
                    v-for="child in item.items"
                    :key="child.title">
                    <v-list-item-content class="hover_item" @click="changeRouteChild(child)">
                        <div class="d-flex justify-space-between align-center">
                            <v-icon size="10" class="mr-10 icon_sub_menu" left>mdi-circle</v-icon>
                            <v-list-item-title class="text_sub_menu">{{ child.title }}</v-list-item-title>
                        </div>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
        <v-divider class="mx-5"></v-divider>
        <div class="d-flex align-center justify-center px-4">
            <v-avatar style="cursor: pointer" @click="onProfile" color="primary" size="32">
                <span class="white--text font-weight-bold text-subtitle-2">{{ username.shortName }}</span>
            </v-avatar>
            <v-card-text class="text-subtitle-2 font-weight-bold text_primary--text">{{ username.fullName }}</v-card-text>
            <v-btn icon><v-icon @click="onLogout">mdi-logout</v-icon></v-btn>
        </div>

        <!-- Dialog -->
        <profile-dialog :show="isProfileDialog" @close="isProfileDialog = false" />
        <confirm-leave-dialog :show="isConfirmLeave" @accept="onAcceptLeave" @close="isConfirmLeave = false" />
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';
import navConfig from '@/modules/navbar/navbarConfig';
import { mapGetters, mapMutations } from 'vuex';
import ProfileDialog from '../navbar/dialog/ProfileDialog.vue';
import ConfirmLeaveDialog from './dialog/ConfirmLeaveDialog.vue';

export default defineComponent({
    components: { ProfileDialog, ConfirmLeaveDialog },
    name: 'Navbar',
    props: {},
    data() {
        return {
            items: navConfig,
            isProfileDialog: false,
            isConfirmLeave: false,
            toRoute: null,
            pageBlock: ['CategoryCreatePage', 'CategoryCreatePage'],
        };
    },
    watch: {},
    computed: {
        ...mapGetters(['app/getUser']),
        getRouteCurrent() {
            return this.$route.name;
        },
        user() {
            return this['app/getUser'];
        },
        username() {
            if (this.user) {
                const firstName = this.$utils.ucFirst(this.user.firstname);
                const lastName = this.$utils.ucFirst(this.user.lastname);
                return {
                    fullName: firstName + ' ' + lastName,
                    shortName: `${firstName.length > 0 && firstName[0].toUpperCase()}${lastName.length > 0 && lastName[0].toUpperCase()}`,
                };
            }
            return {
                fullName: '',
                shortName: '',
            };
        },
        isPageBlock() {
            return this.pageBlock.includes(this.getRouteCurrent);
        },
    },
    methods: {
        ...mapMutations(['app/mutateUser']),

        onAcceptLeave() {
            if (this.toRoute) {
                this.isConfirmLeave = false;
                this.$router.push({ name: this.toRoute });
                this.toRoute = null;
            }
        },

        hanldeChangePage(item) {
            const toRoute = item?.route;
            if (this.$route.name !== toRoute) {
                this.toRoute = toRoute;
                if (this.isPageBlock) {
                    this.isConfirmLeave = true;
                } else {
                    this.$router.push({ name: toRoute });
                }
            }
        },

        changeRouteParent(item) {
            if (!item.items) {
                this.hanldeChangePage(item);
            }
        },

        changeRouteChild(item) {
            this.hanldeChangePage(item);
        },

        onLogout() {
            if (this.$cookies.isKey('token')) {
                this.$router.push({ name: 'SigninPage' });
                this.$cookies.remove('token');
                this['app/mutateUser'](null);
            }
        },
        onProfile() {
            this.isProfileDialog = true;
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.nav_container {
    height: calc(100vh);
    position: fixed;
}

.root_item {
    border-radius: 8px;
    &_active {
        background-color: $primary_overlay_color !important;
        .icon_menu,
        .text_menu {
            color: $primary_color !important;
        }
    }
    .icon_menu {
        color: $text-black-color;
    }
}

.sub_item {
    border-radius: 8px;
    transition: all 0.3s ease-in;
    padding-left: 23px;
    &_active {
        background-color: $primary_overlay_color;
        .text_sub_menu,
        .icon_sub_menu {
            color: $primary_color;
        }
    }
    &:hover {
        background-color: $overlay-menu-color;
    }
    .hover_item {
        cursor: pointer;
    }
}

.logo-image {
    display: block;
    max-width: 80%;
    height: auto;
    border-radius: 10px;
    cursor: pointer;
}

.text_menu {
    font-size: 15px !important;
    font-weight: 700 !important;
    color: $text-black-color;
}

.text_sub_menu {
    font-size: 13px !important;
    font-weight: 700 !important;
    color: $text-black-color;
}

.sub_item_active {
    background-color: $primary_overlay_color;
}
</style>
