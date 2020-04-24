<template>
   <div id="detail">
   		<detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="nav"/>
   		<!-- 引入detail的轮播图组件 -->
   		<scroll class="content"
              ref="scroll"
              @scroll="contentScroll"
              :probeType="3">
	   		<detail-swiper :top-images="topImages"/>
	   		<detail-base-info :goods="goods"/>
	   		<detail-shop-info :shop="shop"/>
	   		<detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
	   		<detail-param-info :param-info="paramInfo" ref="params"/>
	   		<detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <goods-list :goods="recommends" ref="recommend"/>
   		</scroll>
     <detail-bottom-bar @carClick="addTocart" />
     <back-top @click.native="backTop" v-show="isShowBackTop"/>
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
  import DetailBottomBar from './childComps/DetailBottomBar'
  import GoodsList from 'components/content/goods/GoodsList'

	import Scroll from 'components/common/scroll/Scroll'

	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from "common/utils";
	import {itemListenerMixin, backTopMixin} from "common/mixin";

	import { mapActions } from 'vuex'
  import Toast from "../../components/common/toast/Toast";


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
       GoodsList,
       DetailBottomBar
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
	  		recommends:[], //热门推荐数据
        themeTopYs:[], //顶部导航栏的y值
        getThemeTopYs:null, //顶部导航栏的防抖对象
        currentIndex: 0
	  	}
	  },  
	  created(){
	  	//1.保存iid
	  	this.id = this.$route.params.iid
	  	//2.获取数据
	  	getDetail(this.id).then(res=>{
	  	  console.log(res)
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
        //console.log(res)
        this.recommends = res.data.list
      })
      //4.给 getThemeTopYs赋值 并且给图片加载防抖
      this.getThemeTopYs = debounce(()=>{
        //这里使用了 $nextTick()方法：等数据都更新完成，再进行一次回调
        //this.$nextTick(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        //console.log(this.themeTopYs);
        // })
      },200)

    },
    destroyed(){
      this.$bus.$off('imgLoad', this.itemImgListener)
    },
    mixins:[itemListenerMixin, backTopMixin],
	  methods:{
	    ...mapActions(['addCart']),
	  	imgLoad(){
	  		this.refresh()
        this.getThemeTopYs() //执行图片防抖，并且给themeTopYs赋值
	  	},
      titleClick(index){
       // console.log(index);
       // console.log(this.themeTopYs[index]);
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position){
	  	  //获取滚动的y值，判断滚动的位置，给顶部的导航赋值Y
        const positionY = -position.y
        //console.log(positionY)

        //在数组最后多添加一个 Number.MAX_VALUE，然后在循环中 length-1

        let length = this.themeTopYs.length;
        for (let i = 0; i < length-1; i++){
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      // 是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addTocart(){
	      //1.获取购物车需要展示的信息
	  	  const product = {}
	  	  product.image = this.topImages[0];
	  	  product.title = this.goods.title;
	  	  product.desc = this.goods.desc;
	  	  product.newPrice = this.goods.nowPrice;
	  	  product.iid = this.id;

        //console.log(product);
        //2.将商品添加到购物车里 (1.Promise 2.mapActions)
        //这里需要用到vuex，将数据保存在state中，然后再在购物车中取出
        //this.$store.commit('addCart', product) //提交到mutations中
        //提交到actions中派发事件，使得mutations中只做简单的状态判断，不过多处理事件
        //使用promise返回值，做成功回调
        /*this.$store.dispatch('addCart', product).then(res =>{
            console.log(res)
        })*/
        //使用mapActions映射
        this.addCart(product).then(res =>{
         // console.log(res)
          this.$toast.show(res, 1500)
        })


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
	background-color: #fff;
}
.content{
	height: calc(100% - 44px - 58px)
}
</style>
