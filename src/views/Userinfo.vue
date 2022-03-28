<template>
<v-container>
    <v-row>
        <v-col>
            <v-card class="ma-10 pa-5">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="userInfo.username" :counter="20" :rules="nameRules" label="نام کاربری" disabled></v-text-field>

                    <v-text-field v-model="userInfo.email" :rules="emailRules" label="آدرس ایمیل" required></v-text-field>

                    <v-text-field v-model="userInfo.first_name" :counter="20" :rules="nameRules" label="نام " required></v-text-field>
                    <v-text-field v-model="userInfo.last_name" :counter="20" :rules="nameRules" label="نام خانوادگی " required></v-text-field>

                    <v-text-field v-model="userInfo.nickname" :counter="20" :rules="nameRules" label="نمایشی" required></v-text-field>

                    <v-text-field v-model="userInfo.password" :append-icon="showPassWord ? 'mdi-eye' : 'mdi-eye-off'" :rules="[passWordrules.min]" :type="showPassWord ? 'text' : 'password'" name="input-10-1" label="میتوانید آن را خالی بگذارید" hint="حداقل 8 کاراکتر داشته باشد" counter @click:append="showPassWord = !showPassWord"></v-text-field>

                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="publish">
                        ویرایش اطلاعات
                    </v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">
                        پاک کردن فیلد ها
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from '../plugins/axios'
export default {
    name: 'Userinfo',
    data: () => ({
        valid: true,
        showPassWord: false,

        nameRules: [
            v => !!v || 'پر کردن این فیلد الزامی است ',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        passWordrules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => (`The email you entered don't match`),
        },

        userInfo: {
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            nickname: localStorage.getItem('displayname'),
            password:'',
            last_name : localStorage.getItem('last_name'),
            first_name : localStorage.getItem('first_name')
          
        }

    }),

    methods: {
        async publish() {
            this.$refs.form.validate()
            try {

                await axios.put(`/wp-json/wp/v2/users/me`, this.userInfo, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                        }

                    }

                )

                this.$store.commit('SET_MSG', {
                    text: 'کاربر با موققیت ویرایش شد',
                    type: 'success'
                })
                Object.assign(this.usersInfoList[this.editedIndex], this.editedItem)
            } catch (e) {
                this.$store.commit('SET_MSG', {
                    text: e.response.data.message,
                    type: 'error'
                })

            }

        },
        reset() {
            this.$refs.form.reset()
        },
    },
}
</script>

<style>

</style>
