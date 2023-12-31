<template>
  <div id="baseManage">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formRef" :rules="rules">
        <el-form-item label="站点名称" prop="name">
          <el-select v-model="formInline.name" placeholder="选择站点名称" clearable>
            <el-option label="张江人工智能岛" value="张江人工智能岛" />
            <el-option label="盛夏路充电站" value="盛夏路充电站" />
          </el-select>
        </el-form-item>
        <el-form-item label="base编号" prop="id">
          <el-input v-model="formInline.id" placeholder="base编号" clearable />
        </el-form-item>
        <el-form-item label="base名称" prop="base">
          <el-input v-model="formInline.base" placeholder="base名称" clearable />
        </el-form-item>
        <el-form-item label="base功率" prop="num">
          <el-input v-model="formInline.num" placeholder="base功率" clearable />
        </el-form-item>
        <el-form-item label="base类型" prop="type">
          <el-select v-model="formInline.type" placeholder="选择base类型" clearable>
            <el-option label="单枪" value="0" />
            <el-option label="双枪" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">添加base</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-divider content-position="left">base列表</el-divider>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column fixed prop="name" label="站点名称">
        <template #default="scope">
          <el-text type="success">{{ scope.row.name }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="base编号" />
      <el-table-column prop="base" label="base名称" />
      <el-table-column prop="num" label="base功率" />
      <el-table-column prop="type" label="base类型" />
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
    { required: true, message: '选择站点名称', trigger: 'blur' },
  ],
})
let formInline = ref({
    date: '',
    base: '',
    type: '',
    name:'',
    id:'',
    num:''
})
let tableData = ref([
  {
    date: '2016-05-03',
    base: '00000000000',
    type: '单枪',
    name:'厦门安仁产业园',
    id:'CSFTSZ202312300001302',
    num:'120kw'
  },
  {
    date: '2016-05-03',
    base: '00000000001',
    type: '双枪',
    name:'菁华创梦空间站',
    id:'FE20231010000040401',
    num:'50kw'
  },
])
const onSubmit =async (formEl) => {
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
    base: formInline.value.base,
    type: formInline.value.type,
  });
}
const resetForm = (formEl)=>{
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped>
#baseManage {
  min-height: 80vh;
}
</style>