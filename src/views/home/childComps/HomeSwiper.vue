<template>
        <swiper>
   	 		<swiper-item v-for="(item,index) in banners" :key="index">
   	 			<a :href="item.link">
   	 				<img :src="item.image" alt="" @load="imageLoad">
   	 			</a>
   	 		</swiper-item>
   	 	</swiper>
</template>

<script>	
	import {Swiper,SwiperItem} from 'components/common/swiper'

	export default {
	  name: 'HomeSwiper',
	  props:{
	  	banners:{
	  		type:Array,
	  		default(){
	  			return []
	  		}
	  	}
	  },
	  data(){
	  	return{
	  		isLoad: false
	  	}
	  },
	  components:{
	  	Swiper,
	  	SwiperItem
	  },
	  methods:{
	  	imageLoad(){
	  		//监听图片加载完成，获取图片的高度，只需要一次
	  		//避免发送多次请求，做一个判断
	  		if(!this.isLoad){	  			
	  		   this.$emit('swiperImageLoad')
	  		   this.isLoad = true
	  		}

	  	}
	  }
	}
</script>

<style scoped>

</style>
