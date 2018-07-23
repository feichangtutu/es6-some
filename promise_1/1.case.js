/**
 * Created by jyn on 2018/7/22.
 */
let Promise = require('./1.promise');
// 成功和失败的时候可以传递参数 (成功和失败是你自己定义的)
let promise = new Promise((resolve,reject)=>{
	setTimeout(()=>{
		reject('zfpx')
	},3000)// executor
});
promise.then((data)=>{
	console.log('success'+data)
},(err)=>{
	console.log('error'+err)
})
promise.then((data)=>{
	console.log('success'+data)
},(err)=>{
	console.log('error'+err)
})