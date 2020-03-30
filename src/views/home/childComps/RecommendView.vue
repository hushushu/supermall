<template>
   <div class="recommend">
   		<div v-for="(item,index) in recommends" :key="index" class="recommend-item">
   			<a :href="item.link">
   				<img :src="item.image">
   				<div>{{item.title}}</div>
   			</a>
   		</div>
   </div>
</template>

<script>
	
	export default {
	  name: 'RecommendView',
	  props:{
	  	recommends:{
	  		type:Array,
	  		default(){
	  			return []
	  		}
	  	}
	  }
	}
</script>

<style scoped>
	.recommend{
		width: 100%;
		display: flex;
		padding:10px 0 15px;
		border-bottom: 8px #eee solid;
	}
	.recommend-item{
		flex:1;
		text-align: center;
	}
	.recommend-item img{
		margin-bottom: 10px;
		width: 68px;height: 68px;
	}

</style>
