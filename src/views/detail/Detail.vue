<template>
   <div id="detail">
   		<detail-nav-bar class="nav-bar"/>
   		<!-- 引入detail的轮播图组件 -->
   		<scroll class="content" ref="scroll">   			
	   		<detail-swiper :top-images="topImages"/>
	   		<detail-base-info :goods="goods"/>
	   		<detail-shop-info :shop="shop"/>
	   		<detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
	   		<detail-param-info :param-info="paramInfo"/>
	   		<detail-comment-info :comment-info="commentInfo"/>
        <goods-list :goods="recommends"/>
   		</scroll>
   </div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'

	import Scroll from 'components/common/scroll/Scroll'

	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from "common/utils";
	import {itemListenerMixin} from "common/mixin";


  export default {
	  name: 'Detail',
	  components:{
	     DetailNavBar,
	     DetailSwiper,
	     DetailBaseInfo,
	     DetailShopInfo,
	     DetailGoodsInfo,
	     DetailParamInfo,
	     DetailCommentInfo,
	     Scroll,
       GoodsList
	  },
	  data(){
	  	return{
	  		id: null,
	  		topImages: [],
	  		goods:{},
	  		shop:{},
	  		detailInfo:{},
	  		paramInfo:{},
	  		commentInfo:{},
	  		recommends:[] //热门推荐数据
	  	}
	  },  
	  created(){
	  	//1.保存iid
	  	this.id = this.$route.params.iid
	  	//2.获取数据
	  	getDetail(this.id).then(res=>{
	  	//	console.log(res)
	  		const data = res.result

	  		//1.获取顶部轮播信息数据
	  		this.topImages = data.itemInfo.topImages

	  		//2.获取商品信息
	  		//数据的整合，用一个Goods类，再在DetailBaseInfo子组件中调用
	  		this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

	  		//3.创建店铺信息对象
	  		this.shop = new Shop(data.shopInfo)

	  		//4.保存商品详情展示
	  		this.detailInfo = data.detailInfo

	  		//5.商品参数信息展示
	  		this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

	  		//6.评价
	  		if(data.rate.list){
	  		   this.commentInfo = data.rate.list[0]
	  		}
	  	})
      getRecommend().then(res=>{
        console.log(res)
        this.recommends = res.data.list
      })
	  },
    destroyed(){
      this.$bus.$off('imgLoad', this.itemImgListener)
    },
    mixins:[itemListenerMixin],
	  methods:{
	  	imgLoad(){
	  		this.refresh()
	  	}
	  }
	}
</script>

<style scoped>
#detail{
	position: relative;
	z-index: 9;
	background-color: #fff;
	height: 100vh;
}
.nav-bar{
	position: relative;
	z-index: 9;
	background-color: #fff
}
.content{
	height: calc(100% - 44px)
}
</style>
