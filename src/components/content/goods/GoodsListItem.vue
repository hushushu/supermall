<template>
	<div class="goodsItem">		 	
	 	<img :src="goodsItem.show.img" alt="" @load="imgLoad">
	 	<div class="goods-info">
	 		<p>{{goodsItem.title}}</p>
	 		<span class="price">{{goodsItem.price}}</span>
	 		<span class="collect">{{goodsItem.cfav}}</span>
	 	</div>
    </div>
</template>

<script>
	export default {
	  name: 'GoodsListItem',
	  props:{
	  	goodsItem:{
	  		type:Object,
	  		default(){
	  			return {}
	  		}
	  	}
	  },
	  methods:{
	  	//@load="imgLoad" 是vue中的监听图片加载完成的方法
	  	//监听每一张图片加载完成，发射方法，在vue中监听
	  	imgLoad(){
	  		this.$bus.$emit('imgLoad')
	  	}
	  }
	 
	}
</script>

<style scoped>
	.goodsItem{
		padding-bottom: 40px;
		position: relative;
		width: 48%;
	}
	.goodsItem img{
		width: 100%;
		border-radius: 5px;
	}
	.goods-info{
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	.goods-info p{
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;  
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.goods-info .price{
		color: var(--color-high-text);
		margin-right: 20px;
	}
	.goods-info .collect{
		position: relative;
	}


</style>

