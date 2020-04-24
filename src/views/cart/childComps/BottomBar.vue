<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :is-checked="isSelectAll" @click.native="allChecked"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { mapGetters } from 'vuex'
  import {itemListenerMixin} from "../../../common/mixin";

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed:{
		  ...mapGetters(['cartList']),
		  totalPrice(){
		    return this.cartList.filter(item =>{
		      return item.checked
        }).reduce((preValue, item)=>{
          return item.newPrice * item.count + preValue
        },0).toFixed(2) //保留两位小数
      },
      checkLength(){
		    return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
		    //先判断，checked为空，要返回false
         if (this.cartList.length === 0) return false
        // 1.用filter过滤，性能不太好
       // return !(this.cartList.filter(item => !item.checked).length)
        // 2.用find方法，性能好，find方法，查找到了符合条件的，就会停止
        return !(this.cartList.find(item => !item.checked))
      }
    },
    methods:{
      allChecked(){
        //点击全选的两种情况：1. 全部选中 2.全部不选中
        // 判断计算属性 isSelectAll 是否为true，如果为true，则表示全部已经选中
        if (this.isSelectAll) {
          // 全部已经选中，则取反
          this.cartList.forEach(item => item.checked = false)
        }else {
          // 部分没有选中/全部都没有选中 ，取反
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        //结算，如果没有选中的商品
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品~', 2000)
        }
      }

    }

	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
