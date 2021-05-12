<template>
  <el-row class="head-pane" type="flex" justify="center" >
    <button class="head-pane-btn">
        <span>最新</span>
    </button>
    <button class="head-pane-btn {{}}">
      <span>最热</span>
    </button>
  </el-row>
</template>

<script>
export default {
  name: "HeadPane"
}
</script>

<style scoped>

.head-pane {
  position: fixed;
  top: 1.459rem;
  left: 0;
  right: 0;

  display: flex;
  height: 0.849rem;

  background-color: white;

  align-items: center;
  z-index: 65535;
}

.head-pane-btn:visited {
  background-color: #ec87d2 !important;
}

.head-pane-btn:active {
  background-color: #61dca9;
}

.head-pane-btn {
  height: 100%;
  width: 100%;
  /*padding: 0.08rem 0.186rem 0.08rem 0.186rem;*/
  border-radius: 4px;
  border-width: 0;
  color: #818989;

  display: flex;
  align-items: center;
  justify-content: center;

}

.head-pane-btn span {
  font-size: 0.424rem;
}


</style>