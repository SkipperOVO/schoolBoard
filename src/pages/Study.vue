<template>
  <el-main>
    <HeadPane></HeadPane>
    <PostCard></PostCard>
    <PostCard></PostCard>
    <PostCard></PostCard>
  </el-main>
</template>

<script>
import PostCard from "@/components/PostCard";
import HeadPane from "@/components/HeadPane";

export default {
  name: "Study",
  components: {HeadPane, PostCard}
}
</script>

<style scoped>


</style>