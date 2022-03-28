<template>
<v-card class="mx-auto" max-width="344" elevation="2">
    <v-list-item three-line>
        <v-list-item-content>
            <div class="text-overline mb-4">
                صفحه ورود
                <img class="first-logo" src="../assets/mix.jpg" alt="">
            </div>

        </v-list-item-content>

    </v-list-item>
    <v-form v-model="validfrom" ref="form">
        <v-col cols="12">
            <v-text-field label="نام کاربری یا ایمیل" outlined v-model="form.username" dense required :rules="req"></v-text-field>
            <v-text-field outlined required dense v-model="form.password" :type="showPassword ?  'text' : 'password' " label="رمز عبور" :prepend-inner-icon="showPassword?'mdi-eye' : 'mdi-eye-off'" @click:prepend-inner="showPassword = !showPassword" :rules="req"></v-text-field>
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

      در خواست موفق
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
                        }, {
                            params: {
                                'context': 'edit'
                            }
                        }

                    )
                    const res =  await axios.get(`/wp-json/wp/v2/users/me` ,
                     {
                            headers:{
                               'Authorization' : `Bearer ${await data.token}` 
                            },
                            params: {
                                'context': 'edit'
                            }
                     }

                    )
                    localStorage.setItem("userToken", data.token)
                    localStorage.setItem("displayname", res.data.nickname)
                    localStorage.setItem("email", data.user_email)
                    localStorage.setItem("date", res.data.registered_date)
                    localStorage.setItem("username", res.data.username)
                    localStorage.setItem("first_name", res.data.first_name)
                    localStorage.setItem("last_name", res.data.last_name)
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

                }, 1000)
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
.first-logo{
    width: 50%;
    margin: 0 auto;
}
</style>
