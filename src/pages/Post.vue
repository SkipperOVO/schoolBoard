<template>
  <el-main>
    <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textContent">
    </el-input>
    <el-upload class="img-upload-box"
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="fileChange">
      <i slot="default" class="el-icon-camera-solid" style="color: #aab4b0;font-size: 0.928rem"></i>
      <div slot="file" slot-scope="{file}">
        <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
        >
        <span class="el-upload-list__item-actions">
        <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
      </div>
    </el-upload>
    <el-button @click="sendPost" type="success" round>发布</el-button>
  </el-main>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      textContent: "",
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadedImgs: [123,321,444]
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url)
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },

    fileChange(file) {
      console.log(file)
      //pass 上传一张图片到对象服务器

    },

    sendPost() {
      let formData = new FormData();
      formData.append('uploadedImgs', this.uploadedImgs);
      formData.append('content',this.textContent);
      this.$axios.post("http://localhost:8081/addPost",formData)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })

    }
  }
}
</script>

<style>

.el-upload--picture-card {
  height: 2.122rem;
  width: 2.122rem;
  line-height: normal;
}

.el-upload {
  display: flex;
  align-content: space-around;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

/*修改上传图像缩略图外框大小*/
.el-upload-list--picture-card .el-upload-list__item {
  height: 2.653rem;
  width: 2.653rem;
}

/*修改 el-button 点击时的蓝色底色*/
.el-button {
  cursor: none;
}
</style>