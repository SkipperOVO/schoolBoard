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
      this.$router.push("/post");
    }
  }
}
</script>

<style scoped>

</style>