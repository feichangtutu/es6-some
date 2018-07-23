/**
 * Created by jyn on 2018/7/22.
 */
//promiseA+规范 promiseaplus.com
//promise有兼容性问题 node环境运行的默认都支持
//自己写一个兼容版promise库

//promise三种状态 等待态 pending 成功态  resolved 失败 rejected
//状态的转化 pending-> resolved
//pending->rejected
// resolve reject不能互转 状态只会更改一次

let promise = new Promise(function (resolve, reject) {
	setTimeout(function(){
		reject()
	},1000)
	console.log(1)
	// resolve()
})
promise.then(()=>{
	console.log('success')
}, ()=>{
	console.log('error')

})
promise.then(()=>{
	console.log('success')
}, ()=>{
	console.log('error')

})

console.log(2)
//1.executor 默认new的时候就自动执行
//每个promise的实例，都有then方法
//then两个参数,成功回调 失败回调
//then的方法是一步的（微任务）
//同一个promise会调用多次then,成功时调用所有的成功方法 ，失败时调用所有的失败方法
//new Promise支持异步行为
//如果发现错误就进入失败态

//executor?  同步执行