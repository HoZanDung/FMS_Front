/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import * as actions from './type.js'
import * as mutations from '../mutations/type.js'

export default {
  [actions.SET_TOKEN_INFO]({commit}, tokeninfo){
    commit(mutations.SET_TOKEN_INFO, tokeninfo)
  },
  //设置用户信息和登录
  [actions.SET_USER_INFO]({commit}, userinfo){
    return new Promise((resolve, reject) => {
      if (userinfo !== null && userinfo.roles !== null) {
        var access = false;
        let privileges = userinfo.roles;
        for (var i in privileges) {
          if (privileges[i].name == 'ROLE_ADMIN') {
            access = true;
          }
        }
        if (access) {
          console.log("可以访问后台");
          commit(mutations.SET_USER_INFO, userinfo);
          resolve();
        } else {
          console.log("不可以访问后台");
          reject();
        }
      } else {
        commit(mutations.SET_USER_INFO, null)
      }
    });
  }
}
