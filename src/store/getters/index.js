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

export default {
  [type.GET_TOKEN_INFO]: state => {
    return state.Token
  },
  //获取用户信息
  [type.GET_USER_INFO]: state => {
    return state.User
  }
}
