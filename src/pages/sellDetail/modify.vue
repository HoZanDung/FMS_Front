<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="销售流水号:" prop="sellNo">
              <el-input v-model="form.sellNo" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="药品编号:" prop="drugNumber">
              <el-input v-model="form.drugNumber" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="销售单据:" prop="sellCredentials">
              <el-input v-model="form.sellCredentials" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="销售数量:" prop="sellNumber">
              <el-input v-model="form.sellNumber" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="销售金额:" prop="sellPrice">
              <el-input v-model="form.sellPrice" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="销售日期:" prop="sellDate">
              <el-input v-model="form.sellDate" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <!--退款状态-->
            <el-row class="form_row">
              <el-form-item label="退款状态:" prop="needAlarm">
                <el-switch v-model="form.refundStatus" :width="68" on-text=" 是 " off-text=" 否 " :on-value="1"
                           :off-value="2">
                </el-switch>
              </el-form-item>
            </el-row>
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
          sellNo: null,
          drugNumber: null,
          sellCredentials: null,
          sellNumber: null,
          sellPrice: null,
          sellDate: null,
          refundStatus: null
        },
        load_data: false,
        on_submit_loading: false,
        rules: {
          sellNo: [
            {required: true, message: '流水号不能为空', trigger: 'blur'}
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
          this.$fetch.api_sellDetail.update(this.$route.params.id, this.form)
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
