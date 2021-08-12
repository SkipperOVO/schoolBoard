<template>
  <div class="table-container">
    <BScrollWrapper ref="bsWrapper" @scrollToEnd="loadMore">
      <el-table class="table"
                select="selection"
                :data="tableData"
                border
                style="width: 100%">
        <el-table-column
            fixed
            prop="userId"
            label="账户ID"
            width="69">
        </el-table-column>
        <el-table-column
            prop="stuId"
            label="学号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="realName"
            label="姓名"
            width="80">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="昵称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="region"
            label="园区"
            width="60">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.row)" type="danger" size="small">删除</el-button>
            <!--          <el-button type="text" size="small">编辑</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </BScrollWrapper>
    <div class="search-bar">
      <el-input v-model="inputUserName" placeholder="用户昵称" style="padding-right: 0.265rem"></el-input>
      <el-button type="primary" @click="search(inputUserName)">搜索</el-button>
      <el-button type="primary" @click="fetch(0)">显示全部</el-button>
    </div>
  </div>
</template>

<script>
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "Admain",
  components: {BScrollWrapper},
  data() {
    return {
      tableData: [],
      curPage: 0,
      inputUserName: "",
    }
  },

  mounted() {
    this.fetch(this.curPage);

    this.$context.initBodyHeight();
  },


  methods: {

    fetch(curPage) {
      this.curPage = curPage;
      this.$axios.get(this.$context.serverUrl + "/getUsers?curPage=" + curPage)
          .then(response => {
            console.log(response.data.data)
            if (this.curPage == 0) {
              this.tableData = []
            }
            this.curPage += 1;
            this.tableData = this.tableData.concat(response.data.data);

            this.isLoaded = true;
            //刷新 better scroll
            this.$refs.bsWrapper.refresh();

          }).catch(error => {
        console.log(error);
      })
    },

    deleteRow(row) {
      this.$confirm('确认删除该用户所有信息？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        //删除操作
        this.$axios.get(this.$context.serverUrl + "/deleteUser?userId=" + row.userId)
            .then(() => {
              this.delete(row.userId);
              this.$refs.bsWrapper.refresh();
            }).catch(error => {
          console.log(error);
          this.$message({message: "好像出错了！等会再试试吧", type: "error", offset: 60});
        })
        this.$message({
          type: 'success',
          message: '删除成功!',
          offset: 80,
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          offset: 80,
        });
      });

    },

    delete(userId) {
      for (var i = 0; i < this.tableData.length; ++i) {
        var userPack = this.tableData[i];
        if (userPack.userId === userId) {
          this.tableData.splice(i, 1);
          break;
        }
      }
    },


    search(userName) {
      this.$axios.get(this.$context.serverUrl + "/getUserByUserName?userName=" + userName)
          .then(response => {
            console.log(response.data.data)
            this.curPage = 0;
            this.tableData = []
            this.tableData = this.tableData.concat(response.data.data);

            this.$refs.bsWrapper.refresh();

          }).catch(error => {
        console.log(error);
        this.$message({message: "好像出错了！等会再试试吧", type: "error", offset: 60});
      })
    },

    loadMore() {
      this.fetch(this.curPage);
    }
  },

}
</script>

<style scoped>

.table-container {
  height: inherit;
  margin: 2.653rem 1.592rem;
}

.wrapper {
  max-width: 570px;
  margin: 0 auto;
  height: inherit;
}

.table {
  width: fit-content;
  padding-bottom: 2.653rem;
}

.search-bar {
  position: fixed;
  display: flex;
  top: 1.724rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 400px;
}

.el-message-box {
  position: absolute !important;
  top: 25%;
  display: block !important;
  margin: 0 25%;
}
</style>