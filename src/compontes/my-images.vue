<template>
  <div class="img-containor">
    <div class="img-btn" @click="open()">
      <img :src="value || abc" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="660px">
      <!-- v-model数据是选项卡上的name属性值就是我们需要的值 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材" name="image">
          <!-- 按钮式单选框 -->
          <div style="margin: 10px 0;">
            <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 上传列表 -->
          <div
            class="img-item"
            :class="{texiao:selectedImageUrl===item.url }"
            @click="texiao(item.url)"
            v-for="item in images"
            :key="item.id"
          >
            <img :src="item.url" />
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
            :total="total"
          ></el-pagination>
        </el-tab-pane>

        <el-tab-pane label="上传图片" style="text-align:center" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import abc from "../assets/images/pic_bg.png";
export default {
  name: "my-images",
  props: ["value"],
  data() {
    return {
      abc,
      dialogVisible: false,
      activeName: "image",
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      //上传图片预览地址
      imageUrl: null,
      //素材列表
      images: [],
      //默认
      total: 0,
      //   图片中的url
      selectedImageUrl: null,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(window.sessionStorage.getItem("hm-73toutiao")).token
      }
    };
  },
  created() {},
  methods: {
    //点击确认按钮上传图片
    confirmImage() {
      if (this.activeName === "image") {
        // this.value = this.selectedImageUrl
        // 通知父组件数据改变数据
        // console.log(this.selectedImageUrl);
        this.$emit("input", this.selectedImageUrl);
      } else {
        this.$emit("input", this.imageUrl);
      }
      this.dialogVisible = false;
    },
    //上传成功预览
    handleAvatarSuccess(res) {
      this.imageUrl = res.data.url;
    },
    //获取当前页
    pager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    //点图出内容
    open() {
      this.dialogVisible = true;
      //渲染列表
      this.getImages();
    },
    //获取列表数据
    async getImages() {
      const {
        data: { data }
      } = await this.axios.get("user/images", { params: this.reqParams });
      this.images = data.results;
      this.total = data.total_count;
    },
    //修饰  切换归首页
    search() {
      (this.reqParams.page = 1), this.getImages();
    },
    //选中当前点击图片
    texiao(url) {
      this.selectedImageUrl = url;
    }
  }
};
</script>

<style lang="less" scoped>
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  position: relative;
  &.texiao {
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 60px 60px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  margin-top: 16px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>

