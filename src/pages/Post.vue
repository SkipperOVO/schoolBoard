<template>
  <el-main>
    <el-form>
    <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textContent">
    </el-input>
    <el-upload class="img-upload-box"
        action="http://localhost:8080/addPost"
        name="postImgs"
        list-type="picture-card"
        :auto-upload="false"
        :file-list="fileList"
        :on-success="handleSuccess"
        :before-upload="beforeAvatarUpload"
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
    </el-form>
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
      uploadedImgUrls: [],
      fileList: [],
    }
  },
  methods: {
    handleRemove() {
      // this.uploadedImgUrl.slice(this.uploadedImgUrl.indexOf(file.url),1);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleDownload() {
    },

    handleSuccess(response,file) {
      console.log(file);
      console.log(response);
    },


    fileChange(file,fileList) {
      // console.log(file)
      this.fileList = fileList
      //pass 上传一张图片到对象服务器
    },

    beforeAvatarUpload(file) {
      console.log(file, 'beforeAvatarUpload')
      // var observable = qiniu.upload(file, key, token, putExtra, config)
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      // this.uploadData.key = `upload_pic_${new Date().getTime()}_${file.name}`;
    },

    uploadImgs(uploadToken) {
      console.log(uploadToken)
      console.log("files: ")
      for(var file of this.fileList) {
        let key = this.$context.user.userId + (new Date()).getTime() + file.name.substr(file.name.lastIndexOf('.'));
        this.uploadedImgUrls.push(this.$context.qiniuDomain + "/" + key)
        let observable = this.$qiniu.upload(file.raw, key, uploadToken);
        observable.subscribe({
          complete(res) {
            console.log(res)
          }
        })
      }
    },

    sendPost() {

      let uploadToken = null;
      this.$axios.get(this.$context.serverUrl + "/getQiniuCloudToken").then(response => {
        uploadToken = response.data.data;
        this.uploadImgs(uploadToken);

        console.log(this.uploadedImgUrls)

        let formData = new FormData();
        formData.append('content',this.textContent);
        formData.append('userId',this.$context.user.userId);
        formData.append('postImgUrls',this.uploadedImgUrls);
        // formData.append('postImgs',imgList);
        //上传图片到后端服务器服务器，然后上传到服务器的 minio 对象数据库
        // for(let i = 0; i < this.fileList.length; ++i) {
        //   formData.append("files",this.fileList[i].raw,this.fileList.name);
        // }
        //发送表单数据
        this.$axios.post(this.$context.serverUrl + "/addPost",formData, {
          //上传到本地服务器
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // }
        }).then(response => {
          console.log(response)
        }).catch(error => {
              console.log(error)
        })
      }).catch(error => {
        console.log(error);
        console.log("获取七牛云 Token 失败！")
        this.$message("图片上传失败，请稍后重试！")
        return ;
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