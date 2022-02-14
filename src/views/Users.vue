<template>
<v-card class="ma-10 pa-5">
    <v-card-title>
        کاربران
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="جستجو" hide-details></v-text-field>
    </v-card-title>

    <v-card class="mx-5">

        <v-data-table :headers="headers" :items="usersInfoList" :search="search" class="elevation-1" :loading="loading" loading-text="لطفا چند لحظه صبر کنید">
            <template v-slot:item.actions="{ item }">

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h6">آیا واقعا و جدی جدی میخوای این کاربر رو حذف کنی ؟</v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">نه بیخیال</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">آره صد در صد</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>

        </v-data-table>
    </v-card>

</v-card>
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
                    value: 'slug'
                },
                {
                    text: 'ایمیل',
                    value: 'fat'
                },
                {
                    text: 'شماره تماس',
                    value: 'carbs'
                },
                {
                    text: 'پست ها',
                    value: 'protein'
                },
                {
                    text: 'عملیات',
                    value: 'actions'
                },
            ],
            usersInfoList: [],
        }
    },
    methods: {

        getUsers: async function () {

            try {

                const {
                    data
                } = await axios.get('/wp-json/wp/v2/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    }
                })
                this.usersInfoList.push(...data)
                console.log(data, 'is user informations');
                this.loading = false
            } catch (e) {
                console.log('we have some errors');
            }

        },

        deleteItem(item) {
            console.log(item.id);
            this.editedIndex = this.usersInfoList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true

        },

        deleteItemConfirm() {

            axios.delete(`/wp-json/wp/v2/users/${this.usersInfoList[this.editedIndex].id}`, {
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
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
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
    created() {
        this.getUsers();
    },
}
</script>

<style>

</style>
