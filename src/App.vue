<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
        <HeadPane></HeadPane>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Navigator></Navigator>
      </el-footer>
    </el-container>
  </div>
</template>

<script>


import Navigator from "@/components/Navigator";
import Header from "@/components/Header";
import HeadPane from "@/components/HeadPane";
// import Sale from "@/pages/Sale"
// import Delivery from "@/pages/Delivery"
// import Study from "@/pages/Study"
// import User from "@/pages/User"


export default {
  name: 'App',
  components: {
    HeadPane,
    Navigator,
    Header

  },
  data() {
    return {
    }
  }
}
//
// const routes = [
//   {path: '/sale',component: Sale},
//   {path: '/delivery',component: Delivery},
//   {path: '/study',component: Study},
//   {path: '/user',component: User},
// ]

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
  background-color: #fbf9f4b8;
  margin:0;
}


main.el-main {
  min-height: 15rem;
  margin-top: 1rem;
  padding:    0;
  overflow: scroll;
  margin-bottom: 1rem;
}

footer.el-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: white;
  border-top: 1px #f1e7de solid;

  z-index: 65535;
}

header.el-header {
  height:           1rem !important;
  position:         fixed;
  top:              0;
  right:            0;
  left:             0;
  padding: 0;

  background-color: #61dca9;

  z-index: 65535;

}

</style>
