<template>
  <div class="login-container">
    <!-- 卡片 -->
    <el-card class="login_box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form :model="loginFrom" :rules="rules" status-icon ref="loginFrom" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" type="mobile" v-model="loginFrom.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="loginFrom.code" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item label prop="agree">
          <el-checkbox label="我已阅读并同意" name="agree" checked="checked" v-model="loginFrom.agree"></el-checkbox>
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
var validPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
// 手机号验证
function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(str);
}
export default {
  data() {
    return {
      loginFrom: {
        mobile: "13333333333",
        code: "246810",
        agree: []
      },
      rules: {
        mobile: [
          {
            required: true,
            trigger: "blur",
            validator: validPhone
          }
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            message: "请发送验证码"
          }
        ],
        agree: [
          {
            type: "array",
            required: true,
            message: "请阅读并勾选注册协议",
            trigger: "change"
          }
        ]
      },

      checked: true
    };
  },
  methods: {
    login() {
      this.$refs.loginFrom.validate(valid => {
        if (valid) {
          
          this.axios

            .post(
              "http://ttapi.research.itcast.cn/mp/v1_0/authorizations",
              this.loginFrom
            )
            .then((res) => {
              // const data = res.data
              //登陆成功到主页
              //保存登陆状态
              //保存登录后返回得用户信息  包含token
              //使用ses
              //sionStorage来存储 关闭浏览器回话失效
              //存储
              window.sessionStorage.setItem('hm-73toutiao',JSON.stringify(res.data.data))
              this.$router.push("/index");
            })
            .cath(() => {
              this.$message.error("发生未知错误");
            });
        } else {
          this.$message({
            message: "登录失败",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto 30px;
    }
  }
}
.el-checkbox {
  margin-right: 5px;
}
</style>
