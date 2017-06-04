<template>
  <div class="login-body">
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submit_form">
      <div class="login-title">
        <img src="./images/login_logo.png"/>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="username" class="login-item">
            <el-input v-model="form.username" placeholder="请输入账户名：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  import {port_user, port_code} from 'common/port_uri'
  import {SET_USER_INFO, SET_TOKEN_INFO} from 'store/actions/type'

  export default{
    data(){
      return {
        form: {
          username: null,
          password: null
        },
        rules: {
          username: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
          password: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
        },
        //请求时的loading效果
        load_data: false
      }
    },
    methods: {
      ...mapActions({
        set_token_info: SET_TOKEN_INFO,
        set_user_info: SET_USER_INFO
      }),
      //提交
      submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.load_data = true
          //登录提交
          this.$fetch.api_user.login(this.form)
            .then(({data}) => {
              if (data['access_token']) {
                console.log(data)
                this.set_token_info(data);
                this.$fetch.api_user.me()
                  .then(({data}) => {
                    this.set_user_info(data)
                      .then(
                        () => {
                          this.$notify({
                            title: '登录成功',
                            message: '欢迎 ' + data.realname,
                            type: 'success'
                          });
                          setTimeout(this.$router.push({path: '/'}), 500);
                        },
                        () => {
                          this.load_data = false;
                          this.set_token_info(null);
                          this.$notify.error({
                            title: '错误',
                            message: data.realname + ',你无权到后台'
                          });
                        })
                  })
              }
            })
            .catch(({code}) => {
              this.load_data = false
              if (code === port_code.unauthorized || code === port_code.invalid_grant) {
                this.$notify.error({
                  title: '登录失败',
                  message: '账号和密码错误'
                });
              }
            });
        });
      },
      resetForm(form) {
        this.form.resetFields();
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .login-body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(./images/login_bg.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .loginWarp {
      width: 300px;
      padding: 25px 15px;
      margin: 100px auto;
      background-color: #fff;
      border-radius: 5px;
      .login-title {
        margin-bottom: 25px;
        text-align: center;
      }
      .login-item {
        .el-input__inner {
          margin: 0 !important;
        }
      }
      .form-input {
        input {
          margin-bottom: 15px;
          font-size: 12px;
          height: 40px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 5px;
          color: #555;
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        border-color: #6bc5a4;
        background: #6bc5a4;
        &:active, &:hover {
          border-color: #6bc5a4;
          background: #6bc5a4;
        }
      }
    }
  }
</style>
