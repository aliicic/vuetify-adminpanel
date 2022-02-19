<template>
<router-view />
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),

  created(){
    console.log(this.$store.state.products);
  }
};
</script>
