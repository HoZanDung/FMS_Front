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
            {required: true, message: '销售流水号不能为空', trigger: 'blur'}
          ],
          drugNumber: [
            {required: true, message: '药品编号不能为空', trigger: 'blur'},
            {pattern: /^[0-9]*$/, message: '只能是数字'}
          ],
          sellNumber: [
            {required: true, message: '销售数量不能为空', trigger: 'blur'},
            {pattern: /^[0-9]*$/, message: '只能是数字'}
          ],
          sellPrice: [
            {required: true, message: '销售金额不能为空', trigger: 'blur'},
            {pattern: /^[0-9]*$/, message: '只能是数字'}
          ],
          sellDate: [
            {required: true, message: '销售日期不能为空', trigger: 'blur'},
            {
              pattern: /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/,
              message: 'YYYY-MM-DD'
            }
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
          this.$fetch.api_sellDetail.add(this.form)
            .then((data) => {
              console.log(data)
              if (data.data == "no") {
                this.$message.warning("库存有误,请到库存管理页面确认")
                setTimeout(this.$router.back(), 1000)
              } else if (data.data == "yes") {
                this.$message.success("创建成功")
                setTimeout(this.$router.back(), 500)
              } else {
                this.$message.error("输入药品编号有误,请到库存管理页面确认")
                setTimeout(this.$router.back(), 1000)
              }
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
