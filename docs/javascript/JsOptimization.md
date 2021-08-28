---
title: JS优化小技巧
date: 2021-05-29
---

## 1.if多条件判断
```js
// 冗余
    if(x==='abc' || x==='vbn' || x==='mko'){}
// 简洁
    if(['abc','vbn','mko'].includes(x)){}
```

## 2. if...else...
```js
// 冗余
    let test:boolean
    if(x>100){
        test = true
    }else{
        test = false
    }
// 简洁
    let test = x >10
```

## 3.Null、Undefined,空值检查
```js
// 冗余
    if(first !== null || first !== undefined || first !== ''){
        let second = first
    }
// 简洁
    let second = first || ''
```

## 4.函数条件调用
```js
// 冗余
    function test1(){
        console.log('test1')
    }
    function test2(){
        console.log('test2')
    }
    var test3 = 1
    if(test3 ==1){
        test1()
    }else{
        test2()
    }
// 简洁
    (test3 === 1 ? test1:test2)()
```

## 5.switch条件
```js
// 冗余
    switch(data){
        case 1:
            test1()
        break;
        case 2:
            test2()
        break;
        case 3:
            test3()
        break;
    }
// 简洁
    var data = {
        1:test1,
        2:test2,
        3:test
    }
    data[anything] && data[anything]();
```

## 6.隐式返回
```js
// 冗余
    function getArea(diameter){
        return Math.PI * diameter
    }
// 简洁
    getArea  = diameter =>{
        Math.PI * diameter
    }
```

## 7.重复字符串多次
```js
// 冗余
    let test = ''
    for(let i=0; i<5; i++>){
        test +='重复5次'
    }
// 简洁
    'test'.repeat(5)
```

## 8.获得一个10位长度的随机字符串
```js
Math.random().toString(36).substr(2,10)
```

## 9.生成随机十六进制代码（生成随机颜色）
```js
//如：'#c618b2'
    '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6,'0')
```

## 10.深拷贝
```js
//使用变量a拷贝对象b，改变a中的值，b中的值也会跟着改变，这叫做浅拷贝。要想让a独立于b就需要深拷贝。
    function deepClone(){
        return JSON.parse(JSON.stringify(obj))
    }
```

```js
/**
 *深拷贝
 * @export
 * @param {*} obj
 * @returns
 */
export function deepCopy(obj){
    if(typeof obj != 'object'){
        return obj
    }
    if(obj == null){
       return obj
    }
    return JSON.parse(JSON.stringfiy(obj))
}
```

## 11.休眠多少秒

```js
/**
 * 休眠xxxms
 * @param {Number} milliseconds 
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//使用方式
const fetchData=async()=>{
	await sleep(1000)
}
```

## 12.生成随机字符串

```js
/**
 * 生成随机id
 * @param {*} length
 * @param {*} chars
 */
export function uuid(length, chars) {
    chars =
        chars ||
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    length = length || 8
    var result = ''
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result
}
```

## 13.对象转化为RormData对象

```js
/**
 * 对象转化为formdata
 * @param {Object} object
 */
export function getFormDate(object){
    const formData = new FormData()
    Object.keys(object).forEach(key =>{
        const value = object[key]
        if(Array.isArray(value)){
            value.forEach((subValue,i)=>{
                formData.append(key + `[${i}]`,sunValue)
            })
        }else{
            formData.append(key,object[key])
        }
        return formData
    })
}
```

使用场景：上传文件时，我们要新建一个FormData对象，然后有多少个参数append多少次，使用该函数可以简化逻辑

```js
let req = {
    file:xxx
    userId:1
    phone:'13616668989'
}
fetch(getFormDate(req))
```

## 14.保留到小数点以后n位

```js
//保留小数点以后几位，默认2位
export function cutNumber(number,no = 2){
    if(typeof number != 'number'){
        number = Number(number)
    }
    return Number(number.toFixed(no))
}
```

