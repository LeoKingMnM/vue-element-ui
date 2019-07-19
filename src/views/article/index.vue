<template>
  <div class="artic_container">
    <!-- 帅选容器 -->
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 内容 -->
      <el-form :model="reqParams" label-width="80px">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
           <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间:">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="reqvulue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-button size="small" type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果容器 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{ total }}</b> 条结果：
      </div>
      <el-table :data="tableData">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image style="width:100px;height:75px;" :src="scope.row.cover.images[0]"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain circle type="primary" @click="edit(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete" plain circle type="danger" @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          @current-change="caonima"
          layout="prev,pager,next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      //提交给后台的帅选条件
      reqParams: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: null,
        begin_pubdate: "",
        end_pubdate: ""
      },
      //时间
      reqvulue: [],
      //总条数
      total: 0
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.axios.delete(`articles/${id}`);
          //请求后该干什么
          this.getTableData();
          this.$message.success("删除成功");
        })
        .catch(() => {
          // 点击取消
        });
    },
    //跳转编辑页
    async edit(id) {
      this.$router.push({ path: "/issue", query: { id } });
    },
    //获取当前的页  然后给后端返回
    caonima (newpage) {
      this.reqParams.page = newpage;
      this.getTableData();
    },
    //筛选功能
    search() {
      //每次筛选都让页码回到第一页
      this.reqParams.page = 1;
      // 获取筛选功能内容
      this.getTableData();
    },
    //获取时间
    changeDate(values) {
      this.reqParams.begin_pubdate = values[0];
      this.reqParams.end_pubdate = values[1];
    },
    async getTableData() {
      //频道功能实现获取数据
      const {
        data: { data }
      } = await this.axios.get("articles", { params: this.reqParams });
      console.log(data);
      this.tableData = data.results;
      this.total = data.total_count;
    }
  }
};
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
