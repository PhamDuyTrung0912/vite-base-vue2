<template>
    <v-container>
        <v-card width="500px" class="pa-5">
            <v-card-title>Signin</v-card-title>
            <v-form ref="form" on @submit.prevent="signin">
                <v-text-field v-model="email" :rules="emailRules" label="Email" dense outlined></v-text-field>
                <v-text-field
                    autocomplete="on"
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    dense
                    outlined
                    type="password"></v-text-field>
                <v-btn color="primary" type="submit">Signin</v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SigninPage',
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
        signin() {
            if (this.$refs.form.validate()) {
                this.$cookies.set('token', 'TOKEN-HERE-CA');
                this.$router.push({ name: 'HomePage' });
            }
        },
    },
});
</script>

<style lang="scss" scoped></style>
