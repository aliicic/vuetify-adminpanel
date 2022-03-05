<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="6" md="3">
            <v-card class="green">
                <v-card-text class="d-flex white--text">
                    <span>
                        تاریخ عضویت : {{ currentDateTime(date) }}
                    </span>
                    <v-spacer>

                    </v-spacer>
                    <v-icon class="green--text text--lighten-5">
                        mdi-post
                    </v-icon>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-card class="indigo">
                <v-card-text class="d-flex white--text">
                    <span>
                        {{ postInfoList.length }} پست تاکنون ایجاد شده است
                    </span>
                    <v-spacer>

                    </v-spacer>
                    <v-icon class="green--text text--lighten-5">
                        mdi-post
                    </v-icon>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-card class="blue">
                <v-card-text class="d-flex white--text">
                    <span>
                        {{ userCounts.length }} کاربر تاکنون ثبت نام کرده اند
                    </span>
                    <v-spacer>

                    </v-spacer>
                    <v-icon class="green--text text--lighten-5">
                        mdi-post
                    </v-icon>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-card class="orange">
                <v-card-text class="d-flex white--text">
                    <span>
                        2 دیدگاه ثبت شده است
                    </span>
                    <v-spacer>

                    </v-spacer>
                    <v-icon class="green--text text--lighten-5">
                        mdi-post
                    </v-icon>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="6">
            <v-card class="pa-4">
                <h4>پیش نویس سریع</h4>
                <template>
                    <v-form ref="form">
                        <v-container>

                            <v-text-field v-model="postContent.title.raw" dense label="عنوان" outlined></v-text-field>

                            <v-textarea outlined dense name="input-7-4" label="چیزی به ذهن شما میرسد ؟ آنرا یادداشت کنید" v-model="postContent.content.raw"></v-textarea>
                            <v-btn depressed :loading="btnloading" color="info" @click="saveDraft()">
                                ذخیره پیش نویس
                            </v-btn>
                        </v-container>
                    </v-form>

                </template>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="pa-4">
                <h4>آخرین مطالب سایت</h4>
                <v-data-table
                 dense hide-default-footer hide-default-header max="3"
                 :headers="headers" :items="postInfoList" sort-by="calories" class="elevation-1" :loading="postInfoList ==''" loading-text="لطفا منتظر بمانید">

                </v-data-table>
            </v-card>
        </v-col>
        <v-col cols="6">

            <v-card class="pa-4" color="green" dark>
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline :value="value" color="rgba(255, 255, 255, .7)" height="100" padding="24" stroke-linecap="round" smooth>
                            <template v-slot:label="item">
                                {{ item.value }}
                            </template>
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>

                <v-card-text>
                    <div class="text-h6 font-weight-thin">
                        آمار بازدید سایت
                    </div>
                </v-card-text>

                <v-divider></v-divider>

            </v-card>

        </v-col>

    </v-row>

</v-container>
</template>

<script>
var moment = require('jalali-moment')
import axios from '../plugins/axios'
export default {
    name: 'Home',

    components: {

    },
    data: () => ({
        userCounts: [1,2],
        postInfoList : [],
        value: [
            423,
            446,
            675,
            510,
            590,
            610,
            760,
        ],
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

            ],
        date: window.localStorage.getItem('date'),
        btnloading: false,
        postContent: {
            title: {
                raw: '',

            },
            content: {
                raw: '',

            },
            status: 'draft',
        }

    }),
    methods: {
        currentDateTime(item) {
            return moment(item).locale('fa').format('YYYY/M/D');
        },

        async saveDraft() {
            this.btnloading = true
            try {

                await axios.post('/wp-json/wp/v2/posts',
                    this.postContent, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                        }

                    }

                )

                this.$store.commit('SET_MSG', {
                    text: 'پست با موفقیت ذخیره شد ',
                    type: 'success'
                })
                this.btnloading = false
                this.$refs.form.reset()

            } catch (e) {
                this.$store.commit('SET_MSG', {
                    text: e.response.data.message,
                    type: 'error'
                })
                this.btnloading = false
            }
        }
    },

    created() {
        this.$store.dispatch('getPosts').then( ()=> {
             
        this.postInfoList = this.$store.state.postInfoList

        } )
     
        
        // this.$store.dispatch('getAllUsers').then ( ()=> {
        //    this.userCounts = this.$store.state.all_users
        // })
    
  
    }
}
</script>
