<template>
  <el-card>
    <div>
      <my-bread>发布文章</my-bread>
    </div>

    <el-col :span="24" class="warp-main">
      <el-form :model="reqParams" label-width="100px" class="my_bt">
        <el-form-item label="标题" prop="title" style="width:500px">
          <el-input v-model="reqParams.title"></el-input>
        </el-form-item>
        <!--使用编辑器-->
        <el-form-item label="内容编辑">
          <div class="edit_container">
            <quill-editor v-model="reqParams.content" style="height:300px"></quill-editor>
          </div>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="reqParams.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="reqParams.cover.type === 1">
            <my-images v-model="reqParams.cover.images[0]"></my-images>
          </div>
          <div v-if="reqParams.cover.type === 3">
            <my-images v-model="reqParams.cover.images[0]" class="niubi"></my-images>
            <my-images v-model="reqParams.cover.images[1]" class="niubi"></my-images>
            <my-images v-model="reqParams.cover.images[2]" class="niubi"></my-images>
          </div>
        </el-form-item>

        <el-form-item label="频道:">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>

        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="save(false)">发表</el-button>
          <el-button @click="save(true)">存入草稿</el-button>
        </el-form-item>
         <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">确认修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-card>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      imgURL: "",
      radio: 1,
      reqParams: {
        channel_id: null,
        title: "",
        content: "",
        cover: {
          type: 1,
          images: []
        }
      },
        articleId:null,
    };
  },
  created() {
    //获取文章id
    this.articleId = this.$route.query.id
    //获取文章数据
    this.articleId && this.getArticle(this.articleId)
  },
  methods: {
    async getArticle (id) {
      const {data:{data}} = await this.axios.get('articles/'+id)
      this.reqParams = data
    },
    //解决切换单选图片和三张图
    changeType() {
      //重置图片信息
      this.reqParams.cover.images = [];
    },
    //进行判断  无id则是添加文章
     save (draft) {
      this.axios.post('articles?draft=' + draft, this.reqParams)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    //如果有id则为修改文章
     edit (draft) {
     this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.reqParams)
      this.$message.success(draft ? '修改草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  },
  components: {
    //使用编辑器
    quillEditor
  }
};
</script>

<style lang="less" scoped>
.niubi {
  display: inline-block;
  margin-right: 4px;
}
.my_bt {
  margin-top: 40px;
}
.edit_container {
  height: 400px;
}
</style>
