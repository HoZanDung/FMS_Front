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
import * as type from './type.js'
import {sessionStorage} from '../../common/storage/index.js'


export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.User = userinfo || {}
    if (userinfo === null) {
      sessionStorage.remove('user_info')
    } else {
      sessionStorage.set('user_info', userinfo)
    }
  },
  //设置token
  [type.SET_TOKEN_INFO](state, tokeninfo){
    state.Token = tokeninfo || {};
    if (tokeninfo === null) {
      sessionStorage.remove('token_info')
    } else {
      sessionStorage.set('token_info', tokeninfo)
    }
  }
}
