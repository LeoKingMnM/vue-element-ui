<template>
  <el-container class="homepage">
    <el-aside class="homepage_kkk" :width="collapse?'64px':'200px'">
      <el-menu
        :default-active="this.$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
        router
      >
        <div class="homepage_logo" :class="{close:collapse}"></div>
        <el-menu-item index="/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/compontes/text">
          <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/compontes/neirong">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/compontes/pinglun">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/compontes/sucai">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/compontes/fensi">
          <i class="el-icon-user"></i>
          <span slot="title">我的粉丝</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="homepage_nav">
        <span class="el-icon-s-fold homepage_ico"  @click="btn()"></span>&nbsp;&nbsp;&nbsp;
        <span class="homepage_text">江苏传智播客教育科技有限公司</span>
        <el-dropdown class="homepage_user">
          <span class="el-dropdown-link">
            <img src="../../assets/images/66666.jpg" width="36px" style="vertical-align:middle" />
            &nbsp;&nbsp;&nbsp;小丽&nbsp;&nbsp;&nbsp;
            <i class="el-icon-arrow-down el-icon--right"></i>&nbsp;&nbsp;&nbsp;
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>切换用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <!-- 二级菜单 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      collapse:false
    }
  },
  methods:{
    btn(){
      this.collapse = !this.collapse
    }
  }
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .homepage_kkk {
    background-color: #002033;
    // width: auto!important;

    .homepage_logo {
      width: 100%;
      height: 60px;
      background: #002040 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
      .close {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .homepage_nav {
    line-height: 60px;
    border-bottom: 2px solid #ccc;

    .homepage_user:hover {
      cursor: pointer;
    }

    .homepage_user {
      float: right;

      .homepage_text {
        font-size: 16px;
      }
    }
    .homepage_ico {
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
