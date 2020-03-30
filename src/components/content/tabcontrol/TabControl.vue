<template>
	<div  class="tab-control">	
	   <div v-for="(item, index) in titles" 
		    class="tab-control-item" 
		    :key="index"
		    @click="tabControl(index)" :class="{active: currentIndex == index}">
	   		<span>{{item}}</span>
	   </div>
   </div>
</template>

<script>
	export default {
	  name: 'TabControl',
	  props:{
	  	titles:{
	  		type: Array,
	  		default(){
	  			return []
	  		}
	  	}
	  },
	  data(){
	  	return{
	  		currentIndex: 0
	  	}
	  },
	  methods:{
	  	tabControl(index){
	  		this.currentIndex = index
	  	}
	  }
	}
</script>

<style scoped>
	.tab-control{
		display: flex;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		background-color: #fff;
	}
	.tab-control-item{
		flex: 1;	
	}
	.tab-control-item span{
		padding:5px;
	}
	.active{
		color: var(--color-height-text);
	}
	.active span{
		border-bottom: 3px solid var(--color-tint);	
	}
</style>
