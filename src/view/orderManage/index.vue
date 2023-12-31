<template>
  <div id="orderManage">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formRef" :rules="rules">
         <el-form-item label="订单类型" prop="type">
            <el-select v-model="formInline.type" placeholder="请选择" clearable>
              <el-option label="EV充电" value="EV充电" />
              <el-option label="反向充电" value="反向充电" />
            </el-select>
          </el-form-item>
          <el-form-item label="站点ID" prop="station">
            <el-input v-model="formInline.station" placeholder="" clearable />
          </el-form-item>
          <el-form-item label="baseID" prop="base">
            <el-input v-model="formInline.base" placeholder="" clearable />
          </el-form-item>
          <el-form-item label="设备ID" prop="id">
            <el-input v-model="formInline.id" placeholder="" clearable />
          </el-form-item>
          <el-form-item label="预付费金额" prop="price">
            <el-input v-model="formInline.price" placeholder="" clearable />
          </el-form-item>
          <el-form-item label="插拔枪服务" prop="customer">
            <el-select v-model="formInline.customer" placeholder="请选择" clearable>
              <el-option label="是" value="是" />
              <el-option label="否" value="否" />
            </el-select>
          </el-form-item>
          <el-form-item label="开启快速通道" prop="quick">
            <el-select v-model="formInline.quick" placeholder="请选择" clearable>
              <el-option label="是" value="是" />
              <el-option label="否" value="否" />
            </el-select>
          </el-form-item>
          <el-form-item label="选车辆" prop="type">
            <el-select v-model="formInline.type" placeholder="请选择" clearable>
              <el-option label="特斯拉model3" value="特斯拉model3" />
              <el-option label="比亚迪宋plus" value="比亚迪宋plus" />
              <el-option label="小鹏p7" value="小鹏p7" />
              <el-option label="极氪001" value="极氪001" />
              <el-option label="理想one" value="理想one" />
            </el-select>
          </el-form-item>
          <el-form-item label="下单时间" prop="start">
          <el-date-picker v-model="formInline.start" type="datetime" placeholder=""
            format="YYYY-MM-DD HH:mm:ss" date-format="MMM DD, YYYY" time-format="HH:mm" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(formRef)">添加订单</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
          </el-form-item>
      </el-form>
    </el-card>
    <el-divider content-position="left">订单列表</el-divider>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column fixed prop="type" label="订单类型">
        <template #default="scope">
          <el-text type="success">{{ scope.row.type }}</el-text>
        </template>
      </el-table-column>
      <el-table-column fixed prop="station" label="站点ID"> <template #default="scope">
          <el-text type="success">{{ scope.row.station }}</el-text>
        </template></el-table-column>
      <el-table-column fixed prop="base" label="baseID" />
      <el-table-column fixed prop="id" label="设备ID" />
      <el-table-column prop="price" label="预付费金额" />
      <el-table-column prop="car" label="车辆名称" />
      <el-table-column prop="quick" label="开启快速通道" />
      <el-table-column prop="customer" label="插拔枪服务" />
      <el-table-column prop="status" label="订单状态">
        <template #default="scope">
              <el-tag
                :type="scope.row.status === '进行中' ? 'success' : ''"
                disable-transitions
                >{{ scope.row.status }}</el-tag
              >
          </template>
      </el-table-column>
      <el-table-column prop="start" label="下单时间" />
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
  type: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  station: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  base: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  id: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  price: [
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
  price: '',
  type: '',
  quick: '',
  customer:'',
  type:'',
  car:""
})
let tableData = ref([
  {
    start:"2016-05-01",
    quick:"是",
    price: '50',
    type: 'ev充电',
    customer:'是',
    id:"CSFTSZ202312300001302",
    status:"进行中",
    station:"06087276700000000008",
    base:"FE20231010000020401",
    car:"特斯拉model3"
  },
  {
    start:"2016-05-01",
    quick:"是",
    price: '150',
    type: '补电',
    customer:'是',
    id:"FE00000000000000000",
    status:"已完成",
    station:"33118360721609832607",
    base:"FE20231010000020401",
    car:"理想one"
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
    customer: formInline.value.customer,
    quick: formInline.value.quick,
    price: formInline.value.price,
    type: formInline.value.type,
    customer:formInline.value.customer,
    id :tableData.value.length+1,
    status:"进行中",
  });
}
</script>
<style scoped>
#orderManage {
  min-height: 80vh;
}
</style>