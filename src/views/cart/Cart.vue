<template>
   <div class="cart">
     <!--导航-->
     <nav-bar class="nav-bar">
       <div slot="center">购物车({{length}})</div>
     </nav-bar>
     <!--商品列表-->
      <cart-list/>
     <!--底部汇总-->
     <bottom-bar/>
   </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      // mapGetters的两种语法，数组方法，和对象方法
      // 第一种：数组方法
      // ...mapGetters(['cartLength','cartList'])
      // 第二种：对象方法  key: 值
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
