<template>
  <div id="app">
    <!-- keep-alive表示缓存 detail页面不需要缓存 exclude：不包含-->
  	<keep-alive exclude="Detail">  		
  		<router-view></router-view>
  	</keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'
export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
