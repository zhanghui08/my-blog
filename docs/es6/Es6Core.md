---
title: ES6特性
date: 2021-07-20
---

# 前言
    ES6虽然提供了许多特性，但是在实际工作中使用到的频率并不多。认真总结常用的。

## 一：块级作用域
ES6提供了let和const来代替var声明变量
- 不需要立即执行的函数表达式
- 在循环体内的闭包不会在有问题
- 防止重复声明变量
## 二：数组的扩展
1. Array.from() 将伪数组对象或可遍历对象转换为真数组
2. Array.of(v1,v2,v3) 将一系列数值转换成数组
3. 数组实例的 find()和 findlndex()
   数组实例的find()方法：用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
   ```js
   [1,4,-5,10].find((n) => n<0) //-5
   ```
   数组实例的findlnex方法的用法与find方法非常类似，返回第一个符合条件的数组成员位置，如果所有成员都不符合条件，则返回 -1.
   ```js
   [1,5,10,15].findIndex(function(value,index,arr){
       return value >9
   })  //2
   ```
4. 数组实例的includes()
    Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值。该方法的第二个参数表示搜索的起始位置，默认为0；如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度(比如第二个参数为 -4，但数组长度为3)，则会重置为从0开始。
    ```js
    [1, 2, 3].includes(2)   // true
    [1, 2, 3].includes(3, -1); // true
    [1, 2, 3, 5, 1].includes(1, 2); // true
    ```
    在该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。indexOf方法有2个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达不够直观。二是，它内部使用严格相等运算符符(===)进行判断，这会导致对NaN的误判。
    ```js
    [NaN].indexOf(NaN)  //-1
    [NaN].includes(NaN)  //true
    ```
5. 数组实例的 entries(),keys(),values()
    用于遍历数组，他们都是返回一个变量对象，可以用for...or循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
    ```js
    for(let index of ['a','b'].keys()){
        console.log(index)
    }
    // 0
    // 1
    for(let elem of ['a','b'].values()){
        console.log(elem)
    }
    // 'a'
    // 'b'
    for(let [index,elem] of ['a','b'].entries()){
        console.log(index,elem)
    }
    // 0 'a'
    // 1 'b'
    ```
## 三：箭头函数
ES6允许使用“箭头”(=>)定义函数。它主要有2个作用：缩减代码合改变this指向，
1. 缩减代码
    ```js
    const doube1 = function(number){
        return number *2  //ES5写法
    }
    const doube2 = (number) =>{
        return number *2  //ES6写法
    }
    const doube3 = number => number *2  //可以进一步简化
    ```
    多个参数记的加括号
    ```js
    const doube4 = (number,number2) => number + number2
    ```
    如果箭头函数的代码块部分多余一条语句，就要用大括号将它们扩起来，并且使用return语句返回
    ```js
    const deubel = (number,number1) =>{
        sum = number + number1
        return sum
    }
    ```
    简化回调函数
    ```js
    //正常函数写法
    [1,2,3].map(function(x){
        return x * x
    })
    //箭头函数写法
    [1,2,3].map(x => x * x)  //[1,4,9]
    ```
2. 改变this指向
长期以来，JavaScript语言的this对象一直是一个令人头痛的问题，在对象方法中使用this，必须得小心。剪头函数“绑定”this，很大程度上解决了这个困扰。
    ```js
   const team = {
       members:["Henry","Elyse"],
       teamName:"es6",
       teamSummary:function(){
           return this.members.map(function(member){
               return `${member}隶属于${this.teamName}小组`;    // this不知道该指向谁了
           })
       }
   }
   console.log(team.teamSummary());//["Henry隶属于undefined小组", "Elyse隶属于undefined小组"]
    ```
    teamSummary函数里面又嵌了个函数，这导致内部的this的指向发生了错乱。
    **如何修改：**
    方法一：let self = this
    ```js
   const team = {
       members:["Henry","Elyse"],
       teamName:"es6",
       teamSummary:function(){
           let self = this;
           return this.members.map(function(member){
               return `${member}隶属于${self.teamName}小组`;
           })
       }
   }
   console.log(team.teamSummary());//["Henry隶属于es6小组", "Elyse隶属于es6小组"]
    ```
    方法二：bind函数
    ```js
   const team = {
       members:["Henry","Elyse"],
       teamName:"es6",
       teamSummary:function(){
           return this.members.map(function(member){
               return `${member}隶属于${self.teamName}小组`;
           }.bind(this))
       }
   }
   console.log(team.teamSummary());//["Henry隶属于es6小组", "Elyse隶属于es6小组"]
    ```
    方法三：箭头函数
    ```js
   const tema = {
       members:["Henry","Elyse"],
       teamName:"es6",
       teamSummary:function(){
           return this.nembers.map((member) =>{
               //this指向就是tema对象
               return `${member}隶属于${self.teamName}小组`;
           })
       }
   }
   console.log(team.teamSummary());//["Henry隶属于es6小组", "Elyse隶属于es6小组"]
    ```
3. 使用注意点
    - 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
    - 不可以当做构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
    - 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数替代。
    - 不可以使用yield命令，因此箭头函数不能用作Genartor函数。
