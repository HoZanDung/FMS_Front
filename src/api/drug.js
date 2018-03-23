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

//删除ID为id的药品
export function deleteById(id) {
  return fetch({
    url: port_drug.delete + "/" + id,
    method: 'delete'
  })
}

//恢复ID为id的药品
export function recoveryById(id) {
  return fetch({
    url: port_drug.recovery + "/" + id,
    method: 'put'
  });
}

//修改药品的信息
export function update(id, data) {
  return fetch({
    url: port_drug.update + "/" + id,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  });
}

//搜索药品信息
export function search(data) {
  return fetch({
    url: port_drug.search,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
