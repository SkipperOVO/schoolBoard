<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <router-view></router-view>
      <el-footer>
        <Navigator></Navigator>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import Navigator from "@/components/Navigator";
import Header from "@/components/Header";
// import Sale from "@/pages/Sale"
// import Delivery from "@/pages/Delivery"
// import Study from "@/pages/Study"
// import User from "@/pages/User"


export default {
  name: 'App',
  components: {
    Navigator,
    Header

  },
  data() {
    return {
      isUserPage:false
    }
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
}

body {
  background-color: white;
  margin:0;
}


main.el-main {
  /*min-height: 15rem;*/
  margin-top: 2.122rem;
  padding:    0;
  overflow: scroll;
  margin-bottom: 1.459rem;
}

footer.el-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: white;
  border-top: 1px #f1e7de solid;

  z-index: 65535;

  height: 1.459rem !important;
  max-height: 70px;
  min-height: 40px;
}

header.el-header {
  display: flex;

  align-items: center;
  justify-content: space-around;

  height:           1.459rem !important;
  position:         fixed;
  top:              0;
  right:            0;
  left:             0;
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
  max-height: 3.183rem;
}
/*----------------------*/

/*价格样式*/
.price {
  /*position: absolute;*/
  font-size: 0.531rem;

  bottom: 0.008rem;
  text-align: center;

  color: red;
}

/*评论区样式*/
.comment-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 84%;
  margin: 0 0.663rem 0 0.663rem;
  padding: 0.106rem;

  background-color: rgba(243, 245, 248, 0.78);
  border-radius: 3px;
}


.comment-user-name {
  padding-right: 0.106rem;
  color: #868686f5;
}

.comment-item {
  color: #6f6f72;
  font-size: 0.265rem;
  padding: 0.053rem;
}

</style>
