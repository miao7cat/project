<template>
  <div>
    <div class="detail" @click="hidden">
      <div class="headerTop">
        <van-icon name="arrow-left" @click="back" />
        <van-icon name="cart-o" />
        <van-icon name="ellipsis" />
      </div>
      <div class="tatBanner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(itemImg,index_1) in detailList.swiperImgArr" :key="index_1">
            <img :src="itemImg" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="centerDetail">
        <div class="top">
          <h2>{{detailList.name}}</h2>
          <span>
            <van-icon name="star-o" />
            <p>收藏</p>
          </span>
        </div>
        <div class="center">
          <div class="price">￥{{detailList.reduct_price}}</div>
          <span>6.5折</span>
          <span>包邮</span>
        </div>
        <div class="bottom">
          <del>￥{{detailList.original_price}}</del>
          <span v-for="(itemSpan,indexS) in detailList.describe" :key="indexS">{{itemSpan}}</span>
        </div>
      </div>
      <div class="bottomBanner">
        <div class="bottomTitle">
          <div @click="myType='banner'">商品详情</div>
          <div @click="myType='comment'">买家口碑</div>
        </div>
        <div :is="myType" :detailList="detailList"></div>
        <!-- 商品详情 -->
      </div>

      <!-- 立即购买 -->
      <van-goods-action>
        <span>总价：￥{{reduct_price}}</span>
        <van-goods-action-button type="warning" text="加入购物车" @click="showWind" />
        <van-goods-action-button type="danger" text="立即购买" @click="showWind" />
      </van-goods-action>
    </div>

    <!-- 点击立即购买 -->
    <div class="bg" v-show="show"></div>
    <div class="window" v-show="show">
      <div class="windHead">
        <div class="images">
          <img src="../assets/images/goumai.jpg" alt />
        </div>
        <div class="right">
          <div class="lcont">
            <div>￥{{reduct_price}}</div>
            <div>库存{{total}}件</div>
            <div>请选择商品属性</div>
          </div>
          <span @click="hidden()"></span>
        </div>
      </div>
      <div class="center">
        <span>购买数量</span>
        <div class="count">
          <button @click="reduce">-</button>
          <input type="text" v-model="count" />
          <button @click="add">+</button>
        </div>
      </div>
      <div class="bottomDet">
        <!-- 大小 -->
        <div class="cont">
          <h3>{{bigName}}</h3>
          <div class="contSpan">
            <span
              :class="[bigNum==bigIs?'onSpan':'']"
              v-for="(bigspan,bigIs) in bigList"
              :key="bigIs"
              @click="bigNum=bigIs"
            >{{bigspan}}</span>
          </div>
        </div>
        <div class="cont age">
          <h3>{{ageName}}</h3>
          <div class="contSpan">
            <span
              :class="[ageNum==ageInd?'onSpan':'']"
              v-for="(ageItem,ageInd) in age"
              :key="ageInd"
              @click="ageNum=ageInd"
            >{{ageItem}}</span>
          </div>
        </div>
        <!-- 立即购买 -->
        <van-goods-action>
          <div>
            总价：
            <span>￥{{allPrice}}</span>
          </div>
          <van-goods-action-button type="warning" text="加入购物车" />
          <van-goods-action-button type="danger" text="立即购买" @click="goShop()" />
        </van-goods-action>
      </div>
    </div>
    
  </div>
</template>

<script>
import banner from "../components/common/detailbanner";
import comment from "../components/common/comment";
export default {
  data() {
    return {
      bigName: "",
      bigList: "",
      bigNum: 0,
      age: "",
      ageName: "",
      ageNum: "0",
      myType: "banner",
      show: false,
      images: "",
      detailList: "",
      myId: "",
      total: "",
      reduct_price: "",
      count: 1,
      allPrice: ""
    };
  },
  components: {
    banner,
    comment
  },
  methods: {
    onClickButton() {},
    showWind(e) {
      this.show = true;
      e.stopPropagation();
    },
    hidden() {
      this.show = false;
    },
    back() {
      this.$router.push("/home");
    },
    // 点击立即购买跳转到购物车页面
    goShop() {
      let arr = [];
      let obj = {
        size: this.bigList[this.bigNum],
        age: this.age[this.ageNum],
        count: 1,
        name: this.detailList.name,
        images: this.detailList.swiperImgArr[0],
        price: this.reduct_price,
        flag: false,
        show:0
      };
      if (localStorage.getItem("arrShop")) {
        arr = JSON.parse(localStorage.getItem("arrShop"));
        arr.push(obj);
        localStorage.setItem("arrShop", JSON.stringify(arr));
      } else {
        arr.push(obj);
        localStorage.setItem("arrShop", JSON.stringify(arr));
      }
      this.$router.push("/shopCar");
    },
    // 增加数量
    add() {
      this.count++;
      this.allPrice = this.reduct_price * this.count;
      console.log(this.reduct_price, this.count);
    },
    // 减少数量
    reduce() {
      if (this.count <= 1) {
        this.count = 1;
      } else {
        this.count--;
      }
      this.allPrice = this.reduct_price * this.count;
      console.log(this.allPrice);
    }
  },
  mounted() {
    this.myId = this.$route.query.pid;
    this.$http({
      url: "http://yd.msword.top/getDetails",
      params: {
        pid: this.myId
      }
    })
      .then(res => {
        console.log(res.data.data);
        this.detailList = res.data.data;
        this.total = res.data.data.total;
        this.reduct_price = res.data.data.reduct_price;
        this.bigName = this.detailList.buySelect[0].name;
        this.bigList = this.detailList.buySelect[0].list;
        this.ageName = this.detailList.buySelect[1].name;
        this.age = this.detailList.buySelect[1].list;
        this.allPrice = res.data.data.reduct_price;

        console.log(this.allPrice);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="" scoped>
@import "../assets/css/detail.css";
</style>