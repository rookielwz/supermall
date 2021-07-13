export default {
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    payload.check = true
    state.cartList.push(payload)
  }
}