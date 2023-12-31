<!--
 * @Author: qianhua.xiong
-->
<template>
    <div id = "carManage">
      <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formRef" :rules="rules">
        <el-form-item label="车辆名称" prop="name">
          <el-input v-model="formInline.name" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="车牌号" prop="no">
          <el-input v-model="formInline.no" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="充电功率" prop="kw">
          <el-input v-model="formInline.kw" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="电池容量" prop="total">
          <el-input v-model="formInline.total" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="剩余电量" prop="remain">
          <el-input v-model="formInline.remain" placeholder="" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">添加车辆</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-divider content-position="left">车辆列表</el-divider>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column fixed prop="name" label="车辆名称">
        <template #default="scope">
          <el-text type="success">{{ scope.row.name }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="no" label="车牌号" />
      <el-table-column prop="kw" label="充电功率" />
      <el-table-column prop="total" label="电池容量" />
      <el-table-column prop="remain" label="剩余电量" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" style="display: flex;flex-direction: row-reverse;margin: 24px;">
    </el-pagination>
    </div>
  </template>
  <script setup>
import {reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {systemApi} from '../../utils/request';
const loading = ref(false)

const formRef = ref();
const rules = reactive({
  name: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  no: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  kw: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  total: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  remain: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
})
const resetForm = (formEl)=>{
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}
let formInline = ref({
  name: '',
  kw: '',
  total: '',
  remain:''
})
let tableData = ref([
  {
    name: '特斯拉model3',
    no:"沪A12940",
    kw: '100',
    total: '200',
    remain:'50'
  },
  {
    name: '特斯拉modelY',
    no:"沪A15640",
    kw: '40',
    total: '250',
    remain:'20'
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
    name: formInline.value.name,
    kw: formInline.value.kw,
    total: formInline.value.total,
    remain: formInline.value.remain,
  });
}
  </script>
  <style scoped>
  #carManage{
    min-height: 80vh;
  }
  </style>
