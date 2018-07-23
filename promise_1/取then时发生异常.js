/**
 * Created by jyn on 2018/7/22.
 */
let obj = {}
Object.defineProperty(obj,'then',{
	get(){
		throw new Error();
	}
})
obj.then