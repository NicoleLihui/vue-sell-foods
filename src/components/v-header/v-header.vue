<template>
  <div class="header">
    <!-- header部分的内容 -->
    <div class="content-wrapper">
      <!-- 内容中的头像 -->
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" />
      </div>
      <!-- 内容中的文字描述部分 -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!-- 不同的support类型, 对应不同的icon图标, 需要做一个映射, 来一一对应 -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span>{{ seller.supports.length }}个</span>
        <i class="seller-icon"></i>
      </div>
    </div>
    <!-- header部分的公告栏 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="seller-icon"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star">
              <star :size="48" :score="seller.score" class="star"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <!-- 原代码中这里用的seller.supports[index].type ? -->
              <li class="support-item" v-for="(support, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="text">{{ support.description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家信息</div>
              <div class="line"></div>
            </div>
            <div class="seller-bulletin">
              <p class="text">{{ seller.bulletin }}</p>
            </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-delete" @click="detailClose"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    detailClose() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
};
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin';
  .header
    position: relative
    color: #fff
    background-color: rgba(7, 17, 27, .5)
    overflow: hidden
    .content-wrapper
      position: relative
      display: flex
      align-items: center
      padding: 24px 12px 18px 24px
      .avatar
        flex: 0 0 64px
        width: 64px
        margin-right: 16px
        img
          border-radius: 2px
      .content
        flex: 1
        .title
          display: flex
          align-items: center
          margin-bottom: 8px
          .brand
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 8px
            font-size: 16px
            font-weight: bold
        .description
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
        .support
          display: flex
          align-items: center
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.special
              bg-image('special_1')
            &.invoice
              bg-image('invoice_1')
            &.guarantee
              bg-image('guarantee_1')
          .text
            font-size: 10px

      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        display: flex
        align-items: center
        justify-content: center
        height: 24px
        border-radius: 14px
        background-color: rgba(0, 0, 0, .2)
        font-size: 10px
        padding-left: 8px
        .seller-icon
          font-family: 'icon-seller'
          margin-left: 2px
          padding-right: 8px

    .bulletin-wrapper
      display: flex
      align-items: center
      justify-content: space-between
      height: 28px
      padding: 0 8px
      background-color: rgba(0, 0, 0, .2)
      .bulletin-title
        flex: 0 0 22px
        width: 22px
        height: 12px
        margin-right: 4px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        flex: 1
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        font-size: 10px
      .seller-icon
        font-family: 'icon-seller'
        flex: 0 0 10px
        font-size: 10px

    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)

    .detail
      position: fixed
      z-index: 1
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      backdrop-filter: blur(10px)
      background-color: rgba(7, 17, 27, .8)
      &.fade-enter-active, &.fade-leave-active
        opacity: 1
        transition: all .5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          display: flex
          flex-direction: column
          align-items: center
          margin-top: 64px
          padding-bottom: 90px
          .name
            font-size: 16px
            font-weight: 700
            line-height: 16px
          .star
            margin-top: 18px
            padding: 2px 0
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, .3)
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin:0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.special
                  bg-image('special_2')
                &.invoice
                  bg-image('invoice_2')
                &.guarantee
                  bg-image('guarantee_2')
              .text
                font-size: 12px
                line-height: 12px
          .seller-bulletin
            width: 80%
            line-height: 24px
            .text
              padding: 0 12px
              font-size: 12px
      .detail-close
        width: 24px
        height: 24px
        margin: -64px auto 0 auto
        font-size: 24px
</style>
