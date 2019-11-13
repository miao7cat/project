<template>
  <div>
    <div class="shopCar">
      <div class="carHeader">
        <van-nav-bar title="购物车" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
      </div>
      <div class="mainCar">
        <div class="carContent" v-for="(item,index) in carList" :key="index">
          <h2>{{item.name}}</h2>
          <ul>
            <li
              :class="[item.show==1?'move':'']"
              @touchstart="start($event,index)"
              @touchmove="move"
              @touchend="end($event,index)"
            >
              <div class="cBox">
                <input type="checkbox" v-model="item.flag" />
                <label
                  for="myCheck"
                  :class="[item.flag==true?'checkedTrue':'']"
                  @click="selectOne(index)"
                ></label>
              </div>
              <img :src="item.images" alt />
              <div class="center">
                <h3>
                  <div class="title">{{item.name}}</div>
                  <div class="my">{{item.age}}{{item.size}}</div>
                </h3>
                <div class="inp">
                  <span class="del" @click="reduce(index)">-</span>
                  <input type="text" v-model="item.count" />
                  <span class="add" @click="add(index)">+</span>
                </div>
              </div>
              <span class="price">￥{{item.price*item.count}}</span>
              <p class="dell" @click="delect(index)">删除</p>
            </li>
          </ul>
        </div>
        <div class="bottomCar">
          <div class="cBox">
            <input type="checkbox" v-model="allChecked" />
            <label for="myCheck" @click="selectAll" :class="[allChecked==true?'checkedTrue':'']"></label>
          </div>
          <div class="cBox">
            <input type="checkbox" v-model="editCheck" />
            <label for="myCheck" @click="edit"></label>
          </div>
          <!-- 合计 -->
          <div class="amount">
            <p>合计:{{AllPrice}}</p>
            <p>不含运费</p>
          </div>
          <div class="btn">
            <button>去结算</button>
          </div>
        </div>
      </div>
      <div class="emptyCar" v-if="carList.length<=0">
        <img src="../../assets/images/tab_shopping_nor.png" alt />
        <p>购物车还是空的~</p>
        <p>快去逛逛吧</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true,
      check: true,
      count: 1,
      carList: "",
      allChecked: false,
      editCheck: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    };
  },
  computed: {
    AllPrice() {
      let sum = 0;
      // 页面一进来先加载computed中的，如果不判断carlist，会报错
      if (this.carList) {
        this.carList.map((item, i) => {
          if (item.flag) {
            sum += parseInt(item.price * item.count);
          }
        });
      }
      return sum;
    }
  },
  methods: {
    onClickLeft() {
      alert("返回");
    },
    onClickRight() {
      alert("按钮");
    },
    // 点击加减数量
    reduce(i) {
      if (this.carList[i].count <= 1) {
        this.carList[i].count = 1;
      } else {
        this.carList[i].count--;
      }
    },
    add(i) {
      this.carList[i].count++;
    },
    selectOne(i) {
      // this.carList[i].flag = !this.carList[i].flag;
      // 需要用this.$set
      this.$set(this.carList[i], "flag", !this.carList[i].flag);
      // 取出每一个单选的状态组成一个数组
      let result = this.carList.map((item, index) => {
        return item.flag;
      });
      let bool = result.every((item, ind) => {
        // console.log(item)
        return item == true;
      });
      console.log(bool);
      if (bool) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    selectAll() {
      console.log(this.allChecked);
      this.allChecked = !this.allChecked;
      if (this.allChecked) {
        this.carList.map((item, i) => {
          return (item.flag = true);
        });
      } else {
        this.carList.map((item, i) => {
          return (item.flag = false);
        });
      }
    },
    start(e, i) {
      console.log(e);
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    move(e) {
      this.endX = e.touches[0].clientX;
      this.endY = e.touches[0].clientY;
    },
    end(e, i) {
      if (this.endX == 0) {
        return false;
      } else {
        if (this.startX > this.endX + 15) {
          this.carList[i].show = 1;
        }
        if (this.endX > this.startX + 15) {
          this.carList[i].show = 0;
        }
      }
    },
    edit() {},
    delect(i) {
      this.carList.splice(i, 1);
      localStorage.setItem("arrShop", JSON.stringify(this.carList));
    }
  },

  mounted() {
    let carArr = JSON.parse(localStorage.getItem("arrShop"));
    this.carList = carArr;
  }
};
</script>
<style lang="" scoped>
@import "../../assets/css/shopCar.css";
</style>