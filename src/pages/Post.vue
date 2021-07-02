<template>
  <el-main>
    <el-form :model="formModel" class="form" :rules="rules">
      <el-form-item class="post-title" prop="title">
        <el-input
                  type="textarea"
                  :rows="1"
                  placeholder="起个亮眼的标题吧（20字内）"
                  v-model="formModel.title">
        </el-input>
      </el-form-item>
      <el-form-item class="post-content" prop="textContent">
        <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="formModel.textContent">
        </el-input>
      </el-form-item>
      <el-upload class="img-upload-box"
                 name="postImgs"
                 list-type="picture-card"
                 action="#"
                 :auto-upload="false"
                 :file-list="fileList"
                 :on-success="handleSuccess"
                 :on-remove="handleRemove"
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

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item class="price-input" label="开个价" prop="price">
        <el-input  v-model="formModel.price"></el-input>
      </el-form-item>
      <el-button @click="sendPost" type="success" round>发布</el-button>

    </el-form>
  </el-main>
</template>

<script>
export default {
  name: "Post",
  data() {
    var validateTitle = (rule, value, callback) => {
      if(value.length > 20) {
        callback(new Error("标题不能太长哦！"));
      } else {
        callback();
      }
    };

    var validateTextContent = (rule, value, callback) => {
      if(value.length > 500) {
        callback(new Error("写太多啦！精简一下吧"));
      } else {
        callback();
      }
    };

    var validatePrice = (rule, value, callback) => {
      let regx = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if(regx.test(value) == false) {
        callback(new Error("格式有误"));
      } else if(value.length >= 6) {
        callback(new Error("数额太大了"));
      } else {
        callback()
      }
    }

    return {
      formModel: {
        textContent: "",
        title: "",
        price: 0,
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadedImgUrls: [],
      fileList: [],

      rules: {
        title: [
          {required: true, message: '别忘了标题！',trigger: 'blur'},
          { validator: validateTitle, trigger: 'change'}
        ],
        textContent: [{validator: validateTextContent, trigger: 'change'}],
        price: [{validator: validatePrice, trigger: 'change'}],
      }
    }
  },
  methods: {
    handleRemove(file) {
      this.fileList.splice(this.fileList.indexOf(file),1)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleDownload() {
    },

    handleSuccess(response, file) {
      console.log(file);
      console.log(response);
    },


    fileChange(file, fileList) {
      // // var observable = qiniu.upload(file, key, token, putExtra, config)
      const isPNG = file.raw.type === "image/png";
      const isJPEG = file.raw.type === "image/jpeg";
      const isJPG = file.raw.type === "image/jpg";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if(this.fileList.length > 4) {
        this.$message(
            {
              message: "最多添加 5 张图片!",
              type: "error",
              offset: 50,
            }
        );
        this.handleRemove(file)
        return false;
      }

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message(
            {
              message: "上传头像图片只能是 jpg、png、jpeg 格式!",
              type: "error",
              offset: 50,
            }
        );
        this.handleRemove(file)
        return false;
      }


      if (!isLt2M) {
        this.$message(
            {
              message: "上传头像图片大小不能超过 2MB!",
              type: "error",
              offset: 50,
            }
        );
        this.handleRemove(file)
        return false;
      }
      this.fileList = fileList
    },

    //似乎不生效，暂时不排查
    beforeAvatarUpload(file) {

      // var observable = qiniu.upload(file, key, token, putExtra, config)
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if(this.fileList.length > 4) {
        this.$message(
            {
              message: "最多添加 4 张图片!",
              type: "error",
              offset: 50,
            }
        );
        return false;
      }

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message(
            {
              message: "上传头像图片只能是 jpg、png、jpeg 格式!",
              type: "error",
              offset: 50,
            }
        );
        return false;
      }


      if (!isLt2M) {
        this.$message(
            {
              message: "上传头像图片大小不能超过 2MB!",
              type: "error",
              offset: 50,
            }
        );
        return false;
      }
      // this.uploadData.key = `upload_pic_${new Date().getTime()}_${file.name}`;
    },

    uploadImgs(uploadToken) {
      console.log("files: ")
      for (var file of this.fileList) {
        let key = this.$context.user.userId + (new Date()).getTime() + file.name.substr(file.name.lastIndexOf('.'));
        this.uploadedImgUrls.push("http://" + this.$context.qiniuDomain + "/" + key)
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
        console.log(this.$context.user.userId)
        formData.append('postContent', this.formModel.textContent);
        // formData.append('posterId', this.$context.user.userId);
         formData.append('posterId', 1);
        formData.append('postImgUrls', this.uploadedImgUrls);
        formData.append('postTitle', this.formModel.title);
        formData.append('postType', this.$context.pageRouter.currentPage);
        formData.append("price", this.formModel.price);
        // formData.append('postTime',date.getFullYear() + '/' + date.getMonth()+1
        //     + '/' + date.getDate() + '/' + date.getHours() + '/' + date.toLocaleTimeString()('chinese',{hour12:false}));
        // formData.append('postImgs',imgList);
        //上传图片到后端服务器服务器，然后上传到服务器的 minio 对象数据库
        // for(let i = 0; i < this.fileList.length; ++i) {
        //   formData.append("files",this.fileList[i].raw,this.fileList.name);
        // }
        //发送表单数据
        this.$axios.post(this.$context.serverUrl + "/addPost", formData, {
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
        return;
      })


    }
  }
}
</script>

<style scoped>

.img-upload-box {
  width: fit-content;
  margin-left: 0.265rem;
}

.img-upload-box>>>.el-upload--picture-card {
  height: 1.326rem;
  width: 1.326rem;
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
.img-upload-box>>>.el-upload-list__item {
  height: 1.592rem;
  width: 1.592rem;
}

/*修改 el-button 点击时的蓝色底色*/
.el-button {
  cursor: none;
}

.post-title {
  padding-bottom: 0.265rem;
}

/*Vue 组件穿透*/
.post-title>>>.el-textarea__inner {
  border: 0px solid red !important;
  resize: none !important;

}

/*Vue 组件穿透*/
.post-content>>>.el-textarea__inner {
  border: 0px solid red !important;
  resize: none !important;
}

.price-input {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
}


.price-input>>>.el-input__inner {
  line-height: 10px !important;
  height: 0.796rem !important;
  width: 2.122rem !important;
  border: 0px !important;
  border-bottom: 1px solid #00000047 !important;
  border-radius: 0 !important;
  margin-right: 0.796rem;
  padding: 0px !important;
  color: red !important;
  font-size: 0.69rem !important;
  font-weight: bold;
  text-align: center;
}

.form>>>.el-button {
  width: 6.366rem;
}

.form {
  margin-bottom: 0.531rem;
}

</style>