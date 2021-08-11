<template>
      <el-container id="app">
        <el-header>
          <Header></Header>
        </el-header>
        <transition :name=this.$context.pageRouter.switchStyle >
          <router-view></router-view>
        </transition>
        <el-footer>
          <Navigator ref="nav-child" @changeSwitchState="changeSwitchState"></Navigator>
        </el-footer>

        <!--  add a new post-->
        <AddPostButton></AddPostButton>

      </el-container>
</template>

<script>

import Navigator from "@/components/Navigator";
import Header from "@/components/Header";
import AddPostButton from "@/components/AddPostButton";


export default {
  name: 'App',
  components: {
    Navigator,
    Header,
    AddPostButton,
  },
  data() {
    return {
      switchState: "none",
      switchStyle: "slide-left",
    };
  },


  created() {
    this.$router.beforeEach((to, from, next) => {
      this.$context.switchPageContext(from.name,to.name)
      next();
    });
  },

  methods: {
    changeSwitchState() {
      if (this.$refs["nav-child"].isBack) {
        this.switchStyle = "slide-right";
      } else {
        this.switchStyle = "slide-left";
      }
    },
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: inherit;
}

body {
  background-color: white;
  margin: 0;
}


main.el-main {
  min-height: 70%;
  margin-top: 2.52rem;
  padding: 0;
  margin-bottom: 1.759rem;
  background-color: white;
  overflow: inherit;
}


footer.el-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: white;
  border-top: 1px #f1e7de solid;

  z-index: 65535;

  height: 1.759rem !important;
  max-height: 70px;
  min-height: 40px;
}

header.el-header {
  display: flex;

  align-items: center;
  justify-content: space-around;

  height: 1.459rem !important;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0;

  background-color: #61dca9;

  z-index: 65535;

}

/*---------postCard---------- */

/*设置图片预览时组件的位置*/
.el-image-viewer__actions {
  margin-bottom: 2rem;
}

.el-image-viewer__close {
  margin-top: 2rem;

}

/*走马灯样式重写*/
.el-carousel__item {
  width: 65%;
  border-radius: 0.106rem;
}

/*设置走马灯图片按比例缩小在容器中*/
.carousel-img-container img {
  height: inherit;
  width: inherit;
  max-height: 6.101rem;
  border-radius: 0.106rem;
}

.img-box .el-image img {
  height: inherit;
  width: auto;
  max-height: 2.387rem;
}

/*----------------------*/

/*价格样式*/
.price {
  /*position: absolute;*/
  font-size: 0.477rem;

  /*bottom: 0.008rem;*/
  /*text-align: center;*/

  color: red;
}

/*评论区样式*/
.comment-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 84% !important;
  margin: 0 0.663rem 0 0.663rem;
  padding: 0.106rem;

  background-color: rgba(243, 245, 248, 0.78);
  border-radius: 3px;
}


/*弹出的输入框样式重写*/
.el-message-box {
  position: absolute !important;
  bottom: 1.5rem;

  display: block !important;

  width: 100% !important;
}


.slide-left {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.slide-left-enter, .slide-right-leave-to {
  position: fixed;
  left: 0;
  right: 0;
  transform: translateX(100%);
}

.slide-left-leave-to, .slide-right-enter {
  position: fixed;
  left: 0;
  right: 0;
  transform: translateX(-100%);
}

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: 450ms;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}


.slide-right {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.slide-left-leave-to, .slide-right-enter {
  position: fixed;
  left: 0;
  right: 0;
  transform: translateX(-100%);
}

.slide-left-enter, .slide-right-leave-to {
  position: fixed;
  left: 0;
  right: 0;
  transform: translateX(100%);
}

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: 450ms;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}



</style>

