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

//删除ID为id的文件
export function deleteById(id) {
  return fetch({
    url: port_table.delete + "/" + id,
    method: 'delete'
  });
}

//恢复ID为id的文件
export function recoveryById(id) {
  return fetch({
    url: port_table.recovery + "/" + id,
    method: 'put'
  });
}

//批量删除
export function batch_del(data) {
  return fetch({
    url: port_table.batch_del,
    method: 'post',
    data
  })
}

