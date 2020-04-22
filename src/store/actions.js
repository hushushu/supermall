import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'
export default {
    addCart(context, payload){
      return new Promise((resolve,reject)=> {
        //1.for循环判断
        /* let oldProduct = null
         for (let item of state.cartList){
           if (item.iid === payload.iid){
             oldProduct = item
             //console.log(item.iid)
           }
         }*/
        //2.find()方法判断 state中是否有传过来的product的iid，如果有，则return给oldProduct
        let oldProduct = context.state.cartList.find(function (item) {
          return item.iid === payload.iid
        })

        if (oldProduct) {
          // oldProduct.count += 1
          context.commit(ADD_COUNTER, oldProduct)
          resolve('商品添加+1')
        } else {
          payload.count = 1
          context.commit(ADD_TO_CART, payload)
          //state.cartList.push(payload)
          resolve('添加商品成功')
        }
      })
    }

}
