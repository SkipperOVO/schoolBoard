<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name:"BScrollWrapper",

  data() {
    return {
      scroll: null,
    }
  },

  mounted(){
    setTimeout(() => {
      this._initScroll()
    }, 20)


  },

  methods:{

    _initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        tap:true,
        pullDownRefresh:true,//这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新
        pullUpLoad:true, //这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载
        useTransition: false,
      });

      //上拉加载更多
      this.scroll.on('scrollEnd', () => {
        // 滚动到底部
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.$emit('scrollToEnd')
        }
      });

      //下拉刷新
      this.scroll.on('touchEnd', (pos) => {
        // 下拉动作
        if (pos.y > 50) {
          this.$emit('pullDown')
        }
      });
    },

    refresh() {
      this.scroll.refresh();
    },

    scrollToEnd() {
      this.scroll.scrollTo(0, this.scroll.maxScrollY, 600);
    },


    scollToEndNoDelay() {
      this.scroll.scrollTo(0,this.scroll.maxScrollY)
    }

  }
}
</script>


<style>
.wrapper{
  height: inherit;
}
</style>