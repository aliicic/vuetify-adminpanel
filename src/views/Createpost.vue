<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <v-card class="ma-10 pa-5 ml-md-0" :loading="loading">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="postContent.title" :counter="10" :rules="nameRules" label="عنوان پست" required></v-text-field>
                    <!-- <v-textarea solo name="input-7-4" label="متن پست" v-model="postContent.content.raw"></v-textarea> -->
                    <tiptap v-model="postContent.content" />
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="publish">
                        انتشار پست
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">
                        پاک کردن مطالب نوشته شده
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card class="ma-10 pa-5 mx-0 justify-center d-flex ">
                <p>وضعیت پست</p>
                <v-radio-group v-model="postContent.status" column>
                    <v-radio label="منتشر شده" value="publish"></v-radio>
                    <v-radio label="پیش نویس" value="draft"></v-radio>
                </v-radio-group>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card class="ma-10 pa-5 mx-0">
                <p>وضعیت پست</p>
                <v-card class="ma-10 pa-5 mx-0 justify-center d-flex ">
                    <p>برچسب ها</p>
                    <v-combobox v-model="select" :items="items" label="I use chips" multiple chips></v-combobox>
                </v-card>
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

        select: [],
        items: [],
        itemsId: [],
        the_tags: [10, 11, 12],
        postContent: {
            title: '',
            content: '',
            status: ''
        }

    }),

    // computed:{

    //    thisIsEditPost(){
    //        return  this.$route.params.id === "" ? true : false
    //    }

    // },

    methods: {
        async publish() {
            this.$refs.form.validate()
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
                this.$refs.form.reset()
            } catch (e) {

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
                        'context': 'edit'
                    }
                })
                this.items.push(...data.map(data => data.name))
                this.itemsId.push(...data.map(data => data.id))

                //this.items = data.map(data => data.name)
                //console.log(data.map(data => data.name), 'is tags informations');

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
                // this.the_tags = data.tags
                //console.log(this.the_tags , 'is the tags');
                this.loading = false
            } catch (e) {
                console.log(e);
            }

        },

        getTheTags() {
            console.log(this.the_tags, 'the_tags');
            console.log(this.itemsId, 'itemsId');
            console.log(this.the_tags.map(item => this.itemsId.find(itemsIds => itemsIds === item)), 'xxx');
            this.select = this.the_tags.map(item => this.itemsId.find(itemsIds => itemsIds === item))
            console.log(this.select, 'is sleceted');

        },

        reset() {
            this.$refs.form.reset()
            this.postContent.content = ''
        },
    },
    created() {
        // console.log(this.$route.params.id);

        if (this.$route.params.id) {
            this.loading = true,
                this.getPostDetails()
        }
        this.getTheTags()
        this.getTags()

    },

}
</script>

<style>

</style>
