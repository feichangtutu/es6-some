### try to translate into Chinese
English version: [Promise A+](https://promisesaplus.com/)

翻译：

*这是实施者为实施者提供的开源，健全的，可互操作的JavaScript Promise 规范。*

Promise代表着异步操作的最终结果。与promise进行交互的主要方式是通过<code>then</code>方法，
该方法注册回调以接收promise的最终值或无promise未完成的原因。</br>

该规范详细说明了<code>then</code>方法的行为。可以依赖所有Promises / A +符合的promise实现来提供提
一个可互操作的基础。 因此，可以认为规范非常稳定。 尽管Promises / A +组织可能偶尔会修
改此规范，并采用较小的向后兼容更改来解决新发现的极端情况。但只有经过仔细考虑，讨论和测试后，
我们才会集成大型或向后不兼容的更改。


从历史上看，Promises / A +澄清了早期[Promises / A](http://wiki.commonjs.org/wiki/Promises/A)提案的行为条款，
将其扩展到涵盖事实上的行为并省略了未指明或有问题的部分。

最后，核心Promises / A +规范没有涉及如何创建，实现或拒绝 promises，而是选择专注于提供可互操作的<code>then</code>方法。 
配套规范中的未来工作可能涉及这些主题。

### 1. 术语
-------------
  - 1.1 "promise"是具有<code>then</code>方法的对象或函数，其行为符合此规范。
  - 1.2 "thenable"是定义<code>then</code>方法的对象或函数。
  - 1.3 "value"是任意合法的Javascript值，（包括<code>undefined</code>,thenable, promise）
  - 1.4 "exception"是使用<code>throw</code>语句抛出的值 
  - 1.5 "reason"是表示promise为什么被rejected的值
### 2. 要求
#### 2.1 Promise状态
一个promise必须处于三种状态之一： 请求态（pending）， 完成态（fulfilled），拒绝态（rejected）
##### 2.1.1当promise处于请求状态（pending）时
   - 2.1.1.1 promise可以转为fulfilled或rejected状态
##### 2.1.2当promise处于完成状态（fulfilled）时
   - 2.1.2.1 promise不能转为任何其他状态
   - 2.1.2.2 必须有一个值，且此值不能改变
##### 2.1.3当promise处于拒绝状态（rejected）时
   - 2.1.3.1 promise不能转为任何其他状态
   - 2.1.3.2 必须有一个原因（reason），且此原因不能改变
   
#### 2.2 <code>then</code>方法
promise必须提供<code>then</code>方法来存取它当前或最终的值或者原因。</br>
promise的<code>then</code>方法接收两个参数：
    
    promise.then(onFulfilled, onRejected)
##### 2.2.1 <code>onFulfilled</code>和<code>onRejected</code>都是可选的参数：
   - 2.2.1.1 如果 <code>onFulfilled</code>不是函数，必须忽略
   - 2.2.1.1 如果 <code>onRejected</code>不是函数，必须忽略
##### 2.2.2 如果<code>onFulfilled</code>是函数:
   - 2.2.2.1 此函数必须在<code>promise</code> 完成(fulfilled)后被调用,并把<code>promise</code> 的值作为它的第一个参数
   - 2.2.2.2 此函数在<code>promise</code>完成(fulfilled)之前绝对不能被调用
   - 2.2.2.2 此函数绝对不能被调用超过一次
##### 2.2.3 如果<code>onRejected</code>是函数:
   - 2.2.2.1 此函数必须在<code>promise</code> rejected后被调用,并把<code>promise</code> 的reason作为它的第一个参数
   - 2.2.2.2 此函数在<code>promise</code> rejected之前绝对不能被调用
   - 2.2.2.2 此函数绝对不能被调用超过一次
##### 2.2.4 在执行上下文堆栈（[execution context](https://es5.github.io/#x10.3)）仅包含[平台代码](#3.1这里的"平台代码")之前，不得调用 <code>onFulfilled</code>和<code>onRejected</code>
##### 2.2.5 <code>onFulfilled</code>和<code>onRejected</code>必须被当做函数调用(i.e. with no this value-->这里不会翻......). [3.2]
##### 2.2.6 <code>then</code>可以在同一个promise里被多次调用
   - 2.2.6.1 如果/当 <code>promise</code> 完成执行（fulfilled）,各个相应的<code>onFulfilled</code>回调
   必须根据最原始的<code>then</code> 顺序来调用
   - 2.2.6.2 如果/当 <code>promise</code> 被拒绝（rejected）,各个相应的<code>onRejected</code>回调
   必须根据最原始的<code>then</code> 顺序来调用
##### 2.2.7 <code>then</code>必须返回一个promise[3.3]
   ```
     promise2 = promise1.then(onFulfilled, onRejected);
   ```
   - 2.2.7.1 如果<code>onFulfilled</code>或<code>onRejected</code>返回一个值<code>x</code>, 运行
    Promise Resolution Procedure <code> [[Resolve]](promise2, x)</code>
   - 2.2.7.2 如果<code>onFulfilled</code>或<code>onRejected</code>抛出一个异常<code>e</code>,<code>promise2</code>
   必须被拒绝（rejected）并用<code>e</code>当作原因
   - 2.2.7.3 如果<code>onFulfilled</code>不是一个方法，并且<code>promise1</code>已经完成（fulfilled）,
    <code>promise2</code>必须使用与<code>promise1</code>相同的值来完成（fulfiled）
   - 2.2.7.4  如果<code>onRejected</code>不是一个方法，并且<code>promise1</code>已经被拒绝（rejected）,
    <code>promise2</code>必须使用与<code>promise1</code>相同的原因来拒绝（rejected）
#### 2.3 Promise解决程序
   *promise解析过程*是一个抽象操作，它将promise和value作为输入，我们将其表示为<code>[[Resolve]]（promise，x）</code>。
   如果<code>x</code>是thenable的，假设<code>x</code>的至少有点像<code>promise</code>，
    它会尝试让<code>promise</code>采用<code>x</code>的状态。不然就会用<code>x</code>来完成<code>promise</code>
    
   只要它们公开一个Promises / A +兼容的方法，对thenables的这种处理允许promise实现进行互操作，
   它还允许Promises / A +实现使用合理的<code>then</code>方法“同化”不一致的实现。
   
   运行<code>[[Resolve]](promise, x)</code>,执行以下步骤：
##### 2.3.1如果<code>promise</code>和<code>x</code>引用同一个对象，则用<code>TypeError</code>作为原因拒绝（reject）<code>promise</code>。
##### 2.3.2如果<code>x</code>是一个promise,采用promise的状态[3.4]
   - 2.3.2.1 如果<code>x</code>是请求状态(pending),<code>promise</code>必须保持pending直到<code>x</code>fulfilled或rejected
   - 2.3.2.2 如果<code>x</code>是完成态(fulfilled)，用相同的值完成如果<code>promise</code>
   - 2.3.2.2 如果<code>x</code>是拒绝态(rejected)，用相同的原因reject<code>promise</code>
##### 2.3.3另外，如果<code>x</code>是个对象或者方法
   - 2.3.3.1 让<code>x</code>作为<code>x.then</code>. [3.5]
   - 2.3.3.2 如果取回的<code>x.then</code>属性的结果为一个异常<code>e</code>,用<code>e</code>作为原因reject <code>promise</code>
   - 2.3.3.3 如果<code>then</code>是一个方法，把<code>x</code>当作<code>this</code>来调用它，
   第一个参数为 <code>resolvePromise</code>，第二个参数为<code>rejectPromise</code>,其中:
        + 2.3.3.3.1  如果/当 <code>resolvePromise</code>被一个值<code>y</code>调用，运行 <code>[[Resolve]](promise, y)</code>
        + 2.3.3.3.2  如果/当 <code>rejectPromise</code>被一个原因<code>r</code>调用，用<code>r</code>拒绝（reject）<code>promise</code>
        + 2.3.3.3.3  如果<code>resolvePromise</code>和 <code>rejectPromise</code>都被调用，或者对同一个参数进行多次调用，第一次调用执行，任何进一步的调用都被忽略
        + 2.3.3.3.4  如果调用<code>then</code>抛出一个异常<code>e</code>,
            - 2.3.3.3.4.1 如果<code>resolvePromise</code>或 <code>rejectPromise</code>已被调用，忽略。
            - 2.3.3.3.4.2 或者， 用<code>e</code>作为reason拒绝（reject）<code>promise</code>
   - 2.3.3.4  如果<code>then</code>不是一个函数，用<code>x</code>完成(fulfill)<code>promise</code>
##### 2.3.4 如果 <code>x</code>既不是对象也不是函数，用<code>x</code>完成(fulfill)<code>promise</code> 
如果一个promise被一个thenable resolve,并且这个thenable参与了循环的thenable环，
<code>[[Resolve]](promise, thenable)</code>的递归特性最终会引起<code>[[Resolve]](promise, thenable)</code>再次被调用。
遵循上述算法会导致无限递归，鼓励（但不是必须）实现检测这种递归并用包含信息的<code>TypeError</code>作为reason拒绝（reject）[2.3]

### 3.备注

#### 3.1 这里的"平台代码"
指的是引擎，环境和promise执行代码。在实践中，此要求确保<code>onFulfilled</code>和<code>onRejected</code>
能够异步执行，在<code>then</code>被调用之后传入实践环，并使用新的栈。这可以使用诸如<code>setTimeout</code>或<code>setImmediate</code>之类的“宏任务”机制，
或者使用诸如<code>MutationObserver</code>或<code>process.nextTick</code>之类的“微任务”机制来实现。
由于promise实现被认为是平台代码，因此它本身可能包含一个任务调度队列或调用处理程序的“trampoline”。
- 3.2 也就是说，在严格模式下，<code>this</code>是未定义的; 在宽松模式下，它将成为全局对象。
- 3.3 在实例满足所有要求的情况下，可以允许<code>promise2 === promise1</code>.
每个实例都必须表情是否能实现，以及再什么情况下，<code>promise2 === promise1</code>  ？？？
-3.4 通常，当<code>x</code>来自当前的实例时，<code>x</code>才是真正的<code>promise</code>
This clause allows the use of implementation-specific means to adopt the state of known-conformant promises
- 3.5 这个流程首先保存<code>x.then</code>的引用，
然后测试这个引用，然后调用这个引用，避免多次获取<code>x.then</code>属性。
这些预防措施对于确保访问者属性的一致性非常重要，访问者属性的值可能在检索之间发生变化。
- 3.6 实例不应该对thenable 链的深度设置任意限制，并假设递归超出任意限制，递归会无穷。只有真正的循环才会导致<code>TypeError</code>.
如果遇到thenbles的无限链，那么永远递归就是正确的行为。