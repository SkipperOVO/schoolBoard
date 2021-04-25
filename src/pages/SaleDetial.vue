<template>
  <el-main>
    <el-col class="sale-detial-container">
      <el-row  class="carousel-box">
        <el-carousel height="6.101rem">
          <el-carousel-item>
            <el-image class="carousel-img-container" src="https://images.pexels.com/photos/4675531/pexels-photo-4675531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      fit="fill"
                      :preview-src-list="prelist"></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image class="carousel-img-container" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      fit="fill"
                      :preview-src-list="prelist"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <el-row>
        <el-col class="sale-title">
          <span>商品名称</span>
        </el-col>
        <el-col class="price">
          <span>￥</span><span>5</span>
        </el-col>
        <el-col class="sale-description">
          <span>在工作中经常需要对图片进行缩放,但有些缩放会让图片变形,所以今天就给大家介绍 CSS如何实现图片等比例缩放不变形,正在学习CSS的小伙伴赶紧过</span>
        </el-col>
        <el-col class="operation-area">
          <el-button>说点啥</el-button>
          <el-button>喜欢</el-button>
        </el-col>
      </el-row>
      <el-row class="comment-box">
        <el-row><span class="comment-user-name">user123:</span><span class="comment-item">我可以帮忙取</span></el-row>
        <el-row><span class="comment-user-name">user123:</span><span class="comment-item">闪电速递为您服务</span></el-row>
        <el-row><span class="comment-user-name">user123:</span><span class="comment-item">雷打不动的取快递机器人</span></el-row>
      </el-row>
    </el-col>
  </el-main>
</template>

<script>
export default {
  name: "SaleDetial",
  data() {
    return {
      prelist:["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      "https://images.pexels.com/photos/4675531/pexels-photo-4675531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
    }
  }
}
</script>

<style scoped>

.carousel-box {
  display: flex;
  justify-content: center;
}

.carousel-box el-carousel {
  width: 60%;
}

.el-carousel--horizontal {
  overflow-x: hidden;
  width: 60%;
}


</style>