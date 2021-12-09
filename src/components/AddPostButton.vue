<template>
  <div ref="ABmain" v-if="this.$context.pageRouter.currentPage === 'sale'
                            || this.$context.pageRouter.currentPage === 'delivery'
                            || this.$context.pageRouter.currentPage === 'study'" id="add-post"  @click="addPost">
    <i class="el-icon-circle-plus"></i>
  </div>
</template>

<script>
export default {
  name: "AddPostButton",


  methods: {
    addPost() {
      if (this.$context.isLogin() == false) {
        this.$router.replace("/login");
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
  position: absolute;
  bottom: 2.255rem;
  right: 0.796rem;
  color: #5ab367;
  font-size: 1.326rem;
  transition: 0.2s;
  z-index: 100;
}

#add-post:active {

  color: #75c78d;
  font-size: 1.426rem;
}

</style>