<template>
  <v-card
    class="mx-auto"
    max-width="344"
    elevation="2"

 
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          صفحه ورود
        </div>

      </v-list-item-content>

    
    </v-list-item>
    <v-form 
    v-model="validfrom"
    ref="form"
    >
             <v-col
          cols="12"
          >
          <v-text-field
            label="نام کاربری یا ایمیل"
            outlined
            dense
            required
            :rules ="req"
          ></v-text-field>
          <v-text-field
            outlined
            required
            :type ="showPassword ? 'text' : 'password' "
            label="رمز عبور"
            :prepend-inner-icon="showPassword?'mdi-eye' : 'mdi-eye-off'"
            @click:prepend-inner="showPassword = !showPassword"
            :rules ="req"

          ></v-text-field>
        </v-col>
    </v-form>
   

    <v-card-actions>
       <v-btn
      depressed
      color="primary"
      :loading ="loading"
      :disabled="disabledBtn"
       @click="validate"
    >
      ورود
    </v-btn>
       <v-btn
      depressed
      color="primary"
    >
      فراموشی رمز عبور
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {

  data : () =>({
    showPassword : false ,
    validfrom: true,
     req: [
        v => !!v || 'پر کردن این فیلد الزامی است ',
      ],
    
     loading : false
  }),
  computed: {
    disabledBtn() {
      return this.loading || !this.validfrom
    }
  },

  methods : {

     validate () {
        
        if(this.$refs.form.validate())
        {
          this.loading = true 
          setTimeout( ()=>{
       
          this.loading = false 
          this.$router.push({ name: "Dashboard" })

            }, 2000 )
        }
      },


  },


// setup(props) {


// const showPassword = ref(false)

// return{
//   showPassword
// }
  
// }

}
</script>

<style>
.v-text-field__slot{
  direction: ltr!important;
}
</style>