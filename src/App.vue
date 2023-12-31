<template>
  <el-container>
    <el-header>
      <HeadContent />
    </el-header>
    <el-container>
      <el-aside width="12vw" ><MenuContent/></el-aside>
      <el-container>
        <el-main>
          <div class="pageContent">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>
          <FootContent />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import HeadContent from './view/head/index';
import FootContent from './view/foot/index';
import MenuContent from './view/menu/index';
export default {
  name: 'App',
  data() {
    return {}
  },
  components: {HeadContent,FootContent,MenuContent}
}
</script>

<style scoped>
.el-aside{
  border-right: solid 2px var(--el-menu-border-color);
}
</style>