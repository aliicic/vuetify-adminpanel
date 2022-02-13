<template>
<v-card>
    <v-card-title>
        کاربران
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="جستجو" hide-details></v-text-field>
    </v-card-title>

    <v-card class="mx-5">

        <v-data-table :headers="headers" :items="usersInfoList" :search="search" class="elevation-1">
            <template slot:top>
                <v-toolbar>
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
        </v-data-table>

    </v-card>

</v-card>
</template>

<script>
import axios from '../plugins/axios'
export default {
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            search: '',
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
                    text: 'Iron (%)',
                    value: 'iron'
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
            } catch (e) {
                console.log('we have some errors');
            }

        },
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },
        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
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
    created() {
        this.getUsers();
    },
}
</script>

<style>

</style>
