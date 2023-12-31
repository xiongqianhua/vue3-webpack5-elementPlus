<template>
   <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <el-menu-item-group title="创建仿真场站">
          <router-link to="/stationManage" key="/stationManage" :class="{active: selectMenu === '/stationManage'}"><el-menu-item index="1-0"><el-icon><Place /></el-icon>站点管理</el-menu-item></router-link>
          <router-link to="/baseManage" key="/baseManage" :class="{active: selectMenu === '/baseManage'}"><el-menu-item index="1-1"><el-icon><Setting /></el-icon>base管理</el-menu-item></router-link>
          <router-link to="/botManage" key="/botManage" :class="{active:selectMenu === '/botManage'}"><el-menu-item index="1-2"><el-icon><SetUp /></el-icon>bot管理</el-menu-item></router-link>
          <router-link to="/energyRule" key="/energyRule" :class="{active:selectMenu === '/energyRule'}"><el-menu-item index="1-3"><el-icon><PriceTag /></el-icon>策略管理</el-menu-item></router-link>
          <router-link to="/needManage" key="/needManage" :class="{active:selectMenu === '/needManage'}"><el-menu-item index="1-6"><el-icon><Operation /></el-icon>需量管理</el-menu-item></router-link>
          <router-link to="/speedManage" key="/speedManage" :class="{active:selectMenu === '/speedManage'}"><el-menu-item index="1-8"><el-icon><Stopwatch /></el-icon>补电速度</el-menu-item></router-link>
          <router-link to="/energePlan" key="/energePlan" :class="{active:selectMenu === '/energePlan'}"><el-menu-item index="1-9"><el-icon><Finished /></el-icon>储能计划</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group title="创建仿真条件">
          <router-link to="/carManage" key="/carManage" :class="{active:selectMenu === '/carManage'}"><el-menu-item index="1-4"><el-icon><Van /></el-icon>车辆管理</el-menu-item></router-link>
          <router-link to="/orderManage" key="/orderManage" :class="{active:selectMenu === '/orderManage'}"><el-menu-item index="1-5"><el-icon><Document /></el-icon>订单管理</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group title="模拟">
          <router-link to="/simulationManage" key="/simulationManage" :class="{active:selectMenu === '/simulationManage'}"><el-menu-item index="1-7"><el-icon><Film /></el-icon>模拟管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>
<script setup>
import { watch } from 'vue';
import { useRouter} from 'vue-router';

let router = useRouter();
const href = window.location.href.split('#')[1]
console.log('href',href)
let selectMenu = href
watch(() => router.currentRoute.value.path,(newPath, oldPath) => {
    console.log(newPath,oldPath)
    if(oldPath && newPath !== oldPath){
      selectMenu = newPath
    }
},{ immediate: true });
console.log('selectMenu',selectMenu)

</script>