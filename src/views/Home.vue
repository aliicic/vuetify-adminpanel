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
                  آیتم
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
                  آیتم
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
                  آیتم
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
    <v-divider class="mt-4"/> 
   </v-container>
</template>

<script>
var moment = require('jalali-moment')
  export default {
    name: 'Home',

    components: {

    },
    data : () => ({
     
     date : window.localStorage.getItem('date')

    }),
    methods:{
        currentDateTime(item) {
            return moment(item).locale('fa').format('YYYY/M/D');
        }
    },


    created(){
     // console.log({...this.$vuetify.breakpoint});
    }
  }
</script>
