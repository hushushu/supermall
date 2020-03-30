import {request} from 'network/request';

//创建一个home的请求js，这样所有home的数据请求都在这里修改，不会造成页面耦合，
//在home.vue中调用getHomeMultidata().then就可以了

export function getHomeMultidata(){
	return request({
		url:'/home/multidata'
	})
}

export function getHomeGoods(type,page){
	//请求首页goods的数据，有两个参数 ：请求的类型，和页码
	return request({
		url:'/home/data',
		params:{
			type,
			page
		}
	})
}