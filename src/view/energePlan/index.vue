<template>
    <div id="energePlan">
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="formRef" :rules="rules">
            <el-form-item label="计划名称" prop="name">
                <el-input v-model="formInline.name" placeholder="" clearable />
            </el-form-item>
            <el-form-item label="需量费" prop="price">
              <el-input v-model="formInline.price" placeholder="" clearable />
            </el-form-item>
            <el-form-item label="站点" prop="station">
                <el-select v-model="formInline.station" placeholder="选择站点名称" clearable>
                <el-option label="张江人工智能岛" value="张江人工智能岛" />
                <el-option label="盛夏路充电站" value="盛夏路充电站" />
              </el-select>
            </el-form-item>
            <el-form-item label="目标值" prop="num">
                <el-input v-model="formInline.num" placeholder="" clearable />
            </el-form-item>
            <el-form-item label="上传文件" prop="upload">
              <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :auto-upload="false"
              >
                <template #trigger>
                  <el-button type="success">上传</el-button>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(formRef)">添加计划</el-button>
              <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
      </el-card>
      <el-divider content-position="left">策略列表</el-divider>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column fixed prop="name" label="计划名称" />
        <el-table-column prop="station" label="站点名称" />
        <el-table-column prop="price" label="需量费" />
        <el-table-column prop="num" label="目标值" />
        <el-table-column prop="date" label="应用时间" />
        <el-table-column prop="end" label="结束时间" />
        <el-table-column fixed prop="type" label="状态" >
          <template #default="scope">
              <el-tag
                :type="scope.row.type === '生效' ? 'success' : 'error'"
                disable-transitions
                >{{ scope.row.type }}</el-tag
              >
          </template>
        </el-table-column>
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
    name: [
      { required: true, message: '必填', trigger: 'blur' },
    ],
    price: [
      { required: true, message: '必填', trigger: 'blur' },
    ],
    num: [
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
      num:"100",
      end:"2023-12-20",
      date: '2023-12-03',
      price: '1.4',
      type: '失效',
      station:"张江人工智能岛",
      name:"储能计划1"
    },
    {
      num:"150",
      end:"2023-12-28",
      date: '2023-12-23',
      price: '0.8',
      type: '生效',
      station:"张江人工智能岛",
      name:"储能计划2"
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
const uploadRef = ref()

const submitUpload = () => {
  uploadRef.value.submit()
}
  </script>
  <style scoped>
  #energePlan {
    min-height: 80vh;
  }
  </style>