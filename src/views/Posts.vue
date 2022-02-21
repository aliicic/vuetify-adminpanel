<template>
<v-data-table :headers="headers" :items="postInfoList" sort-by="calories" class="elevation-1" :loading="postInfoList ==''" loading-text="لطفا منتظر بمانید">
    <template v-slot:item.date="{ item }">
        {{ currentDateTime(item.date) }}
    </template>
    <template v-slot:item.tags="{ item }">
        <v-chip v-for="( i , index )  in getTheTags(item)" :key="index">
            {{ i.name }}
        </v-chip>
    </template>
    <template v-slot:item.categories="{ item }">
        <v-chip v-for="( i , index )  in getTheCategories(item)" :key="index">
            {{ i.name }}
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
            <v-icon small class="mr-2">
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
import {
    mapState
} from 'vuex'
var moment = require('jalali-moment')
export default {
    name: 'Posts',
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            search: '',
            loading: this.$store.state.loading,
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
            defaultItem: {
                name: '',
                slug: '',

            },
        }
    },
    computed: {
        postInfoList() {
            return this.$store.state.postInfoList
        },
        //   ...mapState([postInfoList])

    },
    methods: {
        getTheTags(itemm) {

            return itemm.tags.map(item => {
                let tagId = item
                var foundTag = this.$store.state.all_the_tags.find(tag => tag.id === tagId)
                // console.log(foundTag , 'this is me');
                return foundTag ? foundTag : ''
            })
        },
        getTheCategories(itemm) {
            return itemm.categories.map(item => {
                let catId = item
                var foundCats = this.$store.state.all_the_categories.find(cat => cat.id === catId)
                // console.log(foundCats , 'this is me');
                return foundCats ? foundCats : ''
            })
        },

        deleteItem(item) {
            // console.log(item.id);
            this.editedIndex = this.postInfoList.indexOf(item)
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
                this.editedIndex = -1
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedIndex = -1
            })
        },
        currentDateTime(item) {
            return moment(item).locale('fa').format(' h:mm:ss a , YYYY/M/D');
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
        this.$store.dispatch('getAllTags')
        this.$store.dispatch('getAllCategories')
    },
}
</script>

<style>

</style>
