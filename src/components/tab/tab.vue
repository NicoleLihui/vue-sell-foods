<template>
  <div>
    <div class="tab border-1px">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评价</router-link>
      <router-link class="tab-item" to="/sellers">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.tab
  display: flex;
  width: 100%;
  height: 40px;
  border-1px(rgba(7, 17, 27, .1))
  .tab-item
    flex: 1;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
    &.active
      color: rgb(240, 20, 20)
</style>
