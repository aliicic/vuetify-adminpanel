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
           <v-col
          cols="12"
          >
          <v-text-field
            label="نام کاربری یا ایمیل"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            outlined
            :type ="showPassword ? 'text' : 'password' "
            label="رمز عبور"
            :prepend-inner-icon="showPassword?'mdi-eye' : 'mdi-eye-off'"
            @click:prepend-inner="showPassword = !showPassword"
          ></v-text-field>
        </v-col>

    <v-card-actions>
       <v-btn
      depressed
      color="primary"
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
import { ref } from 'vue'
export default {

  data : () =>({
    showPassword : false ,
  })

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