import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null,
      refresh: null
    }
  },
  mounted(){
    //监听图片加载完成，避免卡顿现象
    /*使用 ‘事件总线’的处理方法
    给$bus赋值vue实例，确保在任意地方都可以调用
    Vue.prototype.$bus = new Vue()
    在goodsitem.vue中发射事件 this.$bus.$emit('事件名')，然后在home.vue中监听
    this.$bus.$on('事件名')*/

    //将 debounce 函数封装在util.js中 （防抖函数，延迟刷新）
    this.refresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () =>{
      this.refresh()
    }
    this.$bus.$on('imgLoad', this.itemImgListener)
    console.log('我是混入中的内容');
  }

}
