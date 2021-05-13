<template>
  <el-main>
    <PostCard v-for="(post,index) in DeliveryPageData" :key="index" :post-card-data="post"></PostCard>
  </el-main>
</template>

<script>
import PostCard from "@/components/PostCard";

export default {
  name: "Delivery",
  components: {PostCard},
  data() {
    return {
      DeliveryPageData: [
        {
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
          "commentData": [
            {
              "userId": "123123",
              "userNickName": "user123",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
        {
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
          "commentData": [
            {
              "userId": "123123",
              "userNickName": "user123",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
        {
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
          "commentData": [
            {
              "userId": "123123",
              "userNickName": "user123",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>