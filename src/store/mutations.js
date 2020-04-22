import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'
export default {
  [ADD_COUNTER](state, payload){
    //已有商品+1
    payload.count ++
  },
  //新商品添加到cartList中
  [ADD_TO_CART](state, payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}
