---
title: JavaScript高频手写题
date: 2021-05-29
---

## 1.解析url参数
```js
//提出url里的参数并转换成对象
function getUrlParams(url){
    let reg = /([^?&=]+)=([^?&=]+)/g
    let obj = {}
    url.replace(reg,function(){
        obj[arguments[1]] = arguments[2]
    })
    return obj
}
let url = 'https://www.junjin.cn?a=1&b=2'
console.log(getUrlParams(url)) // { a: 1, b: 2 }
```

## 2. call
改变this指向，可以接收多个参数

```js
Function.prototype.myCall = function(ctx){
    ctx = ctx || window //ctx就是obj
    let fn = Symbol()
    ctx[fn] = this  //this就是foo
    let result = ctx[fn](...arguments)
    delete ctx[fn]
    return result
}
let obj = {name:张三}
function foo(){ return this.name } //把foo函数里的this指向，指向obj
console.log(foo.myCall(obj)) //张三
```
【用Symbol是因为它是独一无二的，避免obj里的属性重名】
【原理就是把foo添加到obj里，指向foo拿到返回值，在从obj里把foo删掉】

## 3.apply
原理上同上，只不过apply接收第二个参数是数组，不支持第三个参数
```js
Function.prototype.myApply = function(ctx){
    ctx = ctx || windows
    let fn = Symbol
    ctx[fn] = this
    let result
    if(arguments[1]){
        result = ctx[fn](...arguments[1])
    }else{
        result = ctx[fn]()
    }
    delete ctx[fn]
    return result
}
```

## 4.bind
```js
Function.prototype.myBind = function(ctx){
    const self = this
    const fn = function(){}
    const bind = function(){
        const _this = this instanceof fn ? this : ctx
        return self.apply(_this,[...args,...arguments])
    }
    fn.prototype = this.prototype
    bind.prototype = new fn()
    return bind
}
```
bind不会立即执行，会返回一个函数：
    函数可以直接执行并且传参，如 `foo.myBind(obj,1)(2,3)`,所以需要`[...args,...arguments]`合并参数
    函数也可以new，所以判断原型 `this instanceof fn` 

## 5.call、apply、bind区别
- 都可以改变this指向
- call和apply会立即执行，bind不会，而是返回一个函数
- call和bind可以接收对个参数，apply只能接收两个，第二个是数组
- bind参数可以分多次传入    

## 6.instanceof
接收两个参数，判断第二个参数是不是在第一个参数的原型上
```js
function myInstanceof(left, right) {
    // 获得实例对象的原型 也就是 left.__proto__
    let left = Object.getPrototypeOf(left)
    // 获得构造函数的原型
    let prototype = right.prototype
    // 判断构造函数的原型 是不是 在实例的原型链上
    while (true) {
        // 原型链一层层向上找，都没找到 最终会为 null
        if (left === null) return false
        if (prototype === left) return true
        // 没找到就把上一层拿过来，继续循环，再向上一层找
        left = Object.getPrototypeOf(left)
    }
}
```
## 7.数组去重
```js
// 示例数组
    let arr = [1, 1, "1", "1", true, true, "true", {}, {}, "{}", null, null, undefined, undefined]
//方法1：
    let newArr1 = Array.from(new Set(arr))
    console.log(newArr1) // [1, "1", true, "true", {}, {}, "{}", null, undefined]
//方法2：
    let newArr2 = arr =>{
        let map = new Map() // 或者用空对象 let obj =｛｝利用对象属性不能重复的特性
        let brr = []
        arr.forEach(item =>{
            if(!map.has(item)){ // 如果是对象的话就判断 !obj[item]
                map.set(item, true) // 如果是对象的话就 obj[item] = true  其他一样
                brr.push(item)
            }
        })
        return brr
    }
    console.log(newArr2(arr)) //[1, "1", true, "true", {}, {}, "{}", null, undefined]
//方法3：
    let newArr3 = arr =>{
        let brr = []
        arr.forEach(item =>{
            // 使用 indexOf  返回数组是否包含某个值 没有就返回 -1 有就返回下标
            if(brr.indexOf(item) === -1) brr.push(item)
            // 或者使用 includes 返回数组是否包含某个值  没有就返回false  有就返回true
            if(!brr.includes(item)) brr.push(item)
        })
        return brr
    }
    console.log(newArr3(arr)) //[1, "1", true, "true", {}, {}, "{}", null, undefined]
//方法4：
    let newArr4 = arr =>{
        //使用filter 返回符合条件的集合
        let brr = arr.filter((item,index)=>{
            return arr.indexOf(item) === index
        })
        return brr
    }
    console.log(newArr4(arr)) //[1, "1", true, "true", {}, {}, "{}", null, undefined]
```

## 8.数组扁平化 - 【把多维数组变成一堆数组】
```js
// 来个示例数组
let arr = [1, [2, [3, [4, [5]]]]]

// 方法一
    // flat() 默认拉平一层嵌套数组，传入数字几就拉平几层
    // Infinity 是无穷大，不管嵌套多少层都给你拉平
    let brr1 = arr.flat(Infinity)
    console.log(brr1) // [1, 2, 3, 4, 5]

// 方法二
    // 转成字符串，再去掉字符串里的 “[” 和 “]”，再把字符串转回数组
    let brr2 = JSON.parse( "[" + JSON.stringify(arr).replace(/\[|\]/g, "") + "]")
    console.log(brr2) // [1, 2, 3, 4, 5]

// 方法三
    let brr3 = arr => {
    // 用递归，用 for 循环加递归也可以，这里用 reduce
    // reduce 累计器，本质上也是循环，
    // cur 是循环的当前一个值，相当于 for循环里的arr[i]， pre 是前一个值，相当于for循环里的arr[i-1]
    let crr = arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? brr3(cur) : cur);
    }, [])
    return crr
    }
    console.log(brr3(arr)) // [1, 2, 3, 4, 5]
```

## 9.防抖
```js
//连续点击的情况下不会执行，只在最后一下点击指定的秒数后才会执行
//应用场景：点击按钮，输入模糊查询，词语联想等
    function changeInput(fn,wait){
        let timeout = null
        return function(){
            //每一次点击判断有延迟执行的任务就停止
            if(timeout !== null) clearTimeout(timeout)
            //否则就开启延迟任务
            timeout = setTimeout(fn,wait)
        }
    }
    function sayDebounce(){
        console.log('防抖成功')
    }
    btn.addEventListener("click", debounce(sayDebounce,1000))
```

## 10.节流
```js
//频繁触发的时候，比如滚动条或连续点击，在指定的时间内，只会执行一次
//应用场景：点击按钮，监听滚动条，懒加载等
// 方案1  连续点击的话，每过 wait 秒执行一次
    function throttle(fn, wait) {
    let bool = true
    return function() {
        if(!bool) return
        bool = false
        setTimeout(() => {
            // fn() // fn中this指向window
            fn.call(this, arguments) // fn中this指向btn  下面同理
                btn = true
            }, wait)
        }
    }
// 方案2 连续点击的话，第一下点击会立即执行一次 然后每过 wait 秒执行一次
    function throttle(fn, wait) {
        let date = Date.now()
        return function() {
            let now = Date.now()
            // 用当前时间 减去 上一次点击的时间 和 传进来的时间作对比
            if (now - date > wait) {
            fn.call(this, arguments)
            date = now
            }
        }
    }
    function sayThrottle() {
        console.log("节流成功！")
    }
    btn.addEventListener("click", throttle(sayThrottle,1000))
```

## 11.ES6继承
```js
//创建一个父类
    class Parent(){
        constructor(props){
            this.mame = 'Zhang san'
        }
    }
//创建一个继承自父类的子类
    class Child extends Parent{
        // props是继承过来的属性， myAttr是自己的属性
        constructor(props,myAttr){
            // 调用父类的构造函数，相当于获得父类的this指向
            super(props)
        }
    }
    console.log(new Child().name)  //Zhang san
```

## 12.双向数据绑定
```js
let obj = {}
let input  = document.getElementById('input')
let box = document.getElementById('box')
//数据劫持
Object.defineProperty(obj,'text',{
    configurable: true,
    enumerable: true,
    get(){
        //获取数据
        console.log('获取到数据了')
    }
    set(newVal){
    //修改数据然后重新赋值
    console.log('数据更新了')
    input.value=newVal
    box.innerHTML = newVal
}
})
//输入监听
input.addEventListener('keyup', function(e) {
    obj.text = e.target.value
})
```