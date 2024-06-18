<template>
    <v-row>
        <v-col cols="7" class="d-flex align-center">
            <div>
                <div style="width: 70%">
                    <v-img class="bg-grey-lighten-2 logo-image" src="/logo.png"></v-img>
                    <v-card-text class="px-0">
                        Adipisci cum reprehenderit repellendus, eaque exercitationem, nostrum perspiciatis obcaecati aliquam nulla dolorem harum, vero
                        facere beatae nihil ad repudiandae tenetur voluptate necessitatibus?</v-card-text
                    >
                </div>
            </div>
        </v-col>
        <v-col cols="5">
            <v-card width="100%" class="pa-5" flat>
                <v-card-title class="px-0 text-h5 font-weight-bold">Signin</v-card-title>
                <v-form ref="form" @submit.prevent="signin">
                    <v-text-field
                        prepend-inner-icon="mdi-account"
                        v-model="email"
                        :rules="emailRules"
                        placeholder="Email"
                        dense
                        outlined></v-text-field>
                    <v-text-field
                        prepend-inner-icon="mdi-key"
                        v-model="password"
                        :rules="passwordRules"
                        placeholder="Password"
                        dense
                        outlined
                        append-icon="mdi-eye"
                        type="password"></v-text-field>
                    <v-btn width="100%" elevation="4" color="primary" height="45" type="submit">Signin</v-btn>
                </v-form>
                <div class="text-center">
                    <v-card-text class="px-0 pb-0 text-caption"
                        >By creating an account, you agree to our
                        <span class="blue--text font-weight-bold" style="cursor: pointer">Terms of Service</span> and
                        <span class="blue--text font-weight-bold" style="cursor: pointer">Privacy Policy</span></v-card-text
                    >
                    <v-card-text class="px-0 text-caption"
                        >Don't have an account? <span class="blue--text font-weight-bold" style="cursor: pointer">Sign Up</span></v-card-text
                    >
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { defineComponent } from 'vue';
import authServices from '@/apis/authService/index';
import { mapMutations } from 'vuex';

export default defineComponent({
    name: 'SigninContainer',
    props: {},
    data() {
        return {
            email: '',
            password: '',
            emailRules: [(v) => !!v || 'Email is required', (v) => /.+@.+\..+/.test(v) || 'Email must be valid'],
            passwordRules: [(v) => !!v || 'Password is required', (v) => (v && v.length >= 6) || 'Password must be at least 6 characters'],
        };
    },
    methods: {
        ...mapMutations(['app/mutateUser']),
        signin() {
            if (this.$refs.form.validate()) {
                const payload = {
                    mail: this.email,
                    password: this.password,
                };
                authServices.signIn(payload).then((res) => {
                    this.$toast.success({
                        message: `Successfully logged in, welcome ${this.$utils.ucFirst(res.data.firstname)} ${this.$utils.ucFirst(
                            res.data.lastname,
                        )} !`,
                    });
                    this['app/mutateUser'](res.data);
                    this.$cookies.set('token', res.token);
                    this.$router.push({ name: 'HomePage' });
                });
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.logo-image {
    width: 250px;
}
</style>
