<template>
  <div>
    <div class="mine">
      <header>
        <div class="headerTop">
          <van-icon name="setting-o" @click="leave"/>
          <h2>个人中心</h2>
          <div class="talk">
            <div v-if="flag==true" class="tips">1</div>
          </div>
        </div>
        <div class="myHeader">
          <div class="top">
            <img v-if='flag==false' src="../../assets/images/userPhoto.png" alt />
            <img v-if='flag==true' src="../../assets/images/timg.jpg" alt />
          </div>
          <div v-if='flag==false' class="bottom" @click="login">点击登录</div>
          <div img v-if='flag==true' class="bottom" @click="login">小喵超萌</div>
        </div>
      </header>
      <div class="myCollect">
        <h3 v-if='flag==false'>我的收藏</h3>
        <h3  v-if='flag==true'>我的收藏(4)</h3>
      </div>

      <div class="orderGoods">
        <h3>我的订单</h3>
        <p>查看全部订单</p>
      </div>

      <div class="myCenter">
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine1.jpg" alt />
            <div v-if='flag==true' class="coun">1</div>
          </div>
          <p>待付款</p>
        </div>
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine2.jpg" alt />
            <div v-if='flag==true' class="coun">1</div>
          </div>
          <p>待发货</p>
        </div>
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine3.jpg" alt />
            <div v-if='flag==true' class="coun">1</div>
          </div>
          <p>待收货</p>
        </div>
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine4.jpg" alt />
            <div v-if='flag==true' class="coun">1</div>
          </div>
          <p>待评价</p>
        </div>
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine5.jpg" alt />
            <div v-if='flag==true' class="coun">1</div>
          </div>
          <p>退款/售后</p>
        </div>
      </div>

      <div class="address">收货地址管理</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag:false
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    leave(){
      console.log(1)
      sessionStorage.removeItem('user')
      this.flag=false
    }
  },
  mounted() {
    if(sessionStorage.getItem('user')){
      this.flag = true
    }else{
      this.flag=false
    }
  },
};
</script>
<style lang="" scoped>
@import "../../assets/css/mine.css";
</style>