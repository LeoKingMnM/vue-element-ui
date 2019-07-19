<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form :model="userForm" label-width="100px">
          <el-form-item label="个人ID：">{{userForm.id}}</el-form-item>
          <el-form-item label="手机号：">{{userForm.mobile}}</el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-button type="success" @click="caonima()">保存信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" style="text-align:center">
        <p>媒体头像</p>
        <el-upload
          name="photo"
          class="avatar-uploader"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :http-request="upload"
        >
          <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <i style="font-size:12px">点击上传更新</i>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        name: null,
        intro: null,
        photo:null,
      },
      //上传请求头
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(window.sessionStorage.getItem("hm-73toutiao")).token
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    //修改个人信息
    caonima () {
    this.axios.patch('user/profile', this.userForm)
      this.$message.success('修改成功')
      this.getUser()
      this.$router.push('/article')
    },
    //获取个人所有信息
    async getUser() {
      this.loading = true;
      const {
        data: { data }
      } = await this.axios.get("user/profile", { params: this.userForm });
      this.userForm = data
      this.loading = false;
    },
    //上传头像信息
     upload ({ file }) {
      const data = new FormData()
      data.append('photo', file)
      this.axios({
        method: 'PATCH',
        url: 'user/photo',
        data
      }).then(res => {
        this.userForm.photo = res.data.photo
        this.getUser()
        location.reload()
      })
    },
    handleAvatarSuccess(){}
  }
};
</script>

<style>
</style>
