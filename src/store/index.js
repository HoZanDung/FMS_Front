/**
 * Created by zzmhot on 2017/3/23.
 *
 * 状态管理器
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:24
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import Vuex from 'vuex'

//引入模块
import actions from './actions/index.js'
import getters from './getters/index.js'
import mutations from './mutations/index.js'
import state from './states/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
