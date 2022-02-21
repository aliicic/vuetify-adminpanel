<template>
<v-card class="mx-auto" max-width="344" elevation="2">
    <v-list-item three-line>
        <v-list-item-content>
            <div class="text-overline mb-4">
                صفحه ورود
            </div>

        </v-list-item-content>

    </v-list-item>
    <v-form v-model="validfrom" ref="form">
        <v-col cols="12">
            <v-text-field label="نام کاربری یا ایمیل" outlined v-model="form.username" dense required :rules="req"></v-text-field>
            <v-text-field outlined required v-model="form.password" :type="showPassword ? 'text' : 'password' " label="رمز عبور" :prepend-inner-icon="showPassword?'mdi-eye' : 'mdi-eye-off'" @click:prepend-inner="showPassword = !showPassword" :rules="req"></v-text-field>
        </v-col>
    </v-form>

    <v-card-actions>
        <v-btn depressed color="primary" :loading="loading" :disabled="disabledBtn" @click="validate">
            ورود
        </v-btn>
        <v-btn depressed color="primary">
            فراموشی رمز عبور
        </v-btn>
    </v-card-actions>
    <v-alert v-if="errorText && errorText!='success' " color="red" type="error">

        <p v-html="errorText" />
    </v-alert>
    <v-alert v-if="errorText=='success'" color="green" type="success">

        خوش اومدی دوست عزیزم
    </v-alert>
</v-card>
</template>

<script>
import axios from '../plugins/axios'

export default {

    data: () => ({
        showPassword: false,
        errorText: '',
        form: {
            username: '',
            password: ''
        },
        validfrom: true,
        req: [
            v => !!v || 'پر کردن این فیلد الزامی است ',
        ],

        loading: false
    }),
    computed: {
        disabledBtn() {
            return this.loading || !this.validfrom
        }
    },

    methods: {

        validate: async function () {

            const user = this.form.username
            const pass = this.form.password

            if (this.$refs.form.validate()) {
                this.loading = true

                // (async function getdata(){

                try {

                    //console.log(user);
                    const {
                        data
                    } = await axios.post('/wp-json/jwt-auth/v1/token', {
                            "username": user,
                            "password": pass
                        }

                    )
                    localStorage.setItem("userToken", data.token)
                    localStorage.setItem("displayname", data.user_display_name)
                    localStorage.setItem("email", data.user_email)
                    //console.log(data.token);
                    this.loading = false
                    this.errorText = "success"

                } catch (error) {

                    this.errorText = error.response.data.message
                    this.loading = false

                }

                setTimeout(() => {

                    this.loading = false
                    this.$router.push({
                        name: "Dashboard"
                    })

                }, 2000)
            }
        },

    },

    // setup(props) {

    // const showPassword = ref(false)

    // return{
    //   showPassword
    // }

    // }

}
</script>

<style>
.v-text-field__slot {
    direction: ltr !important;
}
</style>
