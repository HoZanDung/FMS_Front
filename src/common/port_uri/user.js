/**
 * Created by zzmhot on 2017/3/24.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/24 14:56
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//用户登录
exports.login = "/oauth/token"
//用户登出
exports.logout = "/api/post/user/logout"
//创建用户
exports.index = "/users/create"
//获取当前登录用户信息
exports.me = "/users/myself"
//获取所有用户信息
exports.list = "/users/index"
//删除用户
exports.delete = "/users"
//恢复用户
exports.recovery = "/users/recovery"
