<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="学名:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="类型:" prop="type">
              <el-input v-model="form.type" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="条形:" prop="drugbar">
              <el-input v-model="form.drugbar" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="通用名字:" prop="genericName">
              <el-input v-model="form.genericName" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="拼音码:" prop="pinyinCode">
              <el-input v-model="form.pinyinCode" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="零售价格:" prop="retailPrice">
              <el-input v-model="form.retailPrice" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="进货价格:" prop="replenishPrice">
              <el-input v-model="form.replenishPrice" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="药品单位:" prop="unit">
              <el-input v-model="form.unit" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="剂量:" prop="dosage">
              <el-input v-model="form.dosage" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="产地:" prop="origin">
              <el-input v-model="form.origin" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="时效性:" prop="validity">
              <el-input v-model="form.validity" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="质量标准:" prop="qualityStandard">
              <el-input v-model="form.qualityStandard" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="经营方式:" prop="operation">
              <el-input v-model="form.operation" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="批号:" prop="batchNumber">
              <el-input v-model="form.batchNumber" placeholder="请输入内容" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="药品介绍:" prop="introduce">
              <el-input v-model="form.introduce" placeholder="请输入内容" style="width: 300px;" autosize></el-input>
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
          type: null,
          introduce: null,
          drugbar: null,
          genericName: null,
          pinyinCode: null,
          retailPrice: null,
          replenishPrice: null,
          unit: null,
          dosage: null,
          origin: null,
          validity: null,
          qualityStandard: null,
          operation: null,
          batchNumber: null
        },
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [
            {required: true, message: '学名不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '药品类型不能为空', trigger: 'blur'},
          ],
          genericName: [
            {required: true, message: '通用名字不能为空', trigger: 'blur'},
            {pattern: /[\u4e00-\u9fa5]/gm, message: '只能是中文'}
          ],
          drugbar: [
            {required: true, message: '药品条形不能为空', trigger: 'blur'},
          ],
          unit: [
            {required: true, message: '药品单位不能为空', trigger: 'blur'},
//            {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, message: "请输入正确的手机号码"}
          ],
          dosage: [
            {required: true, message: '请输入剂量', trigger: 'blur'}
          ],
          origin: [
            {required: true, message: '请输入产地', trigger: 'blur'}
          ],
          validity: [
            {required: true, message: '请输入时效性', trigger: 'blur'}
          ],
          qualityStandard: [
            {required: true, message: '请输入质量标准', trigger: 'blur'}
          ],
          batchNumber: [
            {required: true, message: '请输入批号', trigger: 'blur'}
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
          this.$fetch.api_drug.update(this.$route.params.id, this.form)
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
