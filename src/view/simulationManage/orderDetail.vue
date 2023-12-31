<!--
 * @Author: qianhua.xiong
-->
<template>
    <div id="orderDetail">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/simulationManage' }">模拟管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="left">详情列表</el-divider>
    <el-table :data="tableData" v-if="orderType == 2" v-loading="loading">
      <el-table-column prop="name" label="base名称">
        <template #default="scope">
          <el-text type="success">{{ scope.row.name }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
      <el-table-column prop="add" label="充电电量" />
      <el-table-column prop="add" label="充电金额" />
      <el-table-column prop="customer" label="充电类型" />
    </el-table>
    <el-table :data="tableData" v-if="orderType == 3" v-loading="loading">
      <el-table-column prop="id" label="订单编号">
        <template #default="scope">
          <el-text type="success">{{ scope.row.id }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="botno" label="base编号">
        <template #default="scope">
          <el-text type="success">{{ scope.row.botno }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
      <el-table-column prop="add" label="补电量" />
      <el-table-column prop="add" label="补电金额" />
    </el-table>
    <el-table :data="tableData" v-if="orderType == 1" v-loading="loading">
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
      <el-table-column prop="type" label="充电电量" />
      <el-table-column prop="add" label="充电金额" />
      <el-table-column prop="customer" label="策略类型" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" style="display: flex;flex-direction: row-reverse;margin: 24px;">
    </el-pagination>
    <el-divider content-position="left">{{ orderPriceTitle }}</el-divider>
    <el-table :data="tableData" v-if="orderType == 2" v-loading="loading">
      <el-table-column prop="id" label="反向充电订单编号" />
      <el-table-column prop="botno" label="bot编号" />
      <el-table-column prop="botno" label="base编号">
        <template #default="scope">
          <el-text type="success">{{ scope.row.botno }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
      <el-table-column prop="add" label="收入金额" />
      <el-table-column prop="add" label="服务费" />
    </el-table>
    <el-table :data="tableData" v-if="orderType == 3" v-loading="loading">
      <el-table-column prop="botno" label="bot编号">
        <template #default="scope">
           <el-text type="success">{{ scope.row.botno }}</el-text>
          </template>
      </el-table-column>
      <el-table-column prop="add" label="补电电量" />
      <el-table-column prop="add" label="补电金额" />
      <el-table-column prop="type" label="补电次数" />
    </el-table>
    <el-table :data="tableData"  v-if="orderType == 1" v-loading="loading">
        <el-table-column prop="id" label="EV订单号">
          <template #default="scope">
           <el-text type="success">{{ scope.row.id }}</el-text>
          </template>
        </el-table-column>
      <el-table-column prop="add" label="EV充电服务费收益" />
      <el-table-column prop="add" label="电价差收益" />
      <el-table-column prop="add" label="其他充放电服务收益" />
      <el-table-column prop="add" label="EV充电成本" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" style="display: flex;flex-direction: row-reverse;margin: 24px;">
    </el-pagination>
    <el-divider content-position="left">收入收益电量统计</el-divider>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="botno" label="设备编号">
        <template #default="scope">
          <el-text type="success">{{ scope.row.botno }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="add" label="EV充电电量" />
      <el-table-column prop="add" label="EV充电收益" />
      <el-table-column prop="add" label="补电电量" />
      <el-table-column prop="add" label="补电支出" />
      <el-table-column prop="add" label="反向充电电量"/>
      <el-table-column prop="add" label="反向充电收入" />
      <el-table-column prop="add" label="总收益" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" style="display: flex;flex-direction: row-reverse;margin: 24px;">
    </el-pagination>
    </div>
  </template>
  <script setup>
import { ref } from 'vue';
import { useRoute} from 'vue-router';
import {systemApi} from '../../utils/request';
const loading = ref(false)

let route = useRoute();
const orderType = route.query.type
console.log(orderType,'orderType')
const orderTypeMap = {
    1:"EV订单收益明细",
    2:"反向充电收益明细",
    3:"bot补电支出明细"
}
const orderPriceTitle = orderTypeMap[orderType]
console.log(orderPriceTitle,'orderPriceTitle')
const tableData = [
  {
    id: '202312301504109982',
    botno: "CSFTSZ202312190002302",
    name: "22#Bot",
    start: "2023-12-30 15:04:11",
    end: "2023-12-30 16:23:52",
    status: "放电",
    is_service: "是",
    is_vip: "是",
    station_name: "张江人工智能岛",
    detail: [],
    type:2,
    customer:'峰',
    add:"30"
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
    customer:'尖',
    add:"10"
  }, {
    id: '202312301503213368',
    botno: "CSFTSZ202312190002302",
    name: "22#Bot",
    start: "2023-12-30 15:03:22",
    end: "2023-12-30 15:03:45",
    status: "补电",
    is_service: "是",
    is_vip: "是",
    station_name: "张江人工智能岛",
    detail: [],
    type:3,
    customer:'谷',
    add:"50"
  },]
  </script>
  <style scoped>
  #orderDetail {
    min-height: 80vh;
  }
  </style>