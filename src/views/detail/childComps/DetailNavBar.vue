<template>
   <div>
   		<NavBar >
   			<div slot="left">
   				<img src="~assets/img/common/back.svg" alt="" class="back" @click="back">
   			</div>
   			<div slot="center"  class="title">
   				<div  v-for="(item,index) in titles"
   				      class="title-item" 
   				      :class="{active: currentIndex === index}" @click="titleClick(index)">
   					{{item}}
   				</div>
   			</div>
   		</NavBar>
   </div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	export default {
	  name: 'DetailNavBar',
	  components:{
	  	NavBar
	  },
	  data(){
	  	return{
	  		titles:['商品','参数','评论','推荐'],
	  		currentIndex: 0
	  	}
	  },
	  created(){
	  },
	  methods:{
	  	titleClick(index){
	  		this.currentIndex = index
	  	},
	  	back(){
	  		this.$router.back()
	  	}
	  }
	}
</script>

<style scoped>
  .title{
  	display: flex;
  }
  .title-item{
  	flex:1;
  	font-size: 13px;
  }
  .active{
  	color: var(--color-high-text);
  }
  .back{
  	margin-top:10px;
  }
</style>
