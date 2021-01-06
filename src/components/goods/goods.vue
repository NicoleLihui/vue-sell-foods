<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuwrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="menu-item">
                  <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                  <span class="text border-1px">{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodswrapper">
            <ul>
                <li v-for="(item,index) in goods" class="food-list" :key="index">
                    <h1 class="title">{{ item.name }}</h1>
                    <ul>
                        <li v-for="(food,index) in item.foods" class="food-item border-1px" :key="index">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" />
                            </div>
                            <div class="content">
                                <h2 class="name">{{ food.name }}</h2>
                                <p class="desc">{{ food.description }}</p>
                                <div class="extra">
                                    <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                                    <div class="price">
                                        <span class="now">￥{{ food.price }}</span>
                                        <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getGoods } from '../../api';
import BScroll from 'better-scroll';

export default {
    data() {
        return {
            goods: []
        }
    },
    created() {
        this._getGoods();
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted() {
      this.$nextTick(() => {
        this.menuScroll = new BScroll(this.$refs.menuwrapper, {});
        this.foodsScroll = new BScroll(this.$refs.foodswrapper, {});
        })
    },
    methods: {
        _getGoods() {
            getGoods().then((goods) => {
              this.goods = goods;
    })
        }
    }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl';

.goods
  display:flex
  position: absolute
  width: 100%
  top: 176px
  bottom: 46px
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background-color: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      line-height: 14px
      padding: 0 12px
      .icon
        display: inline-block
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.special
          bg-image('special_3')
        &.invoice
          bg-image('invoice_3')
        &.guarantee
          bg-image('guarantee_3')
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, .1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background-color: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, .1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          margin-bottom: 8px
          line-height: 12px
        .extra
          .count
            margin-right: 12px
        .price
          line-height: 24px
          .now
            font-weight: 700
            margin-right: 18px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
