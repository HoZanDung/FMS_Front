<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <h1>药品信息基础表</h1>
    <!--搜索栏-->
    <el-row class="search_row" style="margin-left: 5px;">
      <el-col :span="1">&nbsp;</el-col>
      <el-row>
        <el-col :span="2">
          <el-input placeholder="输入名字搜索" v-model="searchData.name" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="输入类型搜索" v-model="searchData.type" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="输入介绍搜索" v-model="searchData.introduce" class="inputForm"></el-input>
        </el-col>
      </el-row>
      <br/>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-row>
        <el-col :span="2" class="text">
          <el-input placeholder="输入条形搜索" v-model="searchData.drugbar" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="输通用名搜索" v-model="searchData.genericName" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="输拼音码搜索" v-model="searchData.pinyinCode" class="inputForm"></el-input>
        </el-col>
      </el-row>
      <br/>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-row>
        <el-col :span="2" class="text">
          <el-input placeholder="零售价格搜索" v-model="searchData.retailPrice" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="进货价格搜索" v-model="searchData.replenishPrice" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="药品单位搜索" v-model="searchData.unit" class="inputForm"></el-input>
        </el-col>
      </el-row>
      <br/>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-row>
        <el-col :span="2" class="text">
          <el-input placeholder="输入剂量搜索" v-model="searchData.dosage" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="输入产地搜索" v-model="searchData.origin" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="输时效性搜索" v-model="searchData.validity" class="inputForm"></el-input>
        </el-col>
      </el-row>
      <br/>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-row>
        <el-col :span="2" class="text">
          <el-input placeholder="质量标准搜索" v-model="searchData.qualityStandard" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="经营方式搜索" v-model="searchData.operation" class="inputForm"></el-input>
        </el-col>
        <el-col :span="2" class="text">
          <el-input placeholder="输入批号搜索" v-model="searchData.batchNumber" class="inputForm"></el-input>
        </el-col>
      </el-row>
      <br/>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="7" class="text" style="float: right;padding-right: 5px">
        <el-button type="primary" @click="handleReset" icon="circle-cross" class="button" style="margin: 0">重置
        </el-button>
        <el-button type="primary" @click="handleSearch" icon="search" class="button">搜索</el-button>
      </el-col>
    </el-row>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        :stripe="true"
        :highlight-current-row="true"
        :border="true"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="学名">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="80">
        </el-table-column>
        <el-table-column
          prop="drugbar"
          label="药品条形">
        </el-table-column>
        <el-table-column
          prop="genericName"
          label="通用名字">
        </el-table-column>
        <el-table-column
          prop="pinyinCode"
          label="拼音码">
        </el-table-column>
        <el-table-column
          prop="retailPrice"
          label="零售价格"
          width="100">
        </el-table-column>
        <el-table-column
          prop="replenishPrice"
          label="进货价格"
          width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="删除状态"
          width="100">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="药品单位">
                <span>{{props.row.unit}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="剂量:">
                <span>{{props.row.dosage}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="药品产地:">
                <span>{{props.row.origin}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="药品介绍:">
                <span>{{props.row.introduce}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="时效性:">
                <span>{{props.row.validity}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="质量标准:">
                <span>{{props.row.qualityStandard}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="经营方式:">
                <span>{{props.row.operation}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="批号:">
                <span>{{props.row.batchNumber}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template scope="props">
            <router-link :to="{name: 'drugTableModify', params: {
                id: props.row.id,
                name:props.row.name,
                type:props.row.type,
                introduce:props.row.introduce,
                drugbar:props.row.drugbar,
                genericName:props.row.genericName,
                pinyinCode:props.row.pinyinCode,
                retailPrice:props.row.retailPrice,
                replenishPrice:props.row.replenishPrice,
                unit:props.row.unit,
                dosage:props.row.dosage,
                origin:props.row.origin,
                validity:props.row.validity,
                qualityStandard:props.row.qualityStandard,
                operation:props.row.operation,
                batchNumber:props.row.batchNumber}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
              &nbsp;
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
            <el-button type="success" size="small" icon="delete" @click="recovery_data(props.row)">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, sizes, prev, pager, next"
            :total="total"
            :page-sizes="[5,10,15]"
            :page-size="pageSize">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElRow from "element-ui/packages/row/src/row";

  export default{
    data(){
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        size: 5,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: [],
        //总分页
        countPage: 0,
        //每页显示条数,
        pageSize: 0,
        searchData: {
          name:'',
          type:'',
          introduce:'',
          drugbar:'',
          genericName:'',
          pinyinCode:'',
          retailPrice:'',
          replenishPrice:'',
          unit:'',
          dosage:'',
          origin:'',
          validity:'',
          qualityStandard:'',
          operation:'',
          batchNumber:''
        }
      }
    },
    components: {
      ElRow,
      ElFormItem,
      panelTitle,
      bottomToolBar
    },
    mounted(){
      this.get_table_data()
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_table_data()
      },
      //获取数据
      get_table_data(){
        this.load_data = true
        this.$fetch.api_drug.list({
          page: this.currentPage,
          size: this.size
        })
          .then(({data}) => {
            this.table_data = data.data
            this.currentPage = data.metadata.pageInfo.CurrentPage
            this.total = data.metadata.pageInfo.TotalElements
            this.countPage = data.metadata.pageInfo.TotalPages
            this.pageSize = data.metadata.pageInfo.pageSize
            this.load_data = false
            for (var i = 0; i < this.table_data.length; i++) {
              if (this.table_data[i].status == "1") {
                this.table_data[i].status = "正常"
              } else {
                this.table_data[i].status = "已删除"
              }
            }
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //单个删除
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let uid = item.id
            this.load_data = false
            this.$fetch.api_drug.deleteById(uid)
              .then(() => {
                this.get_table_data()
                this.$message.success("删除成功")
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      },
      //单个恢复
      recovery_data(item){
        this.$confirm('此操作将恢复该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let uid = item.id
            this.load_data = false
            this.$fetch.api_drug.recoveryById(uid)
              .then(() => {
                this.get_table_data()
                this.$message.success("恢复成功")
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      //每页显示条数选择
      handleSizeChange(val) {
        this.size = val
        this.get_table_data()
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //批量删除
      on_batch_del(){
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_table.batch_del(this.batch_select)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      },
      //重置搜索
      handleReset() {
        this.searchData = {
          name: '',
          type: '',
          introduce: '',
          drugbar: '',
          genericName: '',
          pinyinCode: '',
          retailPrice: '',
          replenishPrice: '',
          unit: '',
          dosage: '',
          origin: '',
          validity: '',
          qualityStandard: '',
          operation: '',
          batchNumber: ''
        }
      },
      //处理搜索
      handleSearch() {
        this.load_data = true
        this.$fetch.api_drug.search({
          page: this.currentPage,
          size: this.size,
          name: this.searchData.name,
          type: this.searchData.type,
          introduce: this.searchData.introduce,
          drugbar: this.searchData.drugbar,
          genericName: this.searchData.genericName,
          pinyinCode: this.searchData.pinyinCode,
          retailPrice: this.searchData.retailPrice,
          replenishPrice: this.searchData.replenishPrice,
          unit: this.searchData.unit,
          dosage: this.searchData.dosage,
          origin: this.searchData.origin,
          validity: this.searchData.validity,
          qualityStandard: this.searchData.qualityStandard,
          operation: this.searchData.operation,
          batchNumber: this.searchData.batchNumber
        }).then(({data}) => {
          this.table_data = data.data
          this.currentPage = data.metadata.pageInfo.CurrentPage
          this.total = data.metadata.pageInfo.TotalElements
          this.countPage = data.metadata.pageInfo.TotalPages
          this.pageSize = data.metadata.pageInfo.pageSize
          this.load_data = false
          for (var i = 0; i < this.table_data.length; i++) {
            if (this.table_data[i].status == "1") {
              this.table_data[i].status = "正常"
            } else {
              this.table_data[i].status = "已删除"
            }
          }
        })
          .catch(() => {
            this.load_data = false
          })
      }
    }
  }
</script>
