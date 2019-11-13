<template>
  <div>
    <div class="login">
      <div class="loginHeader">
        <van-nav-bar
          title="注册"
          right-text="登录"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
      </div>
      <div class="loginInp regist">
        <div>
          <span>昵称</span>
          <input type="text" v-model="nickname" @blur="nickBlur" />
          <p class="tips">{{nicktips}}</p>
        </div>
        <div>
          <span>手机号</span>
          <input type="text" v-model="phone" @blur="phoneBlur" />
          <p class="tips">{{phoneTips}}</p>
        </div>
        <div>
          <span>密码</span>
          <input type="password" v-model="password" @blur="passBlur" />
          <p class="tips">{{passTips}}</p>
        </div>
        <div class="yanzheng">
          <span>短信验证码</span>
          <input type="text" v-model="captcha" @blur="captBlur" />
          <p @click="getIdenty">{{identy}}</p>
          <p class="tips">{{captips}}</p>
        </div>
        <div>
          <button @click="vertification">注册</button>
        </div>
        <p>
          <input type="checkbox" v-model="checked" @click="xieyi" />点我同意协议
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      identy: "短信获取",
      num: 60,
      timer: "",
      nickname: "",
      password: "",
      phone: "",
      captcha: "",
      nicktips: "",
      phoneTips: "",
      passTips: "",
      captips: "",
      checked: false
    };
  },
  methods: {
    onClickLeft() {
      console.log("返回");
    },
    onClickRight() {
      this.$router.push("/login");
    },
    // 获取验证码
    getIdenty() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.num--;
        console.log(this.num);
        this.identy = this.num + "秒后重新获取";
        if (this.num <= 0) {
          clearInterval(this.timer);
          this.identy = "重新获取";
          this.num = 60;
        }
      }, 1000);
      this.$http({
        url: "http://localhost:3000/captcha/sent",
        params: {
          phone: this.phone
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 验证
    nickBlur() {
      if (this.nickname == "") {
        this.nicktips = "昵称不能为空";
        return false;
      } else {
        this.nicktips = "";
      }
    },
    phoneBlur() {
      let regPho = /^1\d{10}/;
      if (this.phone == "") {
        this.phoneTips = "手机号不能为空";
        return false;
      } else if (!regPho.test(this.phone)) {
        this.phoneTips = "手机号格式错误";
        return false;
      } else {
        this.phoneTips = "";
      }
    },
    passBlur() {
      let passReg = /^[\w\S]{6,18}$/;
      if (this.password == "") {
        this.passTips = "密码不能为空";
        return false;
      } else if (!passReg.test(this.password)) {
        this.passTips = "密码格式不正确";
        return false;
      } else {
        this.passTips = "";
      }
    },
    captBlur() {},
    // 验证验证码是否成功，如果成功就调用注册接口
    vertification() {
      console.log(this.checked)
      if (this.checked) {
        this.$http({
          url: "http://localhost:3000/captcha/verify",
          params: {
            phone: this.phone,
            captcha: this.captcha
          }
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$http({
                url: "http://localhost:3000/register/cellphone",
                params: {
                  phone: this.phone,
                  password: this.password,
                  captcha: this.captcha,
                  nickname: this.nickname
                }
              })
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(res);
                });
            } else {
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    xieyi() {
      this.checked = !this.checked;
      console.log(this.checked);
    }
  }
};
</script>
<style lang="" scoped>
@import url(../assets/css/login.css);
</style>