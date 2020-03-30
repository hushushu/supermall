<template>
   <div id="home">
   	 <nav-bar class="home-nav">
   	 	<div slot="center">购物街</div>   	 	
   	 </nav-bar>
   	<home-swiper :banners="banners"/>
   	<recommend-view :recommends="recommends"/>
   	<feature />
   	<tab-control :titles="['流行','新款','精选']" class="tab-control"/>

   	<ul>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>	
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>
   		<li>1</li>
   		<li>3</li>
   		<li>1</li>		   		
   	</ul>
   </div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import Feature from './childComps/Feature'


	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabcontrol/TabControl'

	import {getHomeMultidata, getHomeGoods} from 'network/home'

	export default {
	  name: 'Home',
	  components:{
	  	NavBar,
	    HomeSwiper,
	    RecommendView,
	    Feature,
	    TabControl
	  },
	  data(){
	  	return{
	  		banners:[],
	  		recommends:[],
         goods:{
            'pop':{page:0, list:[]},
            'news':{page:0, list:[]},
            'sell':{page:0, list:[]},
         }
	  	}
	  },
	  created(){
	     this.getHomeMultidata()
        this.getHomeGoods('pop')
	  },
     methods:{
         getHomeMultidata(){
           getHomeMultidata().then(res =>{
               this.banners = res.data.banner.list;
               this.recommends = res.data.recommend.list;
              // console.log(this.banners)
            }) 
         },
         getHomeGoods(type){
            const page = this.goods[type].page; //将商品类型和页数传过来
            getHomeGoods(type, page).then(res=>{
               console.log(res)
               //这里需要老师的后台数据接口，再继续
            })
         }
     }
	}
</script>

<style scoped>
	#home{
		padding-bottom:54px;
	}
	.home-nav{
		background-color: var(--color-tint); 
		color: #fff;

		position: fixed;
		left: 0;
		right: 0;
		top:0;
		z-index: 9;
	}
	.home-swiper{
		padding-top:44px;
	}
	.tab-control{
		position: sticky;
		top:44px;
	}
</style>
