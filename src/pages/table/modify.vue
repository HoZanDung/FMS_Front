<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="form.username" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="form.password" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="真实名:" prop="realname">
              <el-input v-model="form.realname" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="form.email" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="住址:" prop="address">
              <el-input v-model="form.address" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        form: {
          username: null,
          password: null,
          realname: null,
          email: null,
          phone: null,
          address: null,
        },
        load_data: false,
        on_submit_loading: false,
        rules: {
          username: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
          ],
          realname:[
            {required: true, message: '真实姓名不能为空', trigger: 'blur'},
            {pattern:/[\u4e00-\u9fa5]/gm, message:'只能是中文'}
          ],
          email:[
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          phone:[
            { required: true, message: '手机号码不能为空', trigger: 'blur'},
            {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, message:"请输入正确的手机号码"}
          ],
          address:[
            {required: true, message: '请输入住址', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      this.form = this.$route.params
    },
    methods: {
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_user.update(this.$route.params.id,this.form)
            .then(() => {
              this.$message.success("更新成功")
              setTimeout(this.$router.back(), 500)
            })
            .catch(() => {
              this.on_submit_loading = false
            })
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
