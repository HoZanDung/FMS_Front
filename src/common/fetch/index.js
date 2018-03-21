/**
 * @file: index.
 * @intro: 数据请求统一封装.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 14:52.
 * @Copyright(©) 2017 by zzmhot.
 *
 */
//导入模块
import axios from "axios";
import {port_code} from "common/port_uri";
import {Message} from "element-ui";
import store from "../../store/index.js";
import {SET_USER_INFO} from "store/actions/type";
import {server_base_url} from "common/config";

//设置用户信息action
const setUserInfo = function (user) {
  store.dispatch(SET_USER_INFO, user)
}

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    // https://github.com/mzabriskie/axios

    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: server_base_url,
      //设置请求超时设置
      timeout: 2000,
      //设置请求时的header
      headers: {
        // 'Github-url': 'https://github.com/zzmhot/vue-admin',
        // 'X-Powered-By': 'zzmhot'
      }
    })

    instance.interceptors.request.use(
      config => {
        let token = store.state.Token;
        if (token) {
          config.headers.Authorization = token['token_type'] + ' ' + token['access_token'];
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );

    //请求处理
    instance(options)
      .then(data => {
      //   //请求成功时,根据业务判断状态
      //   if (code === port_code.success) {
      //     resolve({code, msg, data})
      //     return false
      //   } else if (code === port_code.unlogin) {
      //     setUserInfo(null)
      //     router.replace({name: "login"})
      //   }
      //   Message.warning(msg)
      //   reject({code, msg, data})
        resolve(data)
      })
      .catch((error) => {
        //请求失败时,根据业务判断状态
        if (error.response) {
          let resError = error.response
          let resCode = resError.status
          let resMsg = error.message
          reject({
            code: resCode,
            data: resData,
          })
          // Message.error('操作失败！错误原因 ' + resMsg)
          // reject({code: resCode, msg: resMsg})
        }
      })
  })
}
