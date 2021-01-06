<template>
  <div id="app">
    <v-header :seller = "seller"></v-header>
    <tab></tab>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header';
import { getSeller } from './api';
import Tab from './components/tab/tab';
// import Cart from './components/cart/cart';
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this._getSeller();
  },
  methods: {
    _getSeller() {
      getSeller().then((seller) => {
      this.seller = seller;
    })
    }
  },
  components: {
    VHeader,
    Tab
    // Cart
   }
}
</script>
<style lang="stylus">
#app
  position: relative
  height: 100vh
</style>
