<template>
  <div class="ddddd">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 评论主体 -->
      <el-table :data="comments">
        <el-table-column label="标题" prop="title" width="300px"></el-table-column>
        <el-table-column label="评论状态" prop="comment_status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.comment_status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count" ></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button size="small" round type="primary" @click="scope" plain icon="el-icon-edit">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
       <div class="box">
        <el-pagination
          background
          layout="prev,pager,next"
          :total="30"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            comments:[]
        }
    },
};
</script>

<style lang="less" scoped>
 .box {
     text-align: center;
     margin-top: 16px;
 }
</style>
