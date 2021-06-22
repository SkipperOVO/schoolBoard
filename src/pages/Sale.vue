<template>
  <keep-alive>
    <div>
      <HeadPane></HeadPane>
      <el-main>
        <!--    公告板 复用 PostCard -->
        <PostCard is-p-n="true" id="public-notice" :postCardData="salePageData.publicNotice"></PostCard>

        <SaleItemCard v-for="(item,index) in saleItems"
                      :key="index" :saleItemData="item"></SaleItemCard>
      </el-main>
      <!--  add a new post-->
      <AddPostButton></AddPostButton>
    </div>
  </keep-alive>
</template>

<script>
import SaleItemCard from "@/components/SaleItemCard";
import PostCard from "@/components/PostCard";
import HeadPane from "@/components/HeadPane";
import AddPostButton from "@/components/AddPostButton";

export default {
  name: "Sale",
  components: {AddPostButton, HeadPane, PostCard, SaleItemCard},
  data() {
    return {
      salePageData: {
        "publicNotice": {
          "userId": "123123",
          "userAvatar": "",
          "userNickName": "用户123",
          "postContent": "求星期三下午13点从南门取快递到北门，放到门口就行。",
          "timeStamp": "2020-12-03",
          "imgList": [
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"]
            },
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"],
            },
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"]
            },
          ],
        },
        "saleItemList": [
          {
            "itemID": "123123",
            "itemName": "旧汉堡扒",
            "imgSrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "likes": 12
          },
          {
            "itemID": "123123",
            "itemName": "旧汉堡扒",
            "imgSrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "likes": 12
          },
        ],
      },
      saleItems: null,
    }
  },
  mounted() {
    this.$axios.get('http://localhost:8080/')
        .then(response => {
          console.log(response);
          this.saleItems = response.data.data;
        })
        .catch(error => console.log(error))
  }
}
</script>

<style scoped>


.el-main {
  display: flex !important;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1.459rem;
}

</style>