<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>

      <el-main>
        <sale-item-card></sale-item-card>
        <sale-item-card></sale-item-card>
        <sale-item-card></sale-item-card>
        <sale-item-card></sale-item-card>
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
import SaleItemCard from "@/components/SaleItemCard";

export default {
  name: 'App',
  components: {
    SaleItemCard,
    Navigator,
    Header
  },
  data() {
    return {
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
  min-height: 15rem;
  margin-top: 1rem;
  padding:    0;
}

footer.el-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: white;
  border-top: 1px #f1e7de solid;
}

header.el-header {
  background-color: #61dca9;
  height:           1rem !important;
  position:         fixed;
  top:              0;
  right:            0;
  left:             0;
  padding: 0;

}

.sale-item {

}
</style>
