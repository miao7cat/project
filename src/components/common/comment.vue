<template>
  <div>
    <!-- 买家口碑 -->
    <div class="customSay">
      <div class="customHeader">
        <div>
          <span :class="[num==pjId?class1:'']" @click="num=pjId" v-for="(myPri,pjId) in praise" :key="pjId">{{myPri}}</span>
        </div>
      </div>
      <!-- 评价内容 -->
      <div class="comContent" v-for="(item,ke,priId) in mydataList" :key="priId">
        <div class="conBox" v-if='num==priId' v-for="(myCom,comId) in item" :key="comId">
          <div class="head">
            <h3>{{myCom.buyerName}}</h3>
            <p>{{myCom.createTime | myFilter}}</p>
          </div>
          <div>
            <img :src="itemImg" alt="hah" v-for="(itemImg,i) in myCom.postImg" :key="i" />
          </div>
          <p>{{myCom.postDescribe}}</p>
          <p>{{myCom.adminReviews}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    
    return {
      mytime:122334455,
      praise: ["全部评价", "差评", "好评", "中评"],
      num: 0,
      class1: "on",
      flag: "all",
      mydataList: this.detailList.buyerReviews
    };
  },
  mounted() {
  },
  props: ["detailList"],
  methods: {
  }
};
</script>
<style lang="" scoped>
/* 买家口碑 */
.customSay {
  padding: 0 0 1rem;
}
.customHeader {
  height: 0.7rem;
  padding: 0 0.3rem;
}
.customHeader div {
  height: 0.7rem;
  border-bottom: 1px solid #ddd;
}
.customHeader span {
  display: inline-block;
  width: 1.35rem;
  height: 0.5rem;
  background: #999;
  line-height: 0.5rem;
  text-align: center;
  border-radius: 0.18rem;
  color: #fff;
  margin: 0.1rem 0.2rem 0 0;
}
.customHeader span.on {
  background: #ff9900;
}
.customSay .head {
  overflow: hidden;
}
.customSay .comContent h3 {
  line-height: 0.62rem;
  font-size: 0.24rem;
  color: #ff9900;
  float: left;
}
.customSay .comContent .head p {
  float: right;
  line-height: 0.62rem;
  font-size: 0.24rem;
}
.customSay .comContent .conBox {
  padding: 0 0.3rem;
  border-bottom: 1px solid #ddd;
}
img{
  /* float: left; */
  width: 1.58rem;
  height: 1.58rem;
}
.customSay .comContent .conBox > p:first-of-type {
  line-height: 0.38rem;
  color: #999;
}
.customSay .comContent .conBox > p:nth-of-type(2) {
  padding: 0.1rem;
  line-height: 0.26rem;
  background: #ddd;
  letter-spacing: 0.02rem;
  margin-bottom: 0.2rem;
  border-radius: 0.1rem;
}
</style>