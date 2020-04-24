<template>
    <div class="toast" v-show="isShow">
        {{message}}
    </div>
</template>

<script>
    export default {
      name: "Toast",
      data(){
          return{
            message: '',
            isShow: false
          }
      },
      methods:{
        show(message, duration=1500){
          this.message = message
          this.isShow = true
          setTimeout(()=>{
            this.message = ''
            this.isShow = false
          }, duration)
        }
      }
    }
</script>

<style scoped>
 .toast{
   position: fixed;
   top:50%;
   left: 50%;
   transform: translate(-50%,-50%);
   z-index: 999;

   background-color: rgba(10, 10, 10, 0.7);
   color: #fff;

   padding:8px 10px;
   -webkit-border-radius: 5px;
   -moz-border-radius: 5px;
   border-radius: 5px;
   
 }
</style>
