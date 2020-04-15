<template>
   <div id="home">
   	 <nav-bar class="home-nav">
   	 	<div slot="center">购物街</div>   	 	
   	 </nav-bar>

   	<scroll class="content" 
              ref="scroll" 
              :probe-type="3"  
              @scroll="contentScroll" 
              :pull-up-load="true"
              @pullingup="loadMore">
         <home-swiper :banners="banners"/>
         <recommend-view :recommends="recommends"/>
         <feature />
         <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" class="tab-control"/>
         <goods-list :goods="goods[currentType].list" />  
      </scroll>
   	<back-top @click.native="backTop" v-show="isShowBackTop"/>
   </div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import Feature from './childComps/Feature'

	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabcontrol/TabControl'
   import GoodsList from 'components/content/goods/GoodsList'
   import Scroll from 'components/common/scroll/Scroll'
   import BackTop from 'components/content/backTop/BackTop'

	import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'

	export default {
	  name: 'Home',
	  components:{
	  	 NavBar,
	    HomeSwiper,
	    RecommendView,
	    Feature,
	    TabControl,
       GoodsList,
       Scroll,
       BackTop
	  },
	  data(){
	  	return{
	  		banners:[],
	  		recommends:[],
         goods:{
            'pop':{page:0, list:[]},
            'new':{page:0, list:[]},
            'sell':{page:0, list:[]},
         },
         currentType: 'pop',//点击类型，默认是pop
         isShowBackTop: false
	  	}
	  },
	  created(){
        // 请求多个数据
	     this.getHomeMultidata()
        // 请求商品数据 根据商品类型分别请求
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell') 
	  },
    mounted(){
        //监听图片加载完成，避免卡顿现象
        /*使用 ‘事件总线’的处理方法
        给$bus赋值vue实例，确保在任意地方都可以调用
        Vue.prototype.$bus = new Vue()
        在goodsitem.vue中发射事件 this.$bus.$emit('事件名')，然后在home.vue中监听
        this.$bus.$on('事件名')*/

       //将 debounce 函数封装在util.js中 （防抖函数，延迟刷新）
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.$bus.$on('imgLoad',()=>{
          refresh()
        })
    },
     methods:{
         /*监听点击事件方法*/
         tabClick(index){
          //监听到子组件的点击事件，切换index
          switch(index){
            case 0:
               this.currentType = 'pop';
               break;
            case 1:
               this.currentType = 'new';
               break;
            case 2:
               this.currentType = 'sell';
               break;
          }
         },
         /*回到顶部*/
         backTop(){
            // scroll中有一个scrollTo()方法，其中有3个参数
            // x,y,毫秒
            //获取到当前的组件 $refs ，拿到组件内部的scroll对象，调用它的scrollTo方法
            this.$refs.scroll.bscroll.scrollTo(0,0,500)
         },
         /*监听scroll滚动的值*/
         contentScroll(position){
            //当滚动的y达到1000的时候，isShowBackTop 为true
            this.isShowBackTop = (-position.y) > 1000 
         },
         /*上拉加载更多*/
         loadMore(){
           this.getHomeGoods(this.currentType) //加载更多商品，调用getHomeGoods         
         },

         /*以下是网络请求方法*/
         getHomeMultidata(){
           getHomeMultidata().then(res =>{
               this.banners = res.data.banner.list;
               this.recommends = res.data.recommend.list;
              // console.log(this.banners)
            }) 
         },
         getHomeGoods(type){
            const page = this.goods[type].page + 1; 
            getHomeGoods(type, page).then(res => {
               this.goods[type].list.push(...res.data.list) 
               this.goods[type].page += 1 
               //当上拉加载数据加载完毕后，需要调用finishPullUp方法告诉 better-scroll 数据已加载
              //完成上拉加载更多
               this.$refs.scroll.finishPullUp()
            })
         }
     }
	}
</script>

<style scoped>
	#home{
      padding-top:44px;
      height: 100vh;
      position: relative;
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
      z-index:9;
	}
   .content{
      position: absolute;
      top:44px;
      bottom:49px;
      left: 0;
      right: 0;
      overflow: hidden;
   }
</style>
