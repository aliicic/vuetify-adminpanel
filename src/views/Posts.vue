<template>
<v-data-table :headers="headers" :items="postInfoList" sort-by="calories" class="elevation-1" :loading="loading" loading-text="لطفا منتظر بمانید">
    <template v-slot:item.date="{ item }">

        {{ currentDateTime(item.date) }}

    </template>
    <template v-slot:item.tags="{ item }">
        <v-chip v-for="( i , index )  in getTheTags(item)" :key="index">
            <!-- <router-link :to="{ name : i.id }"> -->
            {{ i.name }}

            <!-- </router-link> -->
        </v-chip>
    </template>
    <template v-slot:item.categories="{ item }">
        <v-chip v-for="( i , index )  in getTheCategories(item)" :key="index">
            <!-- <router-link :to="{ name : i.id }"> -->
            {{ i.name }}

            <!-- </router-link> -->
        </v-chip>
    </template>
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>{{currentDateTime()}}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <router-link to="/dashboard/createpost">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            اضافه کردن پست جدید
                        </v-btn>
                    </router-link>

                </template>
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
        <router-link :to="{ name : 'CreatePost' , params : {id  : item.id} }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
        </router-link>

        <v-icon small @click="deleteItem(item)">
            mdi-delete
        </v-icon>
    </template>
</v-data-table>
</template>

<script>
import axios from '../plugins/axios'
var moment = require('jalali-moment')
export default {
    name: 'Posts',
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            search: '',
            the_categories: '',
            loading: true,
            headers: [{
                    text: 'نام',
                    align: 'start',
                    sortable: false,
                    value: 'title.raw',
                },
                {
                    text: 'نام نویسنده',
                    value: 'uagb_author_info.display_name'
                },
                {
                    text: 'وضعیت',
                    value: 'status'
                },
                {
                    text: 'برچسب ها',
                    value: 'tags'
                },
                {
                    text: 'دسته بندی ها',
                    value: 'categories'
                },
                {
                    text: 'تاریخ',
                    value: 'date'
                },
                {
                    text: 'عملیات',
                    value: 'actions'
                },
            ],
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
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'اضافه کردن کاربر جدید' : 'ویرایش اطلاعات کاربر'
        },
        postInfoList() {
            return this.$store.state.postInfoList
        },
        the_tags() {
            return this.$store.state.the_tags
        },
        // loading() {
        //     return this.$store.state.loading
        // },

    },
    methods: {

        deleteItem(item) {
            // console.log(item.id);
            this.editedIndex = this.postInfoList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true

        },
        deleteItemConfirm() {

            axios.delete(`/wp-json/wp/v2/posts/${this.postInfoList[this.editedIndex].id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                },
                params: {
                    'context': 'edit'
                }
            })
            this.postInfoList.splice(this.editedIndex, 1)
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
        currentDateTime(item) {
            return moment(item).locale('fa').format(' h:mm:ss a , YYYY/M/D');
        },


        getCategories: async function () {

            try {

                const {
                    data
                } = await axios.get('/wp-json/wp/v2/categories', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    },
                    params: {
                        'context': 'edit',
                        'per_page': 100
                    }
                })

                this.the_categories = data

            } catch (e) {

            }

        },
        getTheTags(itemm) {        
        this.$store.dispatch('getTheTags',itemm)
        return this.$store.state.get_the_tags
        },
        getTheCategories(itemm) {

            return itemm.categories.map(item => {
                let catId = item
                var foundCats = this.the_categories.find(cat => cat.id === catId)
                // console.log(foundCats , 'this is me');
                return foundCats ? foundCats : ''
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
        this.$store.dispatch('getPosts')
        this.$store.dispatch('getTags')
        this.getCategories();
        console.log(this.$store.state.product, 'hey its ');
        //this.initialize()
        // console.log(new Date(2022, 2, 21));
        // console.log(new Intl.DateTimeFormat('fa-IR').format(new Date(2022, 2, 21)));
    },
}
</script>

<style>

</style>
