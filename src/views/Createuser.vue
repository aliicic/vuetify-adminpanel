<template>
<v-container>
    <v-row>
        <v-col>
            <v-card class="ma-10 pa-5">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="userInfo.username" :counter="10" :rules="nameRules" label="نام کاربری" required></v-text-field>

                    <v-text-field v-model="userInfo.email" :rules="emailRules" label="آدرس ایمیل" required></v-text-field>

                    <v-text-field v-model="userInfo.name" :counter="10" :rules="nameRules" label="نام " required></v-text-field>

                    <v-text-field v-model="userInfo.nicname" :counter="10" :rules="nameRules" label="نام مستعار " required></v-text-field>

                    <v-text-field v-model="userInfo.password" :append-icon="showPassWord ? 'mdi-eye' : 'mdi-eye-off'" :rules="[passWordrules.required, passWordrules.min]" :type="showPassWord ? 'text' : 'password'" name="input-10-1" label="یک رمز عبور قوی وارد کنید" hint="حداقل 8 کاراکتر داشته باشد" counter @click:append="showPassWord = !showPassWord"></v-text-field>

                    <v-select v-model="userInfo.rule" :items="items" item-text="key" item-value="value" :rules="[v => !!v || 'Item is required']" label="نقش کاربر" required></v-select>

                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="publish">
                        ایجاد کاربر
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
    data: () => ({
        valid: true,
        showPassWord: false,

        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        passWordrules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => (`The email and password you entered don't match`),
        },

        items: [{
                key: 'مدیر',
                value: 'administrator'
            },
            {
                key: 'ویرایشگر',
                value: 'editor'
            },
            {
                key: 'نویسنده',
                value: 'author'
            },
            {
                key: 'کانتر بیوتر',
                value: 'contributor'
            },
            {
                key: 'دنبال کننده',
                value: 'subscriber'
            },
        ],

        userInfo: {
            username: '',
            email: '',
            nicname : '',
            password: '',
            rule: '',

        }

    }),

    methods: {
        async publish() {
            this.$refs.form.validate()
            try {

                const {
                    data
                } = await axios.post('/wp-json/wp/v2/users',
                    this.userInfo, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                        }

                    }

                )

                console.log(data);
                this.$refs.form.reset()
            } catch (e) {

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
