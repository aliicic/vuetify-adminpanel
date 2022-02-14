<template>
<v-data-table :headers="headers" :items="usersInfoList" sort-by="calories" class="elevation-1" :loading="loading" loading-text="لطفا منتظر بمانید">
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
                        <span class="text-h5">عنوان</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.slug" label="Calories"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                            Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
                    value: 'slug'
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
                slug: 0,

            },
            defaultItem: {
                name: '',
                slug: 0,

            },
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

        editItem(item) {
            this.editedIndex = this.usersInfoList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
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
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },

    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        //this.initialize()
    },
}
</script>

<style>

</style>
