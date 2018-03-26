/**
 * Created by HOZANDUNG on 18/3/26.
 */
import fetch from 'common/fetch'
import {port_supplier} from 'common/port_uri'
import qs from 'querystring'

//添加供应商信息
export function add(data) {
  return fetch({
    url: port_supplier.create,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//获取供应商信息
export function list(data) {
  return fetch({
    url: port_supplier.index,
    method: 'post',
    data: qs.stringify(data)
  })
}

//删除ID为id的供应商信息
export function deleteById(id) {
  return fetch({
    url: port_supplier.delete + "/" + id,
    method: 'delete'
  })
}

//恢复ID为id的供应商信息
export function recoveryById(id) {
  return fetch({
    url: port_supplier.recovery + "/" + id,
    method: 'put'
  })
}

//修改供应商信息
export function update(id, data) {
  return fetch({
    url: port_supplier.update + "/" + id,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
