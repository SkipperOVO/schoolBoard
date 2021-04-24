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
  background-color: #fbf9f4b8;
  margin:0;
}


main.el-main {
  /*min-height: 15rem;*/
  margin-top: 2.122rem;
  padding:    0;
  overflow: scroll;
  margin-bottom: 0.8rem;
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


</style>
