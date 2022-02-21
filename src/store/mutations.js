const SET_POST = 'SET_POST'
const SET_ALL_TAGS = 'SET_ALL_TAGS'
const SET_ALL_CATEGORIES= 'SET_ALL_CATEGORIES'

export default {
        [SET_POST](state,data) {
        state.postInfoList= data

        },
        [SET_ALL_TAGS](state,data) {
        state.all_the_tags = data

        },
        [SET_ALL_CATEGORIES](state,data) {
        state.all_the_categories = data
        },
    }