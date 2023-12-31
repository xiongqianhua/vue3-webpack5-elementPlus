import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import baseManage from '../view/baseManage/index';
import botManage from '../view/botManage/index';
import energyRule from '../view/energyRule/index';
import carManage from '../view/carManage/index';
import orderManage from '../view/orderManage/index';
import simulationManage from '../view/simulationManage/index';
import stationManage from '../view/stationManage/index';
import needManage from '../view/needManage/index';
import speedManage from '../view/speedManage/index';
import orderDetail from '../view/simulationManage/orderDetail';
import energePlan from '../view/energePlan/index';
const routes = [
  {
      path: "/",
      redirect: "/stationManage",
  },
  { path: "/stationManage", component: stationManage },
  { path: "/baseManage", component: baseManage },
  { path: "/botManage", component: botManage },
  { path: "/energyRule", component: energyRule },
  { path: "/carManage", component: carManage },
  { path: "/orderManage", component: orderManage },
  { path: "/simulationManage", component: simulationManage },
  { path: "/needManage", component: needManage },
  { path: "/speedManage", component: speedManage },
  { path: "/simulationManage/orderDetail", component: orderDetail },
  { path: "/energePlan", component: energePlan },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default router