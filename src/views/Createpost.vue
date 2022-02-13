<template>
<v-container>
    <v-row>
      <v-col cols="12" md="9">
                    <v-card class="ma-10 pa-5 ml-md-0">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="postContent.title"
      :counter="10"
      :rules="nameRules"
      label="عنوان پست"
      required
    ></v-text-field>


     <v-textarea
          solo
          name="input-7-4"
          label="متن پست"
          v-model="postContent.content"
        ></v-textarea>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="publish"
    >
      انتشار پست
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
  </v-form>
                    </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="ma-10 pa-5 mx-0 justify-center d-flex ">
              <v-switch
                v-model="switch1"
               label="انتشار پست"
              ></v-switch>
        </v-card>
      </v-col>
    </v-row>
</v-container>


</template>

<script>
 import axios from '../plugins/axios'
  export default {
    data: () => ({
      valid: true,
      
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],

      postContent :{
          title : '',
          contnet : '', 
          status  : 'publish'
      }


    }),

    methods: {
     async publish () {
        this.$refs.form.validate()
      try{

        const { data } = await axios.post('/wp-json/wp/v2/posts',
        this.postContent ,
        {
            headers :{
            'Authorization' :  `Bearer ${localStorage.getItem('userToken')}`  
            }  
          
        }
          
        )

      console.log(data);
      }catch(e){

      }

      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>

<style>

</style>