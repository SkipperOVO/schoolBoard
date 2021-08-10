<template>
  <div id="add-post"  @click="addPost">
    <i class="el-icon-circle-plus"></i>
  </div>
</template>

<script>
export default {
  name: "AddPostButton",
  methods: {
    addPost() {
      if (this.$context.isLogin() == false) {
        this.$router.push("/login");
      } else {
        this.$router.push("/post");
      }
    }
  }
}
</script>

<style scoped>

/*post 按钮样式*/
#add-post {
  position: fixed;
  bottom: 1.857rem;
  right: 0.796rem;

  color: #5ab367;
  font-size: 1.326rem;
  transition: 0.2s;
}

#add-post:active {

  color: #75c78d;
  font-size: 1.426rem;
}

</style>