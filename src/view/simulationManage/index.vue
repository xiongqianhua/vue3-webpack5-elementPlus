<template>
  <div id="simulationManage">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="formRef" :rules="rules">
        <el-form-item label="站点名称" prop="station_name">
          <el-select v-model="formInline.station_name" placeholder="选择站点名称" clearable>
            <el-option label="张江人工智能岛" value="张江人工智能岛" />
            <el-option label="盛夏路充电站" value="盛夏路充电站" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围：" prop="range_date">
          <el-date-picker v-model="formInline.range_date" type="datetimerange"  start-placeholder="开始日期" end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit(formRef)">查询</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-divider content-position="left">订单列表</el-divider>
    <el-table :data="tableData" style="margin: 24px 0;" v-loading="loading">
      <el-table-column fixed prop="id" label="订单编号">
        <template #default="scope">
          <el-text type="primary">{{ scope.row.id }}</el-text>
          </template>
      </el-table-column>
      <el-table-column fixed prop="station_name" label="站点名称" />
      <el-table-column fixed prop="botno" label="bot编号" />
      <el-table-column fixed prop="name" label="bot名称">
        <template #default="scope">
          <el-text type="success">{{ scope.row.name }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === 'EV充电' ? '' : 'success'"
              disable-transitions
              >{{ scope.row.status }}</el-tag
            >
          </template>
        </el-table-column>
      <el-table-column prop="is_service" label="插拔枪服务" />
      <el-table-column prop="is_vip" label="快速通道" />
      <el-table-column prop="id" label="操作">
        <template #default="scope">
          <el-button @click.native.prevent="goDetail(scope.row)" link type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" style="display: flex;flex-direction: row-reverse;">
    </el-pagination>
  </div>
</template>
<script setup>
import { useRouter} from 'vue-router';
import {reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {systemApi} from '../../utils/request';
const loading = ref(false)

const formRef = ref();
const rules = reactive({
  station_name: [
    { required: true, message: '选择站点名称', trigger: 'blur' },
  ],
})
const resetForm = (formEl)=>{
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}
let router = useRouter();
let formInline = ref({
  range_date: [],
  station: ''
})
const tableData = [
  {
    id: '202312301504109982',
    botno: "CSFTSZ202312190002302",
    name: "22#Bot",
    start: "2023-12-30 15:04:11",
    end: "2023-12-30 16:23:52",
    status: "反向充电",
    is_service: "是",
    is_vip: "是",
    station_name: "张江人工智能岛",
    detail: [],
    type:2,
  }, {
    id: '202312301504049795',
    botno: "CSFTSZ202312190002302",
    name: "22#Bot",
    start: "2023-12-30 15:04:04",
    end: "2023-12-30 16:23:54",
    status: "EV充电",
    is_service: "是",
    is_vip: "是",
    station_name: "张江人工智能岛",
    detail: [],
    type:1,
  }, {
    id: '202312301503213368',
    botno: "CSFTSZ202312190002302",
    name: "22#Bot",
    start: "2023-12-30 15:03:22",
    end: "2023-12-30 15:03:45",
    status: "bot补电",
    is_service: "是",
    is_vip: "是",
    station_name: "张江人工智能岛",
    detail: [],
    type:3,
  },]
const goDetail = (row) => {
  console.log(row)
  router.push({
    path:"/simulationManage/orderDetail",
    query:{
      type:row.type,
    }
  })
}
const onSubmit = async (formEl) => {
  console.log('submit!', formInline.value)
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('submit!')
        let res = await systemApi.addStation(fields)
        if (res && res.code === 200) {
          ElMessage({
            message: '添加成功！',
            type: 'success',
          })
          tableData.value = res.data; 
        } else {
          ElMessage({
            message: '添加失败！'+ res?.message,
            type: 'error',
          })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
}
</script>
<style scoped>
#simulationManage {
  min-height: 80vh;
}
</style>