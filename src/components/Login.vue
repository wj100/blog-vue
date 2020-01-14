<!--暂时没有上-->
<template>
  <el-container class="login_background">
    <!--<div class="clock">-->
    <!--<h3>WJUNE211</h3>-->
    <!--<AnalogClock-->
    <!--borderColor="#546e7a"-->
    <!--backgroundColor="#FFF"-->
    <!--scaleType="roman"-->
    <!--scaleColor="#455a64"-->
    <!--hourColor="#607d8b"-->
    <!--handType="line"-->
    <!--hourHandColor="#263238"-->
    <!--minuteHandColor="#37474f"-->
    <!--secondHandColor="#455a64"-->
    <!--/>-->
    <!--</div>-->
    <img src="../assets/img/diqiu2.png" height="500" width="500"/>
    <div class="login-box">
      <h2>登录</h2>
      <h3>Loading</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="name" class="one-input">
          <el-input placeholder="username"
                    prefix-icon="el-icon-user"
                    v-model="ruleForm.name">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="one-input">
          <el-input placeholder="password"
                    prefix-icon="el-icon-lock"
                    v-model="ruleForm.password"
                    type="password"
                    @keydown.native.enter="loginIn">

          </el-input>
        </el-form-item>
        <el-form-item>
          <span class="btn" @click="loginIn"><span>登录</span></span>
          <!--<el-button type="primary" class="loginIn" @click="loginIn">登录</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  import {AnalogClock} from 'vue-analog-clock'

  export default {
    components: {AnalogClock},
    name: 'Login',
    data() {
      return {
        ruleForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (/\s/.test(value)) {
                  callback(new Error("用户名中不能包含空格"));
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (/\s/.test(value)) {
                  callback(new Error("密码中不能包含空格"));
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ]
        },
      }
    },

    methods: {
      loginIn(form) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (screen.width<500){
              alert("暂不支持小屏设备!请使用电脑或平板");
              return
            }
            this.$post('/blog/login', {
              username: this.ruleForm.name,
              password: this.ruleForm.password
            }).then((res) => {
                this.$router.push({path: `/index`});
            })
          }
        })
      },
    },
  }
</script>
<style scoped lang="less">
  .login_background {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #061f3e;
    background-image: linear-gradient(-45deg, #061f3e, #003720);
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > h1 {
      margin-top: 10vh;
      width: 100%;
      color: #bbb;
      font-size: 60px;
      text-align: center;
      font-weight: 400;
      /*padding-left: 500px;*/
    }

    & > img {
      opacity: .2;
      animation: rotate 60s linear infinite;
    }
  }

  .one-input {
    margin-bottom: 20px;
  }

  .clock {
    position: relative;

    & h3 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 80px;
      color: #bbb;
    }
  }

  .login-box {
    padding: 100px 170px 200px;
    border-radius: 10px;
    height: 500px;
    width: 600px;
    background: url("../assets/img/9.png");
    background-size: 600px 500px;

    & > i {
      display: inline-block;
      text-align: center;
      color: #bbb;
      width: 100%;
      font-size: 100px;
      margin: 20px auto;
    }
  }

  .login-box h2 {
    float: left;
    font-size: 48px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 10px;
    margin-bottom: 30px;
  }

  .login-box h3 {
    float: left;
    font-size: 20px;
    color: #fff;
    margin-top: 25px;
  }

  //幽灵按钮
  .btn {
    display: block;
    width: 220px;
    height: 70px;
    z-index: 1;
  }

  .btn:after {
    content: '';
    background: linear-gradient(120deg, #6559ae, #ff7159, #6559ae);
    background-size: 400% 400%;
    -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 66px, 4px 66px, 4px 100%, 100% 100%, 100% 0%, 0% 0%);
    -moz-animation: gradient 3s ease-in-out infinite, border 1s forwards ease-in-out reverse;
    -webkit-animation: gradient 3s ease-in-out infinite, border 1s forwards ease-in-out reverse;
    animation: gradient 3s ease-in-out infinite, border 1s forwards ease-in-out reverse;
  }

  .btn > span {
    display: block;
    background: linear-gradient(120deg, #6559ae, #ff7159, #6559ae);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-animation: gradient 3s ease-in-out infinite;
    -webkit-animation: gradient 3s ease-in-out infinite;
    animation: gradient 3s ease-in-out infinite;
    /* helpers */
  }

  .absolute-centering,
  .btn,
  .btn:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .text-formatting,
  .btn {
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;
    letter-spacing: 2px;
    line-height: 70px;
    font-size: 28px;
    /* motion */
  }

  @-moz-keyframes gradient {
    0% {
      background-position: 14% 0%;
    }
    50% {
      background-position: 87% 100%;
    }
    100% {
      background-position: 14% 0%;
    }
  }

  @-webkit-keyframes gradient {
    0% {
      background-position: 14% 0%;
    }
    50% {
      background-position: 87% 100%;
    }
    100% {
      background-position: 14% 0%;
    }
  }

  @keyframes gradient {
    0% {
      background-position: 14% 0%;
    }
    50% {
      background-position: 87% 100%;
    }
    100% {
      background-position: 14% 0%;
    }
  }

  @-moz-keyframes border {
    0% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 66px, 4px 66px, 4px 100%, 100% 100%, 100% 0%, 0% 0%);
    }
    25% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 66px, 216px 66px, 216px 100%, 100% 100%, 100% 0%, 0% 0%);
    }
    50% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 4px, 216px 4px, 216px 4px, 216px 4px, 100% 0%, 0% 0%);
    }
    75% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 0%, 0% 0%);
    }
    100% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 0% 100%);
    }
  }

  @-webkit-keyframes border {
    0% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 66px, 4px 66px, 4px 100%, 100% 100%, 100% 0%, 0% 0%);
    }
    25% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 66px, 216px 66px, 216px 100%, 100% 100%, 100% 0%, 0% 0%);
    }
    50% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 4px, 216px 4px, 216px 4px, 216px 4px, 100% 0%, 0% 0%);
    }
    75% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 0%, 0% 0%);
    }
    100% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 0% 100%);
    }
  }

  @keyframes border {
    0% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 66px, 4px 66px, 4px 100%, 100% 100%, 100% 0%, 0% 0%);
    }
    25% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 66px, 216px 66px, 216px 100%, 100% 100%, 100% 0%, 0% 0%);
    }
    50% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 216px 4px, 216px 4px, 216px 4px, 216px 4px, 216px 4px, 100% 0%, 0% 0%);
    }
    75% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 0%, 0% 0%);
    }
    100% {
      -webkit-clip-path: polygon(0% 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 4px 100%, 0% 100%);
    }
  }

  .btn {
    position: relative;
    top: 30px;
    transform: scale(.7);
  }

  .diqiu {
    position: absolute;
    bottom: 0px;
    left: 0;
    opacity: 1;
  }

  .rotate {
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
  }

  .rotate1 {
    position: absolute;
    top: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
  }

  .data {
    transform: scale(.5) rotate(-60deg);
    opacity: .6;
    position: absolute;
    top: 30%;
    left: -40%;
  }

  /deep/ .login-box input.el-input__inner {
    background-color: rgba(200, 200, 200, .1);
    border: 1px solid #00291D;
    color: #fff;
  }

  /deep/ .login-box input.el-input__inner::placeholder {
    color: #666;
  }

  /deep/ .login-box input.el-input__inner:hover {
    background-color: rgba(200, 200, 200, .2);
    border: 1px solid #006146;
  }

  //媒体查询1200以下
  @media screen and (max-width: 1200px) {
    .login_background {
      & img {
        display: none;
      }

      & .login-box {
        /*margin: auto;*/

      }
    }
  }
  @media screen and (max-width: 500px) {
    .login_background {
      & img {
          display: none;
      }

      & .login-box {
        transform: scale(.7) translateX(-20px);
      }
    }
  }
</style>
