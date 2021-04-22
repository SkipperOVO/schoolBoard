<template>
  <el-row id="head-pane" type="flex" justify="center" >
    <el-col :span="12">
        <a style="color:#989ea5">最新</a>
    </el-col>
    <el-col :span='12'>
      <a style="color:#989ea5">最热</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HeadPane"
}
</script>

<style scoped>

#head-pane {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;

  height: 0.7rem;

  background-color: white;

  align-items: center;
}

</style>