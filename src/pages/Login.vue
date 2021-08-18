<template>
  <el-main v-if="isLogin" class="login-register-main">
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
      <el-form-item>
        <el-button type="primary" @click="send">登录</el-button>
      </el-form-item>
    </el-form>
  </el-main>
  <el-main v-else class="login-register-main">
    <el-form ref="registerForm" :model="registerData" :rules="rules">
      <el-form-item prop="userName">
        <el-input
            type="text"
            placeholder="昵称"
            prefix-icon="el-icon-user-solid"
            v-model="registerData.userName"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="registerData.password"></el-input>
      </el-form-item>
      <el-form-item prop="dupPassword">
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
          <el-option label="桃苑" value="桃苑"></el-option>
          <el-option label="李苑" value="李苑"></el-option>
          <el-option label="梅苑" value="梅苑"></el-option>
          <el-option label="桂苑" value="桂苑"></el-option>
          <el-option label="榴苑" value="榴苑"></el-option>
          <el-option label="浩苑" value="浩苑"></el-option>
          <el-option label="鸿苑" value="鸿苑"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="send">注册</el-button>
      </el-form-item>
    </el-form>
  </el-main>

</template>

<script>
export default {
  name: "Login",
  data () {
    var validatestuId = (rule,value,callback) => {
      let regx = /^(\d{10})$/;
      if(regx.test(value) == false) {
        callback(new Error("学号必须为 10 位纯数字"));
      } else {
        callback();
      }
    };

    var validatePassword = (rule,value,callback) => {
      var regx = /^\d{6,10}$/;
      if(regx.test(value) == false) {
        callback(new Error("密码长度为6-8位"))
      }
      callback();
    }

    var validateDupPassword = (rule,value,callback) => {
      if(!(this.registerData.password === value)) {
        callback(new Error("密码不一致"))
      }
      callback()
    }

    return {
      isLogin: true,
      formValid: false,

      loginData:{
        stuId:'',
        password:'',
      },
      registerData:{
        userName:'',
        realName:'',
        stuId:'',
        password:'',
        dupPassword:'',
        region:'',
      },

      rules: {
        stuId: [
          {required: true, message: '学号不能为空',trigger: 'blur'},
          {validator: validatestuId, trigger: 'change'},
        ],
        password: [
          {required: true, message: '密码不能为空',trigger: 'blur'},
          {validator: validatePassword, trigger: 'change'},
        ],
        userName: [
          {required: true,message: '昵称不能为空',trigger: 'blur'},
        ],
        realName: [
          {required: true,message: '姓名不能为空',trigger: 'blur'},
        ],
        dupPassword: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {validator: validateDupPassword,trigger: 'change'}
        ]
      },
    }
  },
  methods: {

    switchToRegister() {
      this.isLogin = false;
    },

    send() {
      let form = this.$refs.loginForm;
      let url = this.$context.serverUrl + "/login";
      if(this.isLogin == false) {
        form = this.$refs.registerForm;
        url = this.$context.serverUrl + "/register";
      }
      //判断表单验证是否通过
      form.validate((isPass)=>{
        this.formValid = isPass
      })
      //若不通过则取消提交
      if(this.formValid == false)  return ;

      let formData = new FormData();
      if(this.isLogin) {
        formData.append('stuId',this.loginData.stuId);
        // 密码加密应该使用 RSA 非对称加密方式，暂时使用 base64 简化,避免明文传输
        formData.append('password',window.btoa(this.loginData.password));
      } else {
        formData.append("userName", this.registerData.userName);
        formData.append("realName", this.registerData.realName);
        formData.append("stuId",this.registerData.stuId);
        formData.append("password",this.registerData.password);
        formData.append("region",this.registerData.region);
      }


      this.$axios({ url:url,data:formData,method:'post',withCredentials:true} )
        .then(response => {
          console.log(response)
          if(response.data.code == 200) {
            this.$notify({
              title: "操作成功",
              type: "success",
              offset: 80
            });
            this.$context.user = response.data.data;
            console.log(response)
            this.$context.user = response.data.data
            console.log(this.$context.user)
            this.$router.push("/");
          } else if (response.data.code == 1005) {
            this.$notify({
              title: response.data.message,
              type: "error",
              offset: 80,
            });
          } else {
            this.$notify({
              title: response.data.message,
              type: "error",
              offset: 80
            })
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
  },

}
</script>

<style scoped>

.login-register-main {
  display: flex;
  justify-content: space-around;
}

.el-form-item {
  margin-bottom: 0.663rem;
}

.el-form-item__content {
  margin-left: 0 !important;
}


form.el-form {
  margin-top: 1.459rem;
}

.login-head {
  margin-bottom: 0.398rem
}

.click-span {
  border-bottom: 1px solid cornflowerblue ;
}
.click-span:active {
  color: deepskyblue;
  transition: 0.1s;
}

</style>