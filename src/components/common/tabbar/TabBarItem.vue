<template>   
    <div class="tab-bar-item" @click="itemClick">
    	<div v-if="!isActive"><slot name="item-img"></slot></div>
    	<div v-else><slot name="item-img-active"></slot></div>
    	<div :style="activeStyle"><slot name="item-text"></slot></div>        
    </div>        
</template>

<script>
export default {
  name: 'TabBarItem',  
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
  	return{
  		/*isActive:true*/
  	}
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1 //判断当前的路由链接中是否有活跃的路由，如果有，就是true
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {} //设定一个计算属性，将当前活跃的item设置color，color来自于props，用户点击时传过来
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path);
    }
  }
}
</script>

<style scoped>

.tab-bar-item{
   flex:1;
   text-align: center;
   height: 49px;
   font-size: 14px;
}
.tab-bar-item img{
	width: 20px;
	height: 20px;
	vertical-align: middle;
	margin:3px 0 2px;

}

</style>
