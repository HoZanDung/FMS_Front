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
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="80">
        </el-table-column>
        <el-table-column
          prop="roles"
          label="权限"
          width="80">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="真实姓名:">
                <span>{{props.row.realname}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="邮箱:">
                <span>{{props.row.email}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="手机号码:">
                <span>{{props.row.phone}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="地址:">
                <span>{{props.row.address}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template scope="props">
            <router-link :to="{name: 'userTableModify', params: {
                id: props.row.id,
                username:props.row.username,
                password:props.row.password,
                realname:props.row.realname,
                email:props.row.email,
                phone:props.row.phone,
                address:props.row.address}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
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
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'

  export default{
    data(){
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        size: 15,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: []
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
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
        this.$fetch.api_user.list({
          page: this.currentPage,
          size: this.size
        })
          .then(({data: {data, metadata}}) => {
            var newData = []
            for (var item of data) {
              item.roles = item.roles[0].description
              newData.push(item)
            }
            this.table_data = newData
            this.currentPage = metadata.pageInfo.CurrentPage
            this.total = metadata.pageInfo.TotalPages
            this.load_data = false
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
            this.$fetch.api_user.deleteById(uid)
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
            this.$fetch.api_user.recoveryById(uid)
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
      }
    }
  }
</script>
