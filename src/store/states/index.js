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

import {sessionStorage} from '../../common/storage/index.js'

export default {
  Token: sessionStorage.get('token_info'),
  //用户信息和是否登录
  User: sessionStorage.get('user_info')
}
