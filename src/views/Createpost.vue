<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="9">
            <v-card class="ma-10 pa-5 ml-md-0" :loading="loading">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="postContent.title" :counter="10" :rules="nameRules" label="عنوان پست" required></v-text-field>
                    <!-- <v-textarea solo name="input-7-4" label="متن پست" v-model="postContent.content.raw"></v-textarea> -->
                    <tiptap v-model="postContent.content" />
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="publish">
                        {{ !$route.params.id ? 'انتشار پست' : 'ویرایش پست' }}
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">
                        پاک کردن مطالب نوشته شده
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
        <v-col cols="12" sm="3">
            <v-card class="ma-10 pa-5 mx-0 justify-center d-flex ">
                <p>وضعیت پست</p>
                <v-radio-group v-model="postContent.status" column>
                    <v-radio label="منتشر شده" value="publish"></v-radio>
                    <v-radio label="پیش نویس" value="draft"></v-radio>
                </v-radio-group>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card class="ma-20 pa-5 mx-0 justify-center d-flex ">
                <p>برچسب ها</p>
                <v-combobox v-model="selectedTags" @input="handleTags" :items="tagItems" label="I use chips" multiple chips></v-combobox>
            </v-card>

        </v-col>
        <v-col cols="12">
            <v-card class="ma-20 pa-5 mx-0 justify-center d-flex ">
                <p>دسته بندی ها</p>
                <v-combobox v-model="selectedCategories" @input="handleCats" :items="categoriesItems" label="I use chips" multiple chips></v-combobox>
            </v-card>

        </v-col>
    </v-row>

</v-container>
</template>

<script>
import axios from '../plugins/axios'
import Tiptap from '../components/TipTap'
export default {
    name: 'CreatePost',
    components: {
        Tiptap
    },

    data: () => ({
        valid: true,
        thisIsNewPost: true,
        loading: false,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],

        selectedTags: [],
        selectedCategories: [],
        categoriesItems: [],
        categoriesItemsId: [],
        categoriesObject: [],
        tagItems: [],
        tagsItemsId: [],
        the_tags: [],
        tagObject: [],
        postContent: {
            title: '',
            content: '',
            status: '',
            tags: [],
            categories: [],
        }

    }),



    methods: {
        async publish() {
            this.$refs.form.validate()

            if (!this.$route.params.id) {

                try {

                    const {
                        data
                    } = await axios.post('/wp-json/wp/v2/posts',
                        this.postContent, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                            }

                        }

                    )

                    console.log(data);
                    // this.$refs.form.reset()
                } catch (e) {

                }

            } else {

                try {

                    const {
                        data
                    } = await axios.put(`/wp-json/wp/v2/posts/${this.$route.params.id}`,
                        this.postContent, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                            }

                        }

                    )

                    console.log(data);
                    // this.$refs.form.reset()
                } catch (e) {

                }

            }

        },
        getTags: async function () {

            try {

                const {
                    data
                } = await axios.get('/wp-json/wp/v2/tags', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    },
                    params: {
                        'context': 'edit',
                        'per_page': 100
                    }
                })

                this.tagsItemsId.push(...data.map(data => data.id))
                this.tagObject = data
                this.tagItems = data.map(data => data.name)

            } catch (e) {
                console.log('we have some errors');
            }

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

                this.categoriesItemsId.push(...data.map(data => data.id))
                this.categoriesObject = data
                this.categoriesItems = data.map(data => data.name)

            } catch (e) {
                console.log('we have some errors');
            }

        },
        async getPostDetails() {

            try {

                const {
                    data
                } = await axios.get(`/wp-json/wp/v2/posts/${this.$route.params.id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                        },
                        params: {
                            'context': 'edit'
                        }

                    }

                )

                this.postContent.title = data.title.rendered
                this.postContent.content = data.content.rendered
                this.postContent.status = data.status

                const x = this.tagObject
                const y = this.categoriesObject

                //this.selectedTags= data.tags.map(function(item){ return x.find( function(itm){ return itm.id === item})}).map(it => it.name)

                this.selectedTags = data.tags.map(item => x.find(itm => itm.id === item)).map(it => it.name)
                this.selectedCategories = data.categories.map(item => y.find(itm => itm.id === item)).map(it => it.name)
                this.loading = false
            } catch (e) {
                console.log(e);
            }

        },

        handleTags() {

            let z = this.selectedTags
            let c = this.tagObject
            //  console.log(z , 'is z');
            //  console.log(c , 'is c');
            //  console.log(z.map(item=>c.find(itm=>itm.name ===item)),'what?');
            // console.log( z.map(item=>c.find(itm=>itm.name ===item)).map(it =>it.id ),'is final');
            this.postContent.tags = z.map(item => c.find(itm => itm.name === item)).map(it => it.id)
        },
        handleCats() {

            let z = this.selectedCategories
            let c = this.categoriesObject
            //  console.log(z , 'is z');
            //  console.log(c , 'is c');
            //  console.log(z.map(item=>c.find(itm=>itm.name ===item)),'what?');
            // console.log( z.map(item=>c.find(itm=>itm.name ===item)).map(it =>it.id ),'is final');
            this.postContent.categories = z.map(item => c.find(itm => itm.name === item)).map(it => it.id)
        },

        reset() {
            this.$refs.form.reset()
            this.postContent.content = ''
        },
    },
    async created() {

        if (this.$route.params.id) {
            this.loading = true,
                this.getPostDetails()

        }
        this.getTags()
        this.getCategories()

    },

}
</script>

<style>

</style>
