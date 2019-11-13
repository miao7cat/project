<template>
  <div>
    <div class="main">
      <!-- 底部导航 -->
      <router-view></router-view>
      <footer>
        <ul>
          <li :class="[item.path==flag?item.class2:item.class1]" v-for="item in linkList" :key="item.path" @click="goOther(item.path)">
            <div></div>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag:'/home',
      linkList: [
        {
          path: "/home",
          name: "首页",
          class1:'index',
          class2:'index1'
        },
        {
          path: "/sort",
          name: "分类",
          class1:'sort',
          class2:'sort1'
        },
        {
          path: "/shopCar",
          name: "购物车",
          class1:'shopCar',
          class2:'shopCar1'
        },
        {
          path: "/mine",
          name: "我",
          class1:'mine',
          class2:'mine1'
        }
      ]
    };
  },
  methods:{
    // 点击跳转路由
    goOther(name){
      this.flag = name;
      this.$router.push(name)
    }
  },
  mounted(){
    // 页面加载时把当前地址栏中的地址赋给该参数，让刷新页面后底部tab切换变色正常
    this.flag = this.$route.path
  }
};
</script>
<style lang="" scoped>
@import "../assets/css/common.css";
</style>