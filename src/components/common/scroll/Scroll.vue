<template>
  <div class="wrapper" ref="wrapper">
  	<div class="content">
  		<slot></slot>  		
  	</div>
  </div>
</template>

<script>
	import scroll from 'better-scroll'

	export default {
	  name: 'Scroll',
	  props:{
	  	probeType:{
	  		type: Number,
	  		default: 0
	  	},
	  	pullUpLoad:{
	  		type: Boolean,
	  		default: false
	  	}
	  },
	  data(){
	  	return{
	  		scroll: null
	  	}
	  },
	  mounted(){
	  	    // 1.创建scroll对象
  			this.scroll = new scroll(this.$refs.wrapper,{	  			
		  		click: true,
		  		/*
					probeType 的几个数值：
					0和1，都是不侦测位置
					2，侦测实时位置，仅限手指滚动
					3，全都侦测，包括滑动
					这里两个属性都是灵活的，如果引用的时候不需要侦测滚动位置，就把probeType传0，如果不需要监听上拉事件，则pullUpLoad为false
		  		*/
		  		probeType: this.probeType, 
		  		pullUpLoad: this.pullUpLoad
	     	})

	     	// 2.侦测滚动实时位置
			this.scroll.on('scroll',(position)=>{
			 	this.$emit('scroll', position)
			}) 

			// 3.监听上拉事件 滚动到底部
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',()=>{	
					this.$emit('pullingup')
				})
			}
	  
	  },
	  methods: {
	  
	  	finishPullUp(){
	  		this.scroll && this.scroll.finishPullUp()
	  	},
	  	refresh(){
	  		this.scroll && this.scroll.refresh()
	  	},
	  	getScrollY(){
	  		//将滚动的y值返回
	  		return this.scroll ? this.scroll.y : 0
	  	}
	  }
	}
</script>

<style scoped>

</style>
