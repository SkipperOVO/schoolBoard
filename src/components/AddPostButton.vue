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

</style>