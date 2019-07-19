<template>
  <div class="container" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <!-- 按钮式单选框 -->
        <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材 -->
        <el-button
          size="small"
          type="primary"
          style="float:right;"
          @click="dialogVisible = true"
        >添加素材</el-button>
        <el-dialog title="请选择图片" :visible.sync="dialogVisible" width="30%">
          <span class="hhh">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :show-file-list="false"
              :headers="headers"
              name="image"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </span>
        </el-dialog>
      </div>
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <!-- v-if判断是否为收藏，是啧不需要底部操作栏，优化 -->
          <div class="fot" v-if="!reqParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="shoucang(item)"></span>
            <span class="el-icon-delete" @click="del(item.id)"></span>
          </div>
        </li>
      </ul>
      <!-- 大于一页采取显示分页功能 -->
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import "@/styles/index.less";
export default {
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      //获取图片
      images: [],
      //分页
      total: 0,
      //图片路径 预览地址
      imageUrl: null,
      //设置默认为false
      dialogVisible: false,
      //加载状态
      loading: false,
      // 上传请求头
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(window.sessionStorage.getItem("hm-73toutiao")).token
      }
    };
  },
  created() {
    //进入页面加载图片资源
    this.getImages();
  },
  methods: {
    //删除
    async del(id) {
      this.$confirm("此操作将永久删除该图片, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.axios.delete("user/images/" + id);
          // 删除成功
          this.$message.success("删除成功");
          this.getImages();
        })
        .catch(() => {});
    },
    //收藏
    async shoucang(item) {
      const {
        data: { data }
      } = await this.axios.put("user/images/" + item.id, {
        collect: !item.is_collected
      });
      //操作成功切换颜色
      this.$message.success("操作成功");
      item.is_collected = data.collect;
    },
    //上传回掉函数
    handleAvatarSuccess(res) {
      this.imageUrl = res.data.url;
      this.$message.success("上传成功");
      // 关闭对话框  更新列表
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.getImages();
        this.imageUrl = null;
      }, 1000);
    },
    //查询
    pager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    //修饰  切换归首页
    search() {
      (this.reqParams.page = 1), this.getImages();
    },
    //请求图片资源
    async getImages() {
      this.loading = true;
      const {
        data: { data }
      } = await this.axios.get("user/images", { params: this.reqParams });
      this.images = data.results;
      this.total = data.total_count;
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.hhh {
  text-align: center;
}
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 140px;
    height: 140px;
    float: left;
    border: 1px dashed #eee;
    margin-right: 40px;
    margin-left: 40px;
    margin-right: 30px;
    margin-bottom: 40px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 10px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>

