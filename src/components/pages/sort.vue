<template>
  <div>
    <div class="sort">
      <div class="sortheader">
        <van-search placeholder="Montagne jeunesse" v-model="value" />
      </div>
      <div class="sortMain">
        <!-- 左边分类导航栏 -->
        <ul class="bigBox">
          <li class="onSort" v-for="item in sortList" :key="item.name">
            <div :class="[item.name==flag?'mytitle1':'mytitle']">
              <div @click="changeName(item.name)" v-if='flag'>{{item.name}}</div>
            </div>
            <div class="right">
              <ul>
                <!-- v-if和v-for连用会出波浪线 -->
                <li v-if="item.name==flag" v-for="ite in item.list" :key="ite.id">
                  <div class="bigLi">
                    <div class="smallLi">
                      <img :src="ite.thumbnail" alt />
                      <p>{{ite.name}}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      flag: "美妆护肤",
      sortList: ''
    };
  },
  mounted(){
    // this.flag='母婴产品';
    this.$http({
      url:'http://yd.msword.top/getClassify'
    })
    .then((res)=>{
      this.sortList=res.data.data
      console.log(this.sortList)
    })
    .catch((err)=>{
      console.log(err)
    })
  },
  methods: {
    changeName(name) {
      this.flag = name;
    }
  }
};
</script>
<style lang="">
@import "../../assets/css/sort.css";
</style>