/**
 * Created by HOZANDUNG on 18/3/27.
 */
import fetch from 'common/fetch'
import {port_sellDetail} from 'common/port_uri'
import qs from 'querystring'

//添加库存细节表信息
export function add(data) {
  return fetch({
    url: port_sellDetail.create,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//获取库存细节表信息
export function list(data) {
  return fetch({
    url: port_sellDetail.index,
    method: 'post',
    data: qs.stringify(data)
  })
}

//删除ID为id的库存细节表信息
export function deleteById(id) {
  return fetch({
    url: port_sellDetail.delete + "/" + id,
    method: 'delete'
  })
}

//恢复ID为id的库存细节表信息
export function recoveryById(id) {
  return fetch({
    url: port_sellDetail.recovery + "/" + id,
    method: 'put'
  })
}

//修改库存细节表信息
export function update(id, data) {
  return fetch({
    url: port_sellDetail.update + "/" + id,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
