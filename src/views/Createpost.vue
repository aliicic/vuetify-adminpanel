<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="9">
            <v-card class="ma-10 pa-5 mx-0 ml-md-0" :loading="loading">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="postContent.title.raw" :counter="20" :rules="nameRules" label="عنوان پست" required></v-text-field>
                    <!-- <v-textarea solo name="input-7-4" label="متن پست" v-model="postContent.content.raw"></v-textarea> -->
                    <tiptap v-model="postContent.content.raw" />
                    <v-btn :disabled="!valid" :loading="btnloading" color="success" class="mr-4" @click="publish">
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
import {
    createLogger
} from 'vuex'
export default {
    name: 'CreatePost',
    components: {
        Tiptap
    },

    data: () => ({
        valid: true,
        thisIsNewPost: true,
        loading: false,
        btnloading: false,
        nameRules: [
            v => !!v || 'وارد کردن عنوان الزامی است',
            v => (v && v.length <= 20) || 'تعداد کاراکتر ها باید کمتر از 20 باشد',
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
            title: {
                raw: '',

            },
            content: {
                raw: '',

            },
            status: '',
            tags: [],
            categories: [],
        }

    }),

    methods: {
        async publish() {
            this.$refs.form.validate()
            this.btnloading = true
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
                    this.$store.commit('SET_MSG', {
                        text: 'پست با موفقیت ذخیره شد ',
                        type: 'success'
                    })
                    this.btnloading = false

                } catch (e) {
                    this.$store.commit('SET_MSG', {
                        text: e.response.data.message,
                        type: 'error'
                    })
                    this.btnloading = false
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
                    this.$store.commit('SET_MSG', {
                        text: 'پست با موفقیت ویرایش شد ',
                        type: 'success'
                    })
                    this.btnloading = false
                } catch (e) {
                    this.$store.commit('SET_MSG', {
                        text: e.response.data.message,
                        type: 'error'
                    })
                    this.btnloading = false
                }

            }

        },
        handleTags() {

            let z = this.selectedTags
            let c = this.tagObject
            this.postContent.tags = z.map(item => c.find(itm => itm.name === item)).map(it => it.id)
        },
        handleCats() {

            let z = this.selectedCategories
            let c = this.categoriesObject
            this.postContent.categories = z.map(item => c.find(itm => itm.name === item)).map(it => it.id)
        },

        reset() {
            this.$refs.form.reset()
            this.postContent.content = ''
        },
    },
    async created() {

        if (this.$route.params.id) {
            this.loading = true
            // this.getPostDetails()
            if (this.$store.getters.getPostById(this.$route.params.id)) {

                this.postContent = this.$store.getters.getPostById(this.$route.params.id)

                this.tagsItemsId.push(...this.$store.state.all_the_tags.map(data => data.id))
                this.tagObject = this.$store.state.all_the_tags
                this.tagItems = this.$store.state.all_the_tags.map(data => data.name)

                this.categoriesItemsId.push(...this.$store.state.all_the_categories.map(data => data.id))
                this.categoriesObject = this.$store.state.all_the_categories
                this.categoriesItems = this.$store.state.all_the_categories.map(data => data.name)

                let x = this.tagObject
                let y = this.categoriesObject
                this.selectedTags = this.postContent.tags.map(item => x.find(itm => itm.id == item)).map(it => it.name)
                this.selectedCategories = this.postContent.categories.map(item => y.find(itm => itm.id === item)).map(it => it.name)

            } else {

                await this.$store.dispatch('getPosts', this.$route.params.id)
                this.postContent = await this.$store.getters.getPostById(this.$route.params.id)

                await this.$store.dispatch('getAllTags')

                this.tagsItemsId.push(...this.$store.state.all_the_tags.map(data => data.id))
                this.tagObject = this.$store.state.all_the_tags
                this.tagItems = this.$store.state.all_the_tags.map(data => data.name)

                let x = this.tagObject
                console.log(x, 'tagObject');
                this.selectedTags = await this.postContent.tags.map(item => x.find(itm => itm.id == item)).map(it => it.name)

                await this.$store.dispatch('getAllCategories')

                this.categoriesItemsId.push(...this.$store.state.all_the_categories.map(data => data.id))
                this.categoriesObject = this.$store.state.all_the_categories
                this.categoriesItems = this.$store.state.all_the_categories.map(data => data.name)

                let y = this.categoriesObject
                console.log(y, 'catObject');
                this.selectedCategories = this.postContent.categories.map(item => y.find(itm => itm.id === item)).map(it => it.name)

            }

            this.loading = false

        }

        await this.$store.dispatch('getAllTags')
        this.tagObject = this.$store.state.all_the_tags
        this.tagItems = this.$store.state.all_the_tags.map(data => data.name)

        await this.$store.dispatch('getAllCategories')
        this.categoriesObject = this.$store.state.all_the_categories
        this.categoriesItems = this.$store.state.all_the_categories.map(data => data.name)

    },

}
</script>

<style>

</style>
