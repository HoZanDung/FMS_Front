/**
 * @file: table.
 * @intro: table请求数据配置.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:25.
 * @Copyright(©) 2017 by thinkive.
 *
 */

import fetch from 'common/fetch'
import {port_table} from 'common/port_uri'

//数据列表,获取所有文件信息
export function list() {
  return fetch({
    url: port_table.list,
    method: 'get'
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: port_table.get,
    method: 'get',
    params
  })
}

//根据id删除数据
export function deleteById(id) {
  return fetch({
    url: port_table.del + "/" + id,
    method: 'delete'
  })
}
//添加或修改数据
export function recoveryById(id) {
  return fetch({
    url: port_table.save + "/" +id,
    method: 'put'
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: port_table.batch_del,
    method: 'post',
    data
  })
}

