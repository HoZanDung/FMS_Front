<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./images/logo.png" alt="AdminX">
      </router-link>
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: 'slide',
    data(){
      return {
        nav_menu_data: [{
          title: "主页",
          path: "/home",
          icon: "fa-home"
        }, {
          title: "ADMIN管理",
          path: "/table",
          icon: "fa-table",
          child: [{
            title: "所有用户",
            path: "/table/base"
          }, {
            title: "所有文件",
            path: "/table/sort"
          }]
        }, {
          title: "USER管理",
          path: "/charts",
          icon: "fa-bar-chart-o",
          child: [{
            title: "柱状图表",
            path: "/charts/bar"
          }, {
            title: "文件上传",
            path: "/charts/file"
          }]
        }, {
          title: "药品信息模块",
          path: "/drug/base",
          icon: "fa-table",
        }, {
          title: "供应商模块",
          path: "/supplier/base",
          icon: "fa-table"
        }, {
          title: "库存管理模块",
          path: "/storageMain/base",
          icon: "fa-bar-chart-o"
        }, {
          title: "库存细节模块",
          path: "/storageDetail/base",
          icon: "fa-bar-chart-o"
        }, {
          title: "销售模块",
          path: "/sellDetail/base",
          icon: "fa-table"
        }]
      }
    }
  }
</script>
