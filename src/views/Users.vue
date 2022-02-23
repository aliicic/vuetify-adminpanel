<template>
<v-data-table :headers="headers" :items="usersInfoList" sort-by="calories" class="elevation-1" :loading="usersInfoList==''" loading-text="لطفا منتظر بمانید">
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>کاربران</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                        اضافه کردن کاربر جدید
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="editedItem.first_name" label="نام"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="editedItem.last_name" label="نام خانوادگی"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="editedItem.username" label="نام کاربری" :disabled="editedIndex !== -1"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="editedItem.email" label="آدرس ایمیل"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="editedItem.nickname" label="نام نمایشی"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="editedItem.password" type="password" label="پسورد"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                            بیخیال
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                            ذخیره
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">واقعا میخواید این کاربر رو پاک کنید ؟</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">نه بیخیال</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">صد در صد</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
            mdi-delete
        </v-icon>
    </template>
    <template v-slot:item.email="{ item }">
        {{ item.email }}
    </template>
    <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
            Reset
        </v-btn>
    </template>
</v-data-table>
</template>

<script>
import axios from '../plugins/axios'
export default {
    name: 'Users',
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            search: '',
            editedIndex: '',
            loading: true,

            headers: [{
                    text: 'نام',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {
                    text: 'نام کاربری',
                    value: 'username'
                },
                {
                    text: 'ایمیل',
                    value: 'email'
                },
                {
                    text: 'نقش',
                    value: 'roles'
                },
                {
                    text: 'عملیات',
                    value: 'actions'
                },
            ],
            usersInfoList: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                slug: '',
                first_name: '',
                last_name: '',
                nickname: '',
                email: '',
                roles: '',
                password: '',
                username: '',

            },
            defaultItem: {
                name: '',
                slug: '',

            },
        }
    },
    methods: {

        // getUsers: async function () {

        //     try {

        //         const {
        //             data
        //         } = await axios.get('/wp-json/wp/v2/users', {
        //             headers: {
        //                 'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        //             },
        //             params: {
        //                 'context': 'edit'
        //             }
        //         })
        //         this.usersInfoList.push(...data)
        //         console.log(data, 'is user informations');
        //         this.loading = false
        //     } catch (e) {
        //         console.log('we have some errors');
        //     }

        // },

        editItem: async function (item) {

            this.editedIndex = this.usersInfoList.indexOf(item)
            const {
                data
            } = await axios.get(`/wp-json/wp/v2/users/${this.usersInfoList[this.editedIndex].id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                },
                params: {
                    'context': 'edit'
                }
            })
            this.editedItem = Object.assign({}, data)
            console.log(data);
            //this.editedItem.push(...data)
            this.dialog = true
        },

        deleteItem(item) {
            console.log(item.id);
            this.editedIndex = this.usersInfoList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true

        },

        async deleteItemConfirm() {

            try {

                await axios.delete(`/wp-json/wp/v2/users/${this.usersInfoList[this.editedIndex].id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    },
                    params: {
                        'force': true,
                        'reassign': 1
                    }
                })
                this.usersInfoList.splice(this.editedIndex, 1)
                this.closeDelete()
                this.$store.commit('SET_MSG', {
                    text: 'کاربر با موفقیت حذف شد ',
                    type: 'success'
                })

            } catch (e) {

                console.log(e);
                this.$store.commit('SET_MSG', {
                    text: e.response.data.message,
                    type: 'error'
                })

            }

        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save: async function () {
            if (this.editedIndex > -1) {

                try {

                    await axios.put(`/wp-json/wp/v2/users/${this.usersInfoList[this.editedIndex].id}`, this.editedItem, {
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
            } else {
                // this.desserts.push(this.editedItem)
                try {

                    await axios.post('/wp-json/wp/v2/users',
                        this.editedItem, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                            }

                        }

                    )

                    this.$store.commit('SET_MSG', {
                        text: 'کاربر با موققیت اضافه شد',
                        type: 'success'
                    })
                    this.usersInfoList.push(this.editedItem)
                } catch (e) {

                }
            }
            this.close()
        },

    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'اضافه کردن کاربر جدید' : 'ویرایش اطلاعات کاربر'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
   async created() {
       // this.getUsers();
        //this.initialize()
        this.$store.dispatch('getAllUsers').then(()=>{
        this.usersInfoList =  this.$store.state.all_users
    })
    },
}
</script>

<style>

</style>
