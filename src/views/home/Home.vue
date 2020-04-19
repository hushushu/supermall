<template>
   <div id="home">
   	 <nav-bar class="home-nav">
   	 	<div slot="center">购物街</div>   	 	
   	 </nav-bar>
     <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabClick" 
                      ref="tabcontrol1"
                      class="tabcontrol"
                      v-show="isTabFixed" />
   	<scroll class="content" 
              ref="scroll" 
              :probe-type="3"  
              @scroll="contentScroll" 
              :pull-up-load="true"
              @pullingup="loadMore">
         <home-swiper :banners="banners" 
                      @swiperImageLoad="swiperImageLoad"/>
         <recommend-view :recommends="recommends"/>
         <feature />
         <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabClick" 
                      ref="tabcontrol2" />
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

	import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  export default {
	  name: 'Home',
	  components:{
	  	 NavBar,
	    HomeSwiper,
	    RecommendView,
	    Feature,
	    TabControl,
       GoodsList,
       Scroll
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
         tabcontrolOffset: 0,
         isTabFixed: false,
         saveY: 0  //记录离开之前的滚动y值
	  	}
	  },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated(){
      //获取离开之前的位置，状态信息
      // 并且，滚动到该位置,scroll的方法最好不要多封装了，容易报错
      //要先刷新，再滚动，否则会回弹到顶部
      this.$refs.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0,this.saveY)
    },
    deactivated(){
      //1.记录离开时的信息，获取到scroll的滚动y值
      this.saveY = this.$refs.scroll.scroll.y
      //2.取消监听全局事件
      this.$bus.$off('imgLoad', this.itemImgListener)
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
        //这里的内容使用了混入 mixin 在common/minxin.js中查看
    },
    mixins:[itemListenerMixin, backTopMixin],
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
          //tab被点击以后，同步更新两个tab-control的currentIndex
          this.$refs.tabcontrol1.currentIndex = index
          this.$refs.tabcontrol2.currentIndex = index
         },
         /*监听scroll滚动的值*/
         contentScroll(position){
           this.listenShowBackTop(position)
            //当滚动的y达到tabcontrolOffset的值，isTabFixed 为true
            this.isTabFixed = (-position.y) > this.tabcontrolOffset
         },
         /*上拉加载更多*/
         loadMore(){
           this.getHomeGoods(this.currentType) //加载更多商品，调用getHomeGoods         
         },
         // 监听swiper图片加载完成，判断tab-control的offsetTop的值
         swiperImageLoad(){
          this.tabcontrolOffset = this.$refs.tabcontrol2.$el.offsetTop
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
  .tabcontrol{
    position: relative;
    z-index: 9
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
