<template>
  <div id="energyRule">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="formRef" :rules="rules">
          <el-form-item label="站点名称" prop="station">
            <el-select v-model="formInline.station" placeholder="选择站点名称" clearable>
              <el-option label="张江人工智能岛" value="张江人工智能岛" />
              <el-option label="盛夏路充电站" value="盛夏路充电站" />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="start">
          <el-date-picker v-model="formInline.start" type="datetime" placeholder=""
            format="YYYY-MM-DD HH:mm:ss" date-format="MMM DD, YYYY" time-format="HH:mm" />
          </el-form-item>
          <el-form-item label="结束时间" prop="end">
            <el-date-picker v-model="formInline.end" type="datetime" placeholder=""
              format="YYYY-MM-DD HH:mm:ss" date-format="MMM DD, YYYY" time-format="HH:mm" />
          </el-form-item>
          <el-form-item label="电费" prop="price">
            <el-input v-model="formInline.price" placeholder="" clearable />
          </el-form-item>
          <el-form-item label="用电量时段" prop="type">
            <el-select v-model="formInline.type" placeholder="请选择" clearable>
              <el-option label="尖" value="尖" />
              <el-option label="峰" value="峰" />
              <el-option label="平" value="平" />
              <el-option label="谷" value="谷" />
              <el-option label="深" value="深" />
            </el-select>
          </el-form-item>
          <el-form-item label="策略类型" prop="type">
            <el-select v-model="formInline.type" placeholder="请选择" clearable>
              <el-option label="储能" value="储能" />
              <el-option label="bot" value="bot" />
              <el-option label="base" value="base" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(formRef)">添加策略</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
          </el-form-item>
      </el-form>
    </el-card>
    <el-divider content-position="left">策略列表</el-divider>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column fixed prop="station" label="站点名称">
        <template #default="scope">
          <el-text type="success">{{ scope.row.station }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="电费" />
      <el-table-column prop="type" label="用电量时段" />
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
      <el-table-column prop="type" label="策略类型" />
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
  end: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  start: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  price: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  type: [
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
    start:"2016-05-01",
    end:"2016-05-02",
    date: '2016-05-03',
    price: '1.4',
    type: '尖',
    station:"张江人工智能岛"
  },
  {
    start:"2016-05-01",
    end:"2016-05-02",
    date: '2016-05-03',
    price: '0.8',
    type: '峰',
    station:"张江人工智能岛"
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
    start: formInline.value.start,
    end: formInline.value.end,
    date: formInline.value.date,
    price: formInline.value.bot,
    type: formInline.value.type,
  });
}
</script>
<style scoped>
#energyRule {
  min-height: 80vh;
}
</style>