---
title: 基本语法
date: 2021-07-20
---

## 参考网站：https://juejin.cn/post/6995334897065787422#heading-44

**1.迭代器与for or**

```js
for in 语句用于遍历数组或者对象的属性(对数组或者对象的属性进行循环操作)。
       得到对象的key或数组，字符串下标。
for of和forEach一样，是直接得到值。
for in 是遍历键名，for of是遍历键值。

```

```js
//变量对象
const todos = {
     life: ['吃饭', '睡觉', '打豆豆'],
     learn: ['语文', '数学', '外语'],
     work: ['喝茶'],
}
for(const item of todos){
        console.log(item)
}
```
**2.模板字符串与标签函数**
标签函数在**定义时和普通函数**没有区别。区别在**函数的调用上**，主要提现在一下两点：

  - 标签函数以模板字符串作为参数输入
  - 标签函数具备的形、实参匹配规则

```js
//1.定义标签函数
const fn = (literals,...values)=>{
    console.log('字面量数组',literals)
    console.log('变量数组',values)
    console.log('字面量数组是否比变量多一个元素',literals.length -1 === values.length) //true
    let output = ''
    let index  //不能放在for循环里，因为index在块级作用域之外还有访问
    for(index=0; index <values.length; index ++>){
        output += literals[index] + values[index]
    }
    output +=literals[index]
    return output
}
//2.使用标签函数
const name = '张三'
const age =18
const result = fn`姓名:${name},年龄:${age}`
```

### 二：数据类型

**1. Symbol**

- 是ES6提供的一种新的**原始数据类型**，可以用来表示独一无二的值。此外，它也是**对象属性名的第二种数据类型（另一种是字符串）**

### 三：数据结构
1. Set
    - 数组去重、字符串去重
    ```js
    //数组去重
        let arr = [1,2,3,3,5,1]
        arr = Array.from(new Set(srr)) //经过性能比较测试，表现优秀
        console.log(arr) //[1,2,3,5]
    //字符串去重
        let str = 'aaabbsf'
        let newStr = ''
        new Set(str).forEach(item) =>{newStr +=item}
    ```
    - 集合间操作:交集、并集、差集
    ```js
    	lat a = new Set([1,2,3])
    	lat b = new Set([4,3,2])
    //并集
    	let union = new Set([..a,..b])
    //{1,2,3,4}
    //交集
    	let intersect = new Set([..a].filter(x => b.has(x)))
    //{2,3}
    //{a 相对于 b 的差集}
    	let difference = new Set([..a].filter(x => !b.has(x)))
    ```
2. Map
    - 对于JavaScript而言也是一种新的数据结构，用于存储健、值对形式的字典/双列集合。在map对象出现之前，我们通常会使用Object对象来做键值对的存储，下面对比一下实现键值对存储与普通对象存储值对的区别：
        - 功能角度：
          Object对象只能使用字符串或者Symbio类型作为键，而Map对象可以使用任何函数数据类型作为键。
          Map对象使用引用类型作为键时，以内存地址是否一致来作为判断两个键是否相同的标准。
        - 构造与读写角度：
          Object对象字面量构造并存储键值对的方式比Map方便，其读写操作也比Map需要调用git、set方法而言性能更好。
        - 常用Api角度：
          Object对象的原型为Object.prototype
          Map对象的原型为Map.prototype
        - 序列化角度：

3. 数组新增的常用4个方法
    - map 映射
    ```js
    let arr = [66,59,80]
    let result = arr.map(item =>{
        if(item >=60){
            return '及格'
        }else{
            return '不及格'
        }
    })
    //result:["及格", "不及格", "及格"]
    ```
    - reduce 汇总
    ```js
    let arr = [20,23,40,90]
    let result = arr.reduce((tmp,item,index)=>{
        console.log(tmp,item,index)
        return tmp+item
    })
    //求和  console.log(result)  
    ```
    - filter 过滤
    ```js
    let arr = [
        {title:'华为',price:200}
        {title:'小米',price:100}
        {title:'苹果',price:20}
    ]
    let result = arr.filter(json=>json.price >=100)
    console.log(result) //[{title:'华为',price:200},{title:'小米',price:100}]
    ```
    - forEach 迭代
    ```js
    let arr = [12,5,8,9]
    arr.forEach((item,index)=>{
        console.log(index + ':' + item)  //0: 12  1: 5  2: 8  3: 9
    })
    ```

4. 函数的参数
    1. 搜集参数
    ```js
    function show(a,b,...args){
        console.log(args)
    }
    show(1,2,3,4,5,6)  //输出[3,4,5,6]
    ```
    2. 展开数组
    ```js
    const arr1 = [1,2,3]
    const arr2 = [4,5,6]
    console.log([...arr1,...arr2])  //输出[1,2,3,4,5,6]
    console.log(..arr1)
    ```
    3. 默认值
    ```js
    const show = (a=666,b=999) =>{
        console.log(a) //输出666
        console.log(b) //输出999
    }
    show()
    ```

5. 解构赋值
    ```js
    //左右两边结构必须一样、必须是合法值、声明和赋值不能分开(必须在一个括号里)
    	let [a,b,c]=[1,2,3,999]
    	let {e,d,g}={e: 4, d: 5, f: 6, g: 7}
    	console.log(a,b,c,e,d,g);
    //输出1 2 3 4 5 7
    ```
### 四：面向对象
1. class
   JavaScript大量借鉴了java面向对象的思想和语法，以实现面向对象编程。
   
    - 面对对象三大特征之 - 封装
    ```js
   class Anima{
       constructor(name){
           this.name = name //实例属性
       }
       cry(){ //实例方法
           console.log('cry')
       }
       static getNum(){ //静态方法
           return AnimalES6.num
       }
   }
   Animal.num = 42  //静态属性
    ```
    - 面对对象三大特征之 - 继承
        - 子类对象具有父类对象的属性和行为
        - 子类对象可以有它自己的属性和行为
        ```js
        class Cat extends Animal{
            constructor(name,type){
                super(name) //必须先构造父类空间
                this.type = type
            }
            cry(){
                console.log('miao miao') //方法重写
            }
        }
        ```
    - 面对对象三大特征之 - 多态
      由于JavaScript是弱类型语言，所以JavaScript实现多态，不存在父类引用指向子类对象的问题。
        - 继承
        - 重写
        - 父类引用指向子类对象
        ```js
      class Dog extends Animal{
          constructor(name, type) {
              super(name);
              this.type = type;
          }
      
          cry() {
              console.log('wang wang');
          }
      }
      const ani = new Animal('不知名动物')
      const cat = new Cat('小白','小美')
      const dog = new Dog('二哈','秋田')
      ani.cry();// 输出 cry
      cat.cry();// 输出 miao miao
      dog.cry();// 输出 wang wang
        ```
### 五：内置对象
1. Reflect
2. Proxy
   是JavaScript的一个内置对象(函数类型对象)，它的实例对象用于定于对象基本操作的自定义行为(如属性查找、付值、梅举、函数调用)
   - 1.实现属性读写AOP
   ```js
   const person = {
       name: 'zce',
       age: 20
   }
   const personProxy = new Proxy(person, {
       get (target, property) {
           return property in target ? target[property] : 'default'
       },
       set (target, property, value) {
           if (property === 'age') {
               if (!Number.isInteger(value)) {
                   throw new TypeError(`${value} is not an int`)
               }
           }
           target[property] = value
       }
   })
   personProxy.age = 100
   personProxy.gender = true
   console.log(personProxy.name)
   console.log(personProxy.xxx)
   ```
   - 2.实现数组操作的监视
   ```js
   const list = []
   const listProxy = new Proxy(list,{
       set(target,property,value){
           console.log('set',property,value)
           target[property] = value
           return true //表示设置成功
       }
   })
   listProxy.push(100)
   ```
### 六：箭头函数
1. 不需要function关键字来创建函数
    ```js
    //es5创建
    	var as = function(){}
    //es6创建
    	var as = () =>{}
    ```
2. 可以极大的简写函数
    ```js
    //es5
        var fn = function(a){
            return a+5
        }
    //es6
    	var fn = a => a+5
    ```
    ```js
    当函数所传参数只有一个时，可以去掉(); 简写为：a=>{}
    当函数体中只有一个返回值，而没有其他操作时，可以去掉{}; 简写为：(a,b)=> a+
        var f=(x,y)=>{ return x+y}
        console.log(f(1,2));  //3
    ```
3. 箭头函数的基本特点
    1. 箭头函数this为父级作用域的this,不是调用时的this
    ```js
    //箭头函数的this永远指向其父级作用域，任何方法都改变不了，包括call、apply、bind
    //普通函数的this指向调用它的那个对象
    let person = {
        name:'nike',
        init:()=>{
            //为body添加一个点击事件，看看这个点击后的this属性有什么不同
            document.body.onclick = ()=>{
                alert(this.name);//?? this在浏览器默认是调用时的对象,可变的？                  
            }
        }
    }
    //init为剪头函数，其内部的this为全局window，onclick的this也就是init函数的this，也就是window，得到的this.name是undefined
    ```
    2. 箭头函数不能作为构造函数，不能使用new
    ```js
    //构造函数
    function Person(a){
        this.name = a
    }
    //使用箭头函数作为构造函数
    var Person = (p) =>{
        this.name = p.name
    }
    //由于this实例是对象实例，而箭头函数是没有实例的，此处的this指向别处，不能产生person实例。
    ```
    3. 箭头函数通过call和apply调用，不会改变this指向，只会传入参数
    ```js
    let obj2 = {
        a: 10,
        b: function(n) {
            let f = (n) => n + this.a;
            return f(n);
        },
        c: function(n) {
            let f = (n) => n + this.a;
            let m = {
                a: 20
            };
            return f.call(m,n);
        }
    };
    console.log(obj2.b(1));  // 11
    console.log(obj2.c(1)); // 11
    ```
    4. 箭头函数没有原型
    ```js
    var a = () =>{
        return 1
    }
    function b(){
        return 2
    }
    console.log(a.prototype);  // undefined
    console.log(b.prototype);   // {constructor: ƒ}
    ```
    5. 箭头函数返回对象时，需要加一个小括号
    ```js
    var fun = () => ({foo:1}) //正确
    var fun = () =>{foo:1} //错误
    ```
    6. 箭头函数在ES6 class中声明方法为实例方法，不是原型方法
    ```js
    //案例1
        class Super{
            sayName(){

            }
        } //通过Super.prototype可以访问到sayName方法，这种形式定义的方法，都是定义在prototype上
        var a = new Super()
        var b = new Super()
        a.sayName === b.sayName  //true
    //案例2
        class Super{
            sayName =()=>{

            }
        } //通过Super.prototype访问不到sayName方法，该方法没有定义在prototype上
        var a = new Super()
        var b = new Super()
        a.sayName === b.sayName //false
    ```
    7. 多重箭头函数就是一个高阶函数，相当于内嵌函数
    ```js
    	const add = x => y => x+y
    //相当于
        function add(x){
            return function(y){
                return x+y
            }
        }
    ```

4. 当要求动态上下文的时候，就不能使用箭头函数，也就是this的固定化。
    1. 在使用 =>定义函数的时候，this的指向是定义时所在的对象，而不是使用时所在的对象。
    2. 不能够使用构造函数，不能够使用new命令，否则就会抛出一个错误。
    3. 不能使用 arguments对象。
    4. 不能使用yield命令。
### 七：ES8特性
1. async/await
    ```js
    async doLogin2() {
        const userId=await this.login(userName);
        const result=await this.getData(userId);
    }
    this.doLogin()// Success
    this.doLogin2()// Success
    ```
    1. 获取异步函数的返回值
       异步函数本身会返回一个Promise,可以通过.then来获取异步函数的返回值。
       ```js
       async function charCountAdd(data1, data2) {
           const d1=await charCount(data1);
           const d2=await charCount(data2);
           return d1+d2;
       }
       charCountAdd('Hello','Hi').then(console.log);//通过then获取异步函数的返回值。
       function charCount(data) {
           return new Promise((resolve, reject) => {
               setTimeout(() => {
                   resolve(data.length);
               }, 1000);
           });
       }
       ```
    2. async/await在并发场景中的应用
        对于上述的例子，我们调用await两次，每次都是等待1秒一共是2秒，效率比较低，而且两次await的调用并没有依赖关系，那能不能让其并发执行呢，答案是可以的，接下来我们通过Promise.all来实现await的并发调用。
        ```js
        async function charCountAdd(data1, data2) {
            const [d1,d2]=await Promise.all([charCount(data1),charCount(data2)]);
            return d1+d2;
        }
        charCountAdd('Hello','Hi').then(console.log);
        function charCount(data) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(data.length);
                }, 1000);
            });
        }
        ```
    3. async/await的几种错误处理方式
        1. 捕获整个函数的错误
        ```js
        async function charCountAdd(data1, data2) {
            const d1=await charCount(data1);
            const d2=await charCount(data2);
            return d1+d2;
        }
        charCountAdd('Hello','Hi')
            .then(console.log)
            .catch(console.log);//捕捉整个async/await函数的错误
        ```
        2. 捕获单个await表达式的错误
        ```js
        async function charCountAdd(data1, data2) {
            const d1=await charCount(data1)
            .catch(e=>console.log('d1 is null'));
            const d2=await charCount(data2)
            .catch(e=>console.log('d2 is null'));
            return d1+d2;
        }
        charCountAdd('Hello','Hi').then(console.log);
        ```
        3. 同时捕获多个await表达式的错误
        ```js
        async function charCountAdd(data1, data2) {
            let d1,d2;
            try {
                d1=await charCount(data1);
                d2=await charCount(data2);
            }catch (e){
                console.log('d1 is null');
            }
            return d1+d2;
        }
        charCountAdd('Hello','Hi')
            .then(console.log);

        function charCount(data) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(data.length);
                }, 1000);
            });
        }

        ```