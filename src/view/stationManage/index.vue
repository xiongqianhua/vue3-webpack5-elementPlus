<template>
    <div id="stationManage">
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formRef" :rules="rules">
          <el-form-item label="站点ID" prop="id">
            <el-input v-model="formInline.id" placeholder="请输入站点ID" clearable />
          </el-form-item>
          <el-form-item label="站点名称" prop="name">
            <el-select v-model="formInline.name" placeholder="选择站点名称" clearable>
              <el-option label="张江人工智能岛" value="张江人工智能岛" />
              <el-option label="盛夏路充电站" value="盛夏路充电站" />
            </el-select>
          </el-form-item>
          <el-form-item label="执行策略" prop="type">
            <el-select v-model="formInline.type" placeholder="请选择" clearable>
              <el-option label="储能优先" value="1" />
              <el-option label="充电优先" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="服务费率" prop="price">
            <el-input v-model="formInline.price" placeholder="例：0.1" clearable />
          </el-form-item>
          <el-form-item label="龙骑士插拔枪费" prop="num">
            <el-input v-model="formInline.num" placeholder="龙骑士插拔枪费" clearable />
          </el-form-item>
          <el-form-item label="插队金额（快速通道费用）" prop="num">
            <el-input v-model="formInline.num" placeholder="插队金额（快速通道费用）" clearable />
          </el-form-item>
          <el-form-item label="龙骑士分账费用" prop="num">
            <el-input v-model="formInline.num" placeholder="龙骑士分账费用" clearable />
          </el-form-item>
          <el-form-item label="超时占用费" prop="num">
            <el-input v-model="formInline.num" placeholder="超时占用费" clearable />
          </el-form-item>
          <el-form-item label="超时还枪费" prop="num">
            <el-input v-model="formInline.num" placeholder="超时还枪费" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(formRef)">添加站点</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-divider content-position="left">站点列表</el-divider>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column fixed prop="id" label="站点ID" />
        <el-table-column fixed prop="name" label="站点名称">
          <template #default="scope">
          <el-text type="success">{{ scope.row.name }}</el-text>
        </template>
        </el-table-column>
        <el-table-column fixed prop="type" label="执行策略" />
        <el-table-column prop="price" label="服务费率" />
        <el-table-column prop="customer" label="龙骑士插拔枪费" />
        <el-table-column prop="num" label="插队金额" />
        <el-table-column prop="num" label="龙骑士分账费用" />
        <el-table-column prop="num" label="超时占用费" />
        <el-table-column prop="num" label="超时还枪费" />
        <el-table-column prop="date" label="创建时间" />
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
    { required: true, message: '请选择站点名称', trigger: 'blur' },
  ],
  id: [
    { required: true, message: '请输入站点ID', trigger: 'blur' },
  ],
})
const resetForm = (formEl)=>{
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}
  let formInline = ref({
      id:"",
      name:"",
      date: '',
      type: '',
      num:"",
      price:"",
      customer:""
  })
  let tableData = ref([
    {
      id:"20230417105233297860",
      name:"盛夏路充电站",
      date: '2016-05-03',
      type: '储能优先',
      num:"10",
      price:"0.1",
      customer:"5"
    },
    {
      id:"33118360721609832607",
      name:"张江人工智能岛",
      date: '2016-05-03',
      type: '充电优先',
      num:"0",
      price:"0.2",
      customer:"5"
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
      base: formInline.value.base,
      type: formInline.value.type,
    });
  }
  </script>
  <style scoped>
  #stationManage {
    min-height: 80vh;
  }
  </style>