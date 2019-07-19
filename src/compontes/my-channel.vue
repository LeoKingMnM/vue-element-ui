<template>
  <el-select :value="value" @change="fn" placeholder="所有频道">
    <el-option v-for="item in abc" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "my-channel",
  props:['value'],
  data() {
    return {
        abc:[]
    };
  },
  created() {
    this.getData();
  },
  methods: {
      fn(value) {
          this.$emit('input',value)
      },
    async getData() {
      const {
        data: { data }
      } = await this.axios.get("channels");
      this.abc = data.channels;
    }
  }
};
</script>

<style>
</style>
