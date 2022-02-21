export default {
    getPostById: (state) => (id) => {
        
            return state.postInfoList.find(post => post.id == id)
     }   
    }