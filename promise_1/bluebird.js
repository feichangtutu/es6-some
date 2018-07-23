/**
 * Created by jyn on 2018/7/22.
 */
let bluebird = require('bluebird')
let fs = require('fs')
//可以把node异步回调的api转化成promise的写法

bluebird.promisifyAll(fs)
console.log(fs)