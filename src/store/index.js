import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex);

const SET_POST = 'SET_POST'
const SET_ALL_TAGS = 'SET_ALL_TAGS'
const SET_ALL_CATEGORIES= 'SET_ALL_CATEGORIES'

const store = new Vuex.Store({
  
    state() {
        return {
            postInfoList: [],
            postInfoListFirst: [],
            loading: true,
            all_the_tags: [],
            all_the_categories: [],
           
        }
    },
    getters: {
    getPostById: (state) => (id) => {
        
            return state.postInfoList.find(post => post.id == id)
     }   
    },
    mutations: {
        [SET_POST](state,data) {
        state.postInfoList= data

        },
        [SET_ALL_TAGS](state,data) {
        state.all_the_tags = data

        },
        [SET_ALL_CATEGORIES](state,data) {
        state.all_the_categories = data
        },
    },
    actions: {
        
        getPosts: async function ({ commit } , payload ="") {

            try {

                const {
                    data
                } = await axios.get(`/wp-json/wp/v2/posts/${payload}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    },
                    params: {
                        'context': 'edit',
                        'status': 'any',

                    }
                })
                console.log(data, 'this response');
                if (payload) {
                   commit('SET_POST',[data])  
                } else {
                    commit('SET_POST',data)
                }
              
            } catch (e) {
                console.log('we have some errors is getpost function');
            }

        },        
        getAllTags: async function ({commit}) {

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

                     commit('SET_ALL_TAGS',data)

            } catch (e) {

            }

        },
        getAllCategories: async function ({commit}) {

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

                commit('SET_ALL_CATEGORIES',data)

            } catch (e) {

            }

        },

        // getTheCategories(context,payload) {
                
        // context.commit('SET_THE_CATEGORIES',payload)
        // }

    }
})


export default store
