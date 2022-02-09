<template>
   <v-container>
     <v-row>
       <v-col cols="12" sm="6" md="3">
         <v-card class="green">
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


  export default {
    name: 'Home',

    components: {

    },

    created(){
      console.log({...this.$vuetify.breakpoint});
    }
  }
</script>
