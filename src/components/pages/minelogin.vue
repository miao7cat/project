<template>
  <div>
    <div class="mine">
      <header>
        <div class="headerTop">
          <van-icon name="setting-o" />
          <h2>个人中心</h2>
          <div class="talk">
            <div class="tips">1</div>
          </div>
        </div>
        <div class="myHeader">
          <div class="top">
            <img src="../../assets/images/timg.jpg" alt />
          </div>
          <div class="bottom" @click="login">小喵超萌</div>
        </div>
      </header>
      <div class="myCollect">
        <h3>我的收藏(4)</h3>
      </div>

      <div class="orderGoods">
        <h3>我的订单</h3>
        <p>查看全部订单</p>
      </div>

      <div class="myCenter">
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine1.jpg" alt />
            <div class="coun">1</div>
          </div>
          <p>待付款</p>
        </div>
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine2.jpg" alt />
            <div class="coun">1</div>
          </div>
          <p>待发货</p>
        </div>
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine3.jpg" alt />
            <div class="coun">1</div>
          </div>
          <p>待收货</p>
        </div>
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine4.jpg" alt />
            <div class="coun">1</div>
          </div>
          <p>待评价</p>
        </div>
        <div class="content">
          <div class="images">
            <img src="../../assets/images/mine5.jpg" alt />
            <div class="coun">1</div>
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
    return {};
  },
  methods: {
    login() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="" scoped>
@import "../../assets/css/mine.css";
</style>