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

const port_code = require("./code")
const port_user = require("./user")
const port_table = require("./table")
const port_file = require("./file")
const port_drug = require("./drug")
const port_supplier = require("./supplier")
const port_storageMain = require("./storageMain")

module.exports = {
  port_code, port_user,
  port_table, port_file,
  port_drug, port_supplier,
  port_storageMain
}
