<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="供应商名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="拼音码:" prop="pinyinCode">
              <el-input v-model="form.pinyinCode" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="供应商地址:" prop="address">
              <el-input v-model="form.address" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="所属地区:" prop="area">
              <el-input v-model="form.area" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码:" prop="zipCode">
              <el-input v-model="form.zipCode" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人:" prop="contactPerson">
              <el-input v-model="form.contactPerson" placeholder="请输入紧急联系人电话" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="开户银行:" prop="bank">
              <el-input v-model="form.bank" placeholder="请输入银行名称" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="银行账户:" prop="bankAccount">
              <el-input v-model="form.bankAccount" placeholder="请输入银行账户" style="width: 300px;"></el-input>
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
          name: null,
          pinyinCode: null,
          address: null,
          area: null,
          zipCode: null,
          phone: null,
          contactPerson: null,
          bank: null,
          bankAccount: null
        },
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: 'blur'},
          ],
          zipCode: [
            {required: true, message: '邮政编码不能为空', trigger: 'blur'},
          ],
          contactPerson: [
            {required: true, message: '紧急联系人不能为空', trigger: 'blur'},
            {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, message: "请输入正确的紧急联系人手机号码"}
          ],
          phone: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, message: "请输入正确的手机号码"}
          ],
          bank: [
            {required: true, message: '请输入住址', trigger: 'blur'}
          ],
          bankAccount: [
            {required: true, message: '请输入银行账户', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_table.get({
          id: this.route_id
        })
          .then(({data}) => {
            this.form = data
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },

      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_supplier.add(this.form)
            .then(() => {
              this.$message.success("创建成功")
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
