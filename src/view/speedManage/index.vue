<!--
 * @Author: qianhua.xiong
-->
<template>
  <div id="speedManage">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formRef" :rules="rules">
        <el-form-item label="充电档位" prop="type">
          <el-input v-model="formInline.type" placeholder="充电档位" clearable />
        </el-form-item>
        <el-form-item label="档位名称" prop="name">
          <el-input v-model="formInline.name" placeholder="档位名称" clearable />
        </el-form-item>
        <el-form-item label="设备ID" prop="id">
          <el-input v-model="formInline.id" placeholder="设备ID" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">添加档位</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-divider content-position="left">速度列表</el-divider>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column fixed prop="type" label="充电档位" />
      <el-table-column fixed prop="name" label="档位名称">
        <template #default="scope">
          <el-text type="success">{{ scope.row.name }}</el-text>
        </template>
      </el-table-column>
      <el-table-column fixed prop="id" label="设备ID" />
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
    { required: true, message: '必填', trigger: 'blur' },
  ],
  id: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
})
const resetForm = (formEl)=>{
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
} 
let formInline = ref({
  bot: '',
  type: '',
  date: '',
})
let tableData = ref([
  {
    date: '2016-05-03',
    name: '单枪-000001',
    type: '峰',
    id:"202312301504049795"
  },
  {
    date: '2016-05-03',
    name: '单枪-000002',
    type: '谷',
    id:"202312301503213368"
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
    bot: formInline.value.bot,
    type: formInline.value.type,
  });
}
</script>
<style scoped>
#speedManage {
  min-height: 80vh;
}
</style>