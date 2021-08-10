<template>
  <div v-if="isLoaded" class="sale-container">
    <HeadPane></HeadPane>
    <div class="scroll-wrapper" ref="scrollWrapper">
      <el-main id="sale-main">
        <!--    公告板 复用 PostCard -->
        <!--        <PostCard is-p-n="true" id="public-notice" :postCardData="salePageData.publicNotice"></PostCard>-->

        <SaleItemCard v-for="(item,index) in saleItems"
                      :key="index" :saleItemData="item"></SaleItemCard>
      </el-main>
    </div>
    <!--  add a new post-->
    <AddPostButton></AddPostButton>
  </div>
</template>

<script>
import SaleItemCard from "@/components/SaleItemCard";
import BScroll from 'better-scroll';

// import PostCard from "@/components/PostCard";
import HeadPane from "@/components/HeadPane";
import AddPostButton from "@/components/AddPostButton";

export default {
  name: "Sale",
  components: {AddPostButton, HeadPane, /*PostCard,*/ SaleItemCard},
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
              "src": "http://qve6sr81v.hn-bkt.clouddn.com/1624883324777.jpg",
              "preview": ["http://qve6sr81v.hn-bkt.clouddn.com/1624883324777.jpg"]
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
      saleItems: [],
      curPage: 0,
      isLoaded: false,
      scroll: null,
      curSortBy: "sortByTime",
    }
  },

  // methods: {
  // setCookie: function (cname, cvalue, exdays) {
  //   var d = new Date();
  //   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //   var expires = "expires=" + d.toUTCString();
  //   console.info(cname + "=" + cvalue + "; " + expires);
  //   document.cookie = cname + "=" + cvalue + "; " + expires;
  //   console.info(document.cookie);
  // },
  // },


  mounted() {
    this.fetch("sortByTime", this.curPage);
    this.curPage += 1;
  },


  methods: {
    fetch(sortBy, curPage) {
      this.sortBy = sortBy;

      this.$axios.get(this.$context.serverUrl + "/getAllItem?sortBy=" + sortBy + "&curPage=" + curPage)
          .then(response => {
            console.log(response)
            this.saleItems = this.saleItems.concat(response.data.data['items']);
            if (response.data.data['user'] != undefined) {
              this.$context.setUserAction(response.data.data['user']);
            }

            this.isLoaded = true;
            //更新 Better scroll
            this.$context.initBodyHeight()
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.scrollWrapper, {click: true, tap: true})
                this.scroll.on('touchEnd', (pos) => {
                  console.log(pos.y)
                  // 下拉刷新
                  if (pos.y > 50) {
                    this.fetch(sortBy, 0);
                    this.clearPage();
                  }
                  //上拉加载更多

                })
              } else {
                this.scroll.refresh()
              }
            })
          })
          .catch(error => console.log(error))

      this.curPage += 1;
    },

    clearPage() {
      this.curPage = 0;
    }
  },


}
</script>

<style scoped>

.scroll-wrapper {
  height: inherit;
}

.sale-container {
  height: inherit;
}

#sale-main {
  display: flex !important;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 2.653rem;
}

</style>