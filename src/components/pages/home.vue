<template>
  <div>
    <div class="header">
      <van-search placeholder="Montagne jeunesse" v-model="value" />
    </div>
    <div class="banner">banner图</div>
    <div class="todayShop" v-for="(item,index) in indexList" :key="index">
      <div class="shopHeader">
        <img src="../../assets/images/hot.png" alt />
        <h2>{{item.name}}</h2>
      </div>
      <div class="mainShop">
        <van-row>
          <van-col span="12" v-for="it in item.list" :key="it.id" @click='sendInfo(it.id)'>
            <a href="#">
              <div class="images">
                <img :src="it.thumbnail" alt />
              </div>
              <div class="shopBootom">
                <span>{{it.reduct_price}}</span>
                <del>{{it.original_price}}</del>
                <div class="title">{{it.name}}</div>
              </div>
            </a>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      indexList: ''
    };
  },
  mounted(){
    this.$http({
      url:'http://yd.msword.top/getIndexData',
    })
    .then((res)=>{
      console.log(res.data.data)
      this.indexList=res.data.data
    })
    .catch((err)=>{
      console.log(err)
    })
  },
  methods:{
    sendInfo(myId){
      this.$router.push({
        path:'/detail',
        query:{
          pid:myId
        }
      })
    }
  }
};
</script>
<style lang="">
@import "../../assets/css/home.css";
</style>