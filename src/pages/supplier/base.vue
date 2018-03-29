<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'supplierAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <h1>供应商信息基础表</h1>
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
          label="供应商名字">
        </el-table-column>
        <el-table-column
          prop="pinyinCode"
          label="拼音码">
        </el-table-column>
        <el-table-column
          prop="area"
          label="所属地区"
          width="100">
        </el-table-column>
        <el-table-column
          prop="zipCode"
          label="邮政编码"
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
              <el-form-item label="联系人:">
                <span>{{props.row.pinyinCode}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="联系电话:">
                <span>{{props.row.phone}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="供应商地址:">
                <span>{{props.row.address}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="联系人:">
                <span>{{props.row.contactPerson}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="开户银行:">
                <span>{{props.row.bank}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="银行账户:">
                <span>{{props.row.bankAccount}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template scope="props">
            <router-link :to="{name: 'supplierTableModify', params: {
                id: props.row.id,
                name:props.row.name,
                pinyinCode:props.row.pinyinCode,
                address:props.row.address,
                area:props.row.area,
                zipCode:props.row.zipCode,
                phone:props.row.phone,
                contactPerson:props.row.contactPerson,
                bank:props.row.bank,
                bankAccount:props.row.bankAccount}}" tag="span">
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
          name: '',
          pinyinCode: '',
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
        this.$fetch.api_supplier.list({
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
            this.$fetch.api_supplier.deleteById(uid)
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
            this.$fetch.api_supplier.recoveryById(uid)
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
          pinyinCode: ''
        }
      },
      //处理搜索
      handleSearch() {
        this.load_data = true
        this.$fetch.api_drug.search({
          page: this.currentPage,
          pinyinCode: this.searchData.pinyinCode,
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
