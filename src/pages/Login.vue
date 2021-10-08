<template>
  <BScrollWrapper>
    <el-main v-if="this.situation === 'login'" class="login-register-main">
      <el-form ref="loginForm" :model="loginData" :rules="rules">
        <div class="login-head">
          <span>没有账号？</span><span class="click-span" @click="switchToRegister">注册一个</span>
        </div>
        <el-form-item prop="stuId">
          <el-input
              type="text"
              placeholder="请输入学号"
              prefix-icon="el-icon-user-solid"
              v-model="loginData.stuId"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginData.password"></el-input>
        </el-form-item>
        <div class="login-head">
          <span>忘记密码？</span><span class="click-span" @click="switchToModifyPassword">重置密码</span>
        </div>
        <el-form-item>
          <el-button type="primary" @click="send">登录</el-button>
        </el-form-item>
      </el-form>

    </el-main>
    <el-main v-else-if="this.situation === 'register'" class="login-register-main">
      <el-form ref="registerForm" :model="registerData" :rules="rules">
        <div class="avatar">
          <img :src="avatarUrl">
          <el-button class="changeAvatar" @click="changeAvatar">换一个</el-button>
        </div>
        <el-form-item prop="userName">
          <el-input
              type="text"
              placeholder="昵称"
              prefix-icon="el-icon-user-solid"
              v-model="registerData.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password" :key="1">
          <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item prop="dupPassword" :key="2">
          <el-input
              type="password"
              placeholder="请再次输入密码"
              prefix-icon="el-icon-lock"
              v-model="registerData.dupPassword"></el-input>
        </el-form-item>
        <el-form-item prop="realName">
          <el-input
              type="text"
              placeholder="您的真实姓名"
              prefix-icon="el-icon-edit"
              v-model="registerData.realName"></el-input>
        </el-form-item>
        <el-form-item prop="stuId">
          <el-input
              type="text"
              placeholder="您的学号(用于排除校外人员）"
              prefix-icon="el-icon-postcard"
              v-model="registerData.stuId"></el-input>
        </el-form-item>
        <el-form-item prop="region">
          <el-select v-model="registerData.region" placeholder="请选择您的所在园区">
            <el-option label="清苑" value="清苑"></el-option>
            <el-option label="澈苑" value="澈苑"></el-option>
            <el-option label="涓苑" value="涓苑"></el-option>
            <el-option label="溪苑" value="溪苑"></el-option>
            <el-option label="润苑" value="润苑"></el-option>
            <el-option label="桃园" value="桃园"></el-option>
            <el-option label="李园" value="李园"></el-option>
            <el-option label="杏园" value="杏园"></el-option>
            <el-option label="梅园" value="梅园"></el-option>
            <el-option label="桂园" value="桂园"></el-option>
            <el-option label="榴园" value="榴园"></el-option>
            <el-option label="桔园" value="桔园"></el-option>
            <el-option label="浩苑" value="浩苑"></el-option>
            <el-option label="鸿苑" value="鸿苑"></el-option>
            <el-option label="瀚苑" value="瀚苑"></el-option>
            <el-option label="淳苑" value="淳苑"></el-option>
            <el-option label="留学生公寓" value="留学生公寓"></el-option>
            <el-option label="青教公寓" value="青教公寓"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="send">注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-main v-else class="login-register-main">

      <!--    重置密码表单-->
      <el-form ref="loginForm" :model="modifyPasswordData" :rules="rules">

        <el-form-item prop="stuId" :key="9">
          <el-label>
            您的学号：
          </el-label>
          <el-input
              type="text"
              placeholder="请输入学号"
              prefix-icon="el-icon-user-solid"
              v-model="modifyPasswordData.stuId"></el-input>
        </el-form-item>
        <el-label>
          您的真实姓名:
        </el-label>
        <el-form-item prop="realName" :key="10">
          <el-input
              type="text"
              placeholder="请输入您的名字"
              prefix-icon="el-icon-lock"
              v-model="modifyPasswordData.realName"></el-input>
        </el-form-item>
        <el-label>
          新密码：
        </el-label>
        <el-form-item prop="password" :key="11">
          <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="modifyPasswordData.password"></el-input>
        </el-form-item>
        <el-label>
          重复密码：
        </el-label>
        <el-form-item prop="dupPassword" :key="12">
          <el-input
              type="password"
              placeholder="请重复输入"
              prefix-icon="el-icon-lock"
              v-model="modifyPasswordData.dupPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyPassword">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </BScrollWrapper>

</template>

<script>

import {AvatarGenerator} from 'random-avatar-generator';
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "Login",
  components: {BScrollWrapper},
  data() {
    var validatestuId = (rule, value, callback) => {
      let regx = /^(\d{10})$/;
      if (regx.test(value) == false) {
        callback(new Error("学号必须为 10 位纯数字"));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      var regx = /^[0-9A-Za-z.?+=?*!~\-_<>/()';:,%$#@&]{6,12}$/;
      if (regx.test(value) == false) {
        callback(new Error("密码长度为6-12位"))
      }
      callback();
    }

    var validateDupPassword = (rule, value, callback) => {
      if (!(this.registerData.password === value)) {
        callback(new Error("密码不一致"))
      }
      callback()
    }

    return {
      situation: "login",
      formValid: false,

      loginData: {
        stuId: '',
        password: '',
      },
      registerData: {
        userName: '',
        realName: '',
        stuId: '',
        password: '',
        dupPassword: '',
        region: '',
      },
      modifyPasswordData: {
        stuId: '',
        realName: '',
        password: '',
        dupPassword:'',
      },

      rules: {
        stuId: [
          {required: true, message: '学号不能为空', trigger: 'blur'},
          {validator: validatestuId, trigger: 'change'},
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {validator: validatePassword, trigger: 'change'},
        ],
        userName: [
          {required: true, message: '昵称不能为空', trigger: 'blur'},
        ],
        realName: [
          {required: true, message: '姓名不能为空', trigger: 'blur'},
        ],
        dupPassword: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {validator: validateDupPassword, trigger: 'change'}
        ]
      },

      avatarGenerator: new AvatarGenerator(),
      avatarUrl: null,
    }
  },

  mounted() {
    this.changeAvatar();
    this.$context.initBodyHeight();
  },

  methods: {

    switchToRegister() {
      this.situation = "register";
    },

    switchToModifyPassword() {
      this.situation = "modifyPassword"
    },

    changeAvatar() {
      this.avatarUrl = this.avatarGenerator.generateRandomAvatar();
    },

    send() {
      let form = this.$refs.loginForm;
      let url = this.$context.serverUrl + "/login";
      if (this.situation === "register") {
        form = this.$refs.registerForm;
        url = this.$context.serverUrl + "/register";
      }
      //判断表单验证是否通过
      form.validate((isPass) => {
        this.formValid = isPass
      })
      //若不通过则取消提交
      if (this.formValid == false) return;

      let formData = new FormData();
      if (this.situation === "login") {
        formData.append('stuId', this.loginData.stuId);
        // 密码加密应该使用 RSA 非对称加密方式，暂时使用 base64 简化,避免明文传输
        // formData.append('password', window.btoa(this.loginData.password));
        formData.append('password', this.$context.encryptPsw(this.loginData.password));
      } else {
        formData.append("userName", this.registerData.userName);
        formData.append("realName", this.registerData.realName);
        formData.append("stuId", this.registerData.stuId);
        formData.append("password", this.$context.encryptPsw(this.registerData.password));
        formData.append("region", this.registerData.region);
        formData.append("userAvatarLink", this.avatarUrl);
      }


      this.$axios({url: url, data: formData, method: 'post', withCredentials: true})
          .then(response => {
            if (response.data.code == 200) {
              this.$notify({
                title: "操作成功",
                type: "success",
                offset: this.$context.offset.medium
              });
              this.$context.user = response.data.data;
              this.$context.user = response.data.data
              this.$router.push("/");
            } else if (response.data.code == 1005) {
              this.$notify({
                title: response.data.message,
                type: "error",
                offset: this.$context.offset.medium,
              });
            } else {
              this.$notify({
                title: response.data.message,
                type: "error",
                offset: this.$context.offset.medium
              })
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

    modifyPassword() {
      let form = new FormData();
      form.append("stuId", this.modifyPasswordData.stuId);
      form.append("realName", this.modifyPasswordData.realName);
      form.append("newPassword", this.$context.encryptPsw(this.modifyPasswordData.password));
      this.$axios({url:this.$context.serverUrl + "/modifyPassword", data:form, method: 'post'})
      .then((response)=> {
        if (response.data.code == 200) {
          this.$notify({
            title: "重置成功!",
            type: "success",
            offset: this.$context.offset.medium
          })
          this.$router.replace("/sale");
        } else {
          this.$notify({
            title: response.data.message,
            type: "error",
            offset: this.$context.offset.medium
          })
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
  },

}
</script>

<style scoped>

.login-register-main {
  display: flex;
  justify-content: space-around;
  padding-bottom: 2.122rem;
}

.el-form-item {
  margin-bottom: 0.663rem;
}

.el-form-item__content {
  margin-left: 0 !important;
}


form.el-form {
  /*margin-top: 1.459rem;*/
}

.login-head {
  margin-bottom: 0.398rem
}

.click-span {
  border-bottom: 1px solid cornflowerblue;
}

.click-span:active {
  color: deepskyblue;
  transition: 0.1s;
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar img {
  height: 2.122rem;
  width: 2.122rem;
}

.changeAvatar {
  font-size: 0.265rem;
  padding: 0.186rem;
  margin: 0.133rem 0;
  /*background-color: #4993f1;*/
}
</style>