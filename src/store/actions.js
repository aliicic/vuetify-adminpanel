import axios from '../plugins/axios'
export default {
        
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