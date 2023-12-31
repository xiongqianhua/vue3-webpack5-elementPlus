<!--
 * @Author: qianhua.xiong
-->
<template>
    <div id="needManage">
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formRef" :rules="rules">
            <el-form-item label="站点名称" prop="station">
              <el-select v-model="formInline.station" placeholder="选择站点名称" clearable>
                <el-option label="张江人工智能岛" value="张江人工智能岛" />
                <el-option label="盛夏路充电站" value="盛夏路充电站" />
              </el-select>
            </el-form-item>
            <el-form-item label="电表号" prop="id">
              <el-input v-model="formInline.id" placeholder="电表号" clearable />
            </el-form-item>
            <el-form-item label="储能需量" prop="num">
              <el-input v-model="formInline.num" placeholder="储能需量" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(formRef)">添加需量</el-button>
              <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
      </el-card>
      <el-divider content-position="left">需量列表</el-divider>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column fixed prop="station" label="站点名称">
          <template #default="scope">
          <el-text type="success">{{ scope.row.station }}</el-text>
        </template>
        </el-table-column>
        <el-table-column prop="id" label="电表号" />
        <el-table-column prop="num" label="储能需量" />
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
  station: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  id: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  num: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
})
const resetForm = (formEl)=>{
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}  
  let formInline = ref({
    start:"",
    end:"",
    price: '',
    type: '',
    date: '',
  })
  let tableData = ref([
    {
      station:"厦门安仁产业园",
      id:"23121803520001",
      date: '2016-05-03',
      num: '63',
    },
    {
      station:"张江人工智能岛",
      id:"23121803520001",
      date: '2016-05-03',
      num: '34',
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
      start: formInline.value.start,
      end: formInline.value.end,
      date: formInline.value.date,
      price: formInline.value.bot,
      type: formInline.value.type,
    });
  }
  </script>
  <style scoped>
  #needManage {
    min-height: 80vh;
  }
  </style>