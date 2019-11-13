<template>
  <div>
    <div class="login">
      <div class="loginHeader">
        <van-nav-bar
          title="登录"
          right-text="注册"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
      </div>
      <div class="loginInp">
        <div>
          <span>手机号</span>
          <input type="text" v-model="phone" @blur="phoneBlur()" />
          <p class="tips">{{phoneTip}}</p>
        </div>
        <div>
          <span>密码</span>
          <input type="password" v-model="password" @blur="passBlur()" />
          <p class="tips">{{passTip}}</p>
        </div>
        <div class="forget">
          <a href="#">忘记密码</a>
        </div>
        <div class="sub">
          <button @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      phoneTip: "",
      passTip: ""
    };
  },
  methods: {
    onClickLeft() {
      console.log("返回");
    },
    onClickRight() {
      this.$router.push("/regist");
    },
    login() {
      this.$http({
        url: "http://localhost:3000/login/cellphone",
        params: {
          phone: this.phone,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          sessionStorage.setItem('user',this.phone);
          this.$router.push("/home");
        })
        .catch(err => {
          alert('密码错误')
        });
    },
    // 表单失焦
    phoneBlur() {
      let regPho = /^1\d{10}/;
      if (this.phone == "") {
        this.phoneTip = "请输入手机号";
        return false;
      } else if (!regPho.test(this.phone)) {
        this.phoneTip = "账号格式不正确";
        return false;
      } else {
        this.phoneTip = "";
      }
    },
    passBlur() {
      let passReg = /^[\w\S]{6,18}$/;
      if (this.password == "") {
        this.passTip = "请输入密码";
        return false;
      } else {
        if (!passReg.test(this.password)) {
          this.passTip = "密码格式不正确";
          return false;
        }else{
          this.passTip = "";
        }
      }
    }
  }
};
</script>
<style lang="" scoped>
@import url(../assets/css/login.css);
</style>