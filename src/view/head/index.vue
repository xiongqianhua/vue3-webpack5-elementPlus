
<template>
    <div class="headerPage">
        <div class="logo-wrapper"><img class="logo-img" src="../../asset/image/logo.png"/><span>CloudDispatch</span></div>
        <div class="flex-grow" /> 主题风格
        <el-switch v-model="value1" 
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny" @change="Change" style="margin-left: 12px;"/>
    </div>
</template>
<script setup>
import { ref,watch } from 'vue';
//主题颜色，暗黑色和明亮色切换
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useRouter} from 'vue-router';
const submenu = ref(false);
let router = useRouter();

watch(() => router.currentRoute.value.path,(newPath, oldPath) => {
    console.log(newPath,oldPath)
},{ immediate: true });
const value1 = ref(true)
const Change = (params)=>{
    if(params){
        document.documentElement.setAttribute('class','dark')
    }else{
        document.documentElement.setAttribute('class','')
    }
}
</script>

<style scoped>
.menu-item{
    width: 20vw;
    font-size: 1.2vw;
}
.logo-wrapper{
    width: 20vw;
    height: 5vh;
    font-size: 1.5vw;
    display: flex;
    align-items: center;
    font-weight: 500;
}
.logo-img{
    width: 3vw;
    height: 2vw;
    margin: 12px;
}
a:-webkit-any-link {
    text-decoration: none;
}
.flex-grow {
  flex-grow: 1;
}
.headerPage{
    width: 100vw;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.05);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    font-family: "SourceHanSansCNRegular";
    overflow: hidden;
    padding:0 1vw ;
}
</style>