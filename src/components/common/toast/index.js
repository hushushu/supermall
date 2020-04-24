import Toast from './Toast'
const obj = {}

//封装toast
obj.install = function (Vue) {
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  //2.new的方式，根据组件构造器，创建出来一个组件对象
  const toast = new toastConstructor()

  //3.将组件对象，手动的挂在到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.这时候 toast.$el 就有一个对应的div了
  document.body.appendChild(toast.$el)

  //5.添加到vue的原型上，方便在全局调用
  Vue.prototype.$toast = toast

}

export default obj
