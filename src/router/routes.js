const routes = [
  {
    path: '/dashboard',
    //name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
    if (localStorage.getItem("userToken")) {
       console.log(localStorage.getItem("userToken")); 
        next()    
    }
      else {
      next({ path: '/' })        
    }  

      },
    children: [

        {
    path: '',
    name: 'Dashboard',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: 'about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: 'users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue')
  },
  {
    path: 'posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue')
  },
  {
    path: 'Tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '../views/Tags.vue')
  },
  {
    path: 'Categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue')
  },
  {
    path: 'createpost/:id?',
    name: 'CreatePost',
    component: () => import(/* webpackChunkName: "createpost" */ '../views/Createpost.vue')
  },
  {
    path: 'createuser',
    name: 'Createuser',
    component: () => import(/* webpackChunkName: "createuser" */ '../views/Createuser.vue')
  },
  {
    path: 'userinfo',
    name: 'Userinfo',
    component: () => import(/* webpackChunkName: "userinfo" */ '../views/Userinfo.vue')
  },
      
    ]

  
  },
  {
    path: '',
    //name: 'Dashboard',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    children: [
            
          {
             path: '',
             name: 'Login',
             component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
             beforeEnter: (to, from, next) => {
             if (localStorage.getItem("userToken")) {
             console.log(localStorage.getItem("userToken")); 
             next({ path: '/dashboard' })    
    }
             else {
               next()        
             }  

      },
          }
      
    ]

  
  },


]



export default routes