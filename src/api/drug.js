import fetch from 'common/fetch'
import {port_drug} from 'common/port_uri'
import qs from 'querystring'

//添加药品信息
export function add(data) {
  return fetch({
    url: port_drug.create,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  });
}

//获取药品列表信息
export function list(data) {
  return fetch({
    url: port_drug.index,
    method: 'post',
    data: qs.stringify(data)
  })
}
