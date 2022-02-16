<template>
<v-container>
    <v-row>
        <v-col cols="12" md="9">
            <v-card class="ma-10 pa-5 ml-md-0" :loading="loading">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="postContent.title" :counter="10" :rules="nameRules" label="عنوان پست" required></v-text-field>
                    <!-- <v-textarea solo name="input-7-4" label="متن پست" v-model="postContent.content.raw"></v-textarea> -->
                    <tiptap :value="postContent.content" />
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="publish">
                        انتشار پست
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">
                        پاک کردن مطالب نوشته شده
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
        <v-col cols="12" md="3">
            <v-card class="ma-10 pa-5 mx-0 justify-center d-flex ">
                <p>وضعیت پست</p>
                <v-radio-group v-model="postContent.status" column>
                    <v-radio label="منتشر شده " value="publish"></v-radio>
                    <v-radio label="پیش نویس" value="drafts"></v-radio>
                </v-radio-group>
            </v-card>
        </v-col>
    </v-row>

</v-container>

</template>

<script>
import axios from '../plugins/axios'
import Tiptap from '../components/TipTap'
export default {
    name :  'CreatePost',
    components : {
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

        postContent: {
            title: '',
            content:'',
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

                console.log(data);
                this.postContent.title = data.title.rendered
                this.postContent.content = data.content.rendered
                this.loading = false
            } catch (e) {
                console.log(e);
            }

        },
        reset() {
            this.$refs.form.reset()
        },
    },
    created() {
        // console.log(this.$route.params.id);

        if (this.$route.params.id) {
            this.loading = true,
                this.getPostDetails()
        }
    }
}
</script>

<style>

</style>
