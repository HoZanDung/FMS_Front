/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import {SET_USER_INFO, SET_TOKEN_INFO} from '../store/actions/type'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'
//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'
//bar charts
import barChartsComponent from 'pages/charts/bar'
//file charts
import fileChartsComponent from 'pages/charts/file'
//update table
import userModifyTableComponent from 'pages/table/modify'
//
import pullComponent from 'pages/home/pull'
//药品信息基础页面
import drugComponent from 'pages/drug/base'


Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/pull',
  name: 'pull',
  component: pullComponent
}, {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "主页",
      auth: true
    }
  }, {
    path: '/table/base',
    name: 'tableBase',
    component: baseTableComponent,
    meta: {
      title: "所有用户",
      auth: true
    }
  }, {
    path: '/table/sort',
    name: 'tableSort',
    component: sortTableComponent,
    meta: {
      title: "暂时没有",
      auth: true
    }
  }, {
    path: '/table/modify/:id',
    name: 'userTableModify',
    component: userModifyTableComponent,
    meta: {
      title: "修改用户",
      auth: true
    }
  }, {
    path: '/table/add',
    name: 'tableAdd',
    component: saveTableComponent,
    meta: {
      title: "添加数据",
      auth: true
    }
  }, {
    path: '/charts/bar',
    name: 'chartsBar',
    component: barChartsComponent,
    meta: {
      title: "柱状图表",
      auth: true
    }
  }, {
    path: '/charts/file',
    name: 'chartsFile',
    component: fileChartsComponent,
    meta: {
      title: "文件上传",
      auth: true
    }
  }, {
    path: '/drug/base',
    name: 'drugBase',
    component: drugComponent,
    meta: {
      title: "药品信息列表",
      auth: true
    }
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
const clearInfo = function () {
  store.dispatch(SET_USER_INFO, null);
  store.dispatch(SET_TOKEN_INFO, null);
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.auth)) {
    let auth = store.state.User.id;
    console.log("HoZanDung作品");
    if (auth != null) {
      next();
    } else {
      clearInfo();
      next({
        name: 'login'
      });
    }
  } else {
    next();
  }
});

// //路由完成之后的操作
// router.afterEach(route => {
//   NProgress.done()
// })

export default router
