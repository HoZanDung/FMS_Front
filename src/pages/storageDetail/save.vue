<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="入库单据号:" prop="documentNo">
              <el-input v-model="form.documentNo" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="药品编号:" prop="drugNumber">
              <el-input v-model="form.drugNumber" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="入库数量:" prop="storageAmount">
              <el-input v-model="form.storageAmount" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="入库单价:" prop="storageUnitPrice">
              <el-input v-model="form.storageUnitPrice" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="入库总金额:" prop="storageAllPrice">
              <el-input v-model="form.storageAllPrice" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="库存数量:" prop="storageAmounting">
              <el-input v-model="form.storageAmounting" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="入库日期:" prop="storageDate">
              <el-input v-model="form.storageDate" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <!--入库状态-->
            <el-row class="form_row">
              <el-form-item label="入库状态:" prop="needAlarm">
                <el-switch v-model="form.storageStatus" :width="68" on-text=" 是 " off-text=" 否 " :on-value="1"
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
          documentNo: null,
          drugNumber: null,
          storageAmount: null,
          storageUnitPrice: null,
          storageAllPrice: null,
          storageDate: null,
          storageAmounting: null,
          storageStatus: null
        },
        load_data: false,
        on_submit_loading: false,
        rules: {
          documentNo: [
            {required: true, message: '入库单编号', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
    },
    methods: {
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_storageDetail.add(this.form)
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
