import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex);

const store = new Vuex.Store({

    state() {
        return {
            postInfoList: [],
            loading: true,
            the_tags: '',
            get_the_tags: [],

            

        }
    },
    mutations: {
        SET_POST(state,data) {
        state.postInfoList =data
        },
        SET_TAGS(state,data) {
        state.the_tags = data
        },
        SET_THE_TAGS(state,payload) {
        state.get_the_tags = payload.tags.map(item => {
                let tagId = item
                var foundTag = state.the_tags.find(tag => tag.id === tagId)
                // console.log(foundTag , 'this is me');
                return foundTag ? foundTag : ''
        })
        },
        // LOADING_STATUS(state,data) {
        // state.loading = data
        // }
    },
    actions: {
        
        getPosts: async function (context) {

            try {

                const {
                    data
                } = await axios.get('/wp-json/wp/v2/posts', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    },
                    params: {
                        'context': 'edit',
                        'status': 'any',

                    }
                })
                context.commit('SET_POST',data)
               // context.commit('LOADING_STATUS',false)
            } catch (e) {
                console.log('we have some errors');
            }

        },
        
        getTags: async function (context) {

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

                     context.commit('SET_TAGS',data)

            } catch (e) {

            }

        },

        getTheTags(context,payload) {
                
        context.commit('SET_THE_TAGS',payload)
        }

    }
})


export default store