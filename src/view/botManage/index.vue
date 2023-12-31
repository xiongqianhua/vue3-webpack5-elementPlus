<template>
  <div id="botManage">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formRef" :rules="rules">
        <el-form-item label="站点名称" prop="station">
          <el-select v-model="formInline.station" placeholder="选择站点名称" clearable>
            <el-option label="张江人工智能岛" value="张江人工智能岛" />
            <el-option label="盛夏路充电站" value="盛夏路充电站" />
          </el-select>
        </el-form-item>
        <el-form-item label="bot编号" prop="bot">
          <el-input v-model="formInline.bot" placeholder="bot编号" clearable />
        </el-form-item>
        <el-form-item label="bot名称" prop="name">
          <el-input v-model="formInline.name" placeholder="bot名称" clearable />
        </el-form-item>
        <el-form-item label="bot电量" prop="num">
          <el-input v-model="formInline.num" placeholder="不能低于5大于100" clearable />
        </el-form-item>
        <el-form-item label="bot功率" prop="kw">
          <el-input v-model="formInline.kw" placeholder="bot功率" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">添加bot</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-divider content-position="left">bot列表</el-divider>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column fixed prop="station" label="站点名称">
        <template #default="scope">
          <el-text type="success">{{ scope.row.station }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="bot编号" />
      <el-table-column prop="name" label="bot名称" />
      <el-table-column prop="num" label="bot电量" />
      <el-table-column prop="kw" label="bot功率" />
      <el-table-column prop="date" label="创建时间" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" style="display: flex;flex-direction: row-reverse;margin: 24px;">
    </el-pagination>


  </div>
</template>
<script setup>
import {reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import {systemApi} from '../../utils/request';
const loading = ref(false)

const formRef = ref();
const rules = reactive({
  name: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  id: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  station: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
})
const resetForm = (formEl)=>{
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}
let formInline = ref({
    date: '',
    num: '',
    id:"",
    station:"",
    name:"",
    kw:""
})
let tableData = ref([
  {
    date: '2023-12-23',
    num: '20',
    id:"CSFTSH202307250012302",
    station:"盛夏路充电站",
    name:"12#Flashbot",
    kw:"60kW"
  },
  {
    date: '2023-12-29',
    num: '20',
    id:"CSFTSH202307250012302",
    station:"张江人工智能岛",
    name:"15#Flashbot",
    kw:"60kW"
  },
])
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
  tableData.value.push({
    date: formInline.value.date,
    bot: formInline.value.bot,
    type: formInline.value.type,
  });
}
</script>
<style scoped>
#botManage {
  min-height: 80vh;
}
</style>