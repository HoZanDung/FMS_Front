/**
 * @file: user.
 * @intro: 用户请求数据配置.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:18.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import fetch from 'common/fetch'
import {port_user} from 'common/port_uri'
import qs from 'querystring'

//登录,拿TOKEN
export function login(data) {
  return fetch({
    url: port_user.login,
    method: 'post',
    auth: {
      username: 'my-trusted-client',
      password: 'secret'
    },
    data: qs.stringify({
      username: data.username,
      password: data.password,
      grant_type: 'password'
    })
  })
}

//获取登录用户的相关信息
export function me() {
  return fetch({
    url: port_user.me,
    method: 'get',
  });
}

//获取所有用户信息
export function list() {
  return fetch({
    url:port_user.list,
    method:'get'
  })
}

//创建用户
export function add(data) {
  return fetch({
    url: port_user.index,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  });
}

//删除ID为id的用户
export function deleteById(id) {
  return fetch({
    url: port_user.delete + "/" + id,
    method: 'delete'
  });
}

//恢复ID为id的用户
export function recoveryById(id) {
  return fetch({
    url: port_user.recovery + "/" + id,
    method: 'put'
  });
}

//修改用户的信息
export function update(id, data) {
  return fetch({
    url: port_user.update + "/" + id,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  });
}


//登出
export function logout() {
  return fetch({
    url: port_user.logout,
    method: 'post'
  })
}
