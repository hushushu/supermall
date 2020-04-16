<template>
   <div id="detail">
   		<DetailNavBar/>
   		<!-- 引入detail的轮播图组件 -->
   		<DetailSwiper :top-images="topImages"/>
   </div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'

	import {getDetail} from 'network/detail'


	export default {
	  name: 'Detail',
	  components:{
	     DetailNavBar,
	     DetailSwiper
	  },
	  data(){
	  	return{
	  		id: null,
	  		topImages: []
	  	}
	  },  
	  created(){
	  	//1.保存iid
	  	this.id = this.$route.params.iid
	  	//2.获取数据
	  	getDetail(this.id).then(res=>{
	  		console.log(res)
	  		this.topImages = res.result.itemInfo.topImages
	  	})
	  }
	}
</script>

<style scoped>

</style>
