---
title: Vue 总结点常用的
date: 2021-08-28
---

## 1.vue的优缺点？
    优点：渐进式、组件化、轻量、虚拟dom、响应式、单页面路由、数据与视图分开。
    缺点：单页面不利于seo、不支持IE8以下、首屏加载时间长。

## 2.为什么说Vue是一个渐进式框架？
    渐进式：通俗点讲就是，你想用啥你就用啥，咱也不强求你。你想用component就用，不用也行，你想用vuex就用，不用也可以。

## 3.Vue跟React有什么区别？
    相同点：
        都是要了虚拟dom、组件化开发、都是单向数据流(父子组件之期，不建议子修改父传下来的数据)、都支持服务端渲染。
    不同点：
        React的JSX，Vue的template、数据变化，React手动(setState),Vue自动(初始化已响应式处理,Object.defineProperty)、Raact单向绑定,Vue双向绑定、React的Redux，Vue的Vuex。

## 4.MVVM和MVC有什么区别？
    MVC：
        Model(模型)：负责从数据中取数据。
        View(视图)：负责展示数据。
        Controller(控制器)：用户交互的地方，例如点击事件等。
        【思想】：Controller将Model的数据展示在View上。
    MVVM：
        VM：也就是View-Model，做了两件事达到了数据的双向绑定 一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。
        【思想】：实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（对应Vue数据驱动的思想）。
    区别：
        MVVM比MVC精简很多，不仅简化了业务与界面的依赖，还解决了数据频繁更新的问题，不用在用选择器操作DOM元素。因为在MVVM中，View不知道Model的存在，Model和ViewModel也观察不到View，这种低耦合模式提高代码的可重用性。

## 5.Vue和JQuery的区别在哪？为什么放弃JQuery和Vue？
    JQuery是直接操作DOM，Vue不直接操作DOM，Vue的数据与视图是分开的，Vue只需要操作数据即可。
    JQuery的操作DOM是频繁的，而Vue利用虚拟DOM的技术，大大提高了更新DOM时的性能。
    Vue中不提倡直接操作DOM，开发者只需要把大部分精力放在数据层面上。
    Vue集成的一些库，大大提高了开发效率，比如Vuex、Router等。

## 6.为什么data是个函数并且返回一个对象呢？
    `data`之所以是一个函数，是因为一个组件会多处调用，而每一次调用就会执行`data函数`,并返回新的数据对象，这样，就可以避免多处调用之间的`数据污染`。

## 7.Vue修饰符？
    .lazy：改变输入框的值时，value不会改变，当光标离开输入框时，v-model绑定的值才会改变。
    .trim：把v-model绑定的值得首尾空格去除。
    .number：只能输入数字。
    .stop：阻止冒泡。
    .cature：事件默认是由里往外冒泡，capture修饰符的作用是反过来，由外往内捕获。
    .self：只有点击事件绑定的本身才会触发事件。
    .once：事件只执行一次。
    .prevent:作用是阻止默认事件(例如a标签的跳转)。
    .native：加在自定义组件的事件上，保证事件能执行。
    .left/.right/.middle：这三个修饰符是鼠标在左中右按键触发的事件。
    .passive：当我们在监听元素滚动事件的时候，会一直触发onscroll事件，在pc端是没啥问题，但是在移动端，会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给onscroll事件加一个.lazy修饰符。

## 8.Vue内部指令？
    v-text：更新元素的textContent。
    v-html：更新元素的innerHtml。
    v-show：切换元素的display Css属性。
    v-if：根据表达式来显示组件销毁和重建。
    v-else：前一兄弟必须有v-if、v-else-if。
    v-for：列表循环渲染，数组，对象，数字，字符串都可以。
    v-on：绑定事件 缩写是 @。
    v-bind：用于动态改变各种变量。
    v-model：双向绑定表达项的值。
    v-slot：缩写是 # 插槽名。
    v-once：元素和组件只渲染一次。
    v-pre：跳过这个元素和它的子元素的编译过程。可以用来显示原始Mustache标签，跳过大量没有指令的节点会加快编译。
    v-cloak：这个指令保持在元素上直到关联实例结束编译。

## 9.路由有哪些模式？有什么不同？
    hash模式：通过 #号 后面的内容更改，触发hashchange事件，实现路由切换。
    history模式：通过pushState和replaceState切换url，触发popstate事件，实现路由切换，需要后端配合。

## 10.如何动态设置class，动态style？
    动态class对象：<div :class="{ 'is-active': true, 'red': isRed }"></div>
    动态class数组：<div :class="['is-active', isRed ? 'red' : '' ]"></div>
    动态style对象：<div :style="{ color: textColor, fontSize: '18px' }"></div>
    动态style数组：<div :style="[{ color: textColor, fontSize: '18px' }, { fontWeight: '300' }]"></div>

## 11.v-if和v-show有何区别？
    v-if：是通过控制dom元素的删除和生成来实现显示和隐藏，每一次隐藏都会使组件重新跑一遍生命周期，因为显示隐藏觉定了组件的生成和销毁。
    v-show：是通过dom元素的css样式来实现显示和隐藏，不会销毁
    【频繁或者大量显示隐藏使用v-show/否则使用v-if】

## 12.computed和watch有何区别？

`computed`：是依赖已有的变量来计算一个目标变量，大多数情况都是`多个变量`凑在一起计算出`一个变量`,并且`computed`具有缓存机制，依赖不变的情况下其会直接读取缓存进行复用，`computed`不能进行异步。

    const root = document.querySelector('#root')
        var vue = new Vue({
            data() {
                return {
                    name: '林三心',
                    age: 18
                }
            },
            computed: { // 新增
                info() {
                    return this.name + this.age
                }
    
            },
            render() {
                root.innerHTML = `${this.name}今年${this.age}岁了-----${this.info}` // 新增info
            }
        })

`watch`：是监听某一个变量的变化，并执行相应的回调函数，通常是`一个变量`的变化决定`多个变量`的变化，`watch`可以进行异步操作。
【watch是一对多/computed是多对一】。

```js

const root = document.querySelector('#root')
var vue = new Vue({
    data() {
        return {
            name: '林三心',
            age: 18
        }
    },
    computed: {
        info() {
            return this.name + this.age
        }

    },
    watch: {
        name(oldValue, newValue) {
            console.log('触发watch', oldValue, newValue)
        },
        age(oldValue, newValue) {
            console.log('触发watch', oldValue, newValue)
        }
    },
    render() {
        root.innerHTML = `${this.name}今年${this.age}岁了-----${this.info}`
    }
})
```

## 13.Vue生命周期？

beforeCreated：实例了vue，但还没有进行数据的初始化与响应式处理。
created：数据已被初始化和响应式处理，在这里可以访问到数据，也可以修改数据。
beforeCreated：render函数在这里被调用，生成虚拟DOM，但还没有转成真实DOM并替换到el
mounted：在这里真实的DOM已经挂载完毕。
activated：被keep-alive缓存的组件激活时调用。
deactivated：被keep-alive缓存停用时调用。

## 14.Vuex有哪些属性？用处是什么？

State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
Getter：允许组件从Store中获取数据，mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性。
Mutation：是唯一更改store中状态的方法，且必须是同步函数。
Action：用于提交mutation，而不是直接变更状态，可以包含任意异步操作。
Module：允许将单一的store拆分多个store且同时保存在单一的状态树种。

## 15.Watch有哪些属性？
    监听一个基本数据类型时：
        watch:{
            value(){
                //......
            }
        }
    
    监听一个引用数据类型时：
        watch:{
            obj:{
                handler(){} //执行回调
                deep:true //是否进行深度监听
                immediate:true //是否初始执行handler函数
            }
        }

## 16.对象属性无法更新视图，删除属性无法更新视图，为什么？

原因：`Object.defineProperty`没有对对象的新属性进行属性劫持。
对象新属性无法更新视图：使用Vue.$set(obj,key,value)，组件中this.$set(obj,value,key)。
删除属性无法更新视图：使用Vue.$delete(obj,key),组件中this.$delete(obj,key)

## 17.直接使用arr[index] = xxx无法更新视图怎么办？

原因：Vue没有对数组进行Object.defineProperty的属性劫持，所以直接arr[index]=xxx是无法更新视图的。
使用数组的splice方法：arr.splice(index,1,item)。
使用Vue.$set(arr,index,value)

## 18.nextTick的用处？
```js
//Vue采用的是异步更新的策略，通俗点说就是：同一事件内多次修改，会统一进行一次视图更新，这样才能节省性能。
//数据一更新，视图却还没有更新，所以拿到的还是上一次的旧视图数据，那么想要拿到最新视图数据怎么办？
    <div ref="testDiv">{{name}}</div>
    this.name = 'Ling mei'
    this.$nextTick(()=>{
        console.log(this.$refs.testDiv.innerHTML) //Ling mei
    })
```

## 19.Vue的SSR是什么？有什么好处？

SSR就是服务端渲染
基于nodejs server服务环境开发，所以html代码在服务端渲染
数据返回给前端，然后前端进行激活，即可成为浏览器识别的html代码
SSR首次加载更快，有更好的用户体验，有更好的seo优化，因为爬虫能看到整个页面内容，如果是vue项目，由于数据还要经过解析，这就造成爬虫并不会等待你的数据加载完成，所以其实Vue项目的seo体验并不是很好。

## 20.Vue响应式是怎么实现的？

【整体思路是数据劫持+观察者模式】
对象内部通过defineReactive方法：使用Object.defineProperty将属性进行劫持(只会劫持已经存在的属性)，数组则是通过重写数组方法来实现。当页面使用对应属性时，每个属性都拥有自己dep属性，存放它所依赖的watch(依赖收集),当属性变化后通知自己对应的watcher去更新(派发更新)。

## 21.Vue.set方法的原理？
```js
function set(target,key,val){
    //判断是否是数组
    if(Array.isArray(target)){
        //判断谁大谁小
        target.length = Math.max(target.length,key)
        //执行splice
        target.splice(key,1,val)
        return val
    }
    const ob = target.__ob__
    //如果此对象没有不是响应式对象，直接设置返回
    if(key in target && !(key in target.prototype) || !ob){
        target[key] = val
        return val
    }
    //否则，新增属性，并响应式处理
    defineReactive(target,key,val)
    return val
}
```

## 22.Vue.delete方法的原理？
```js
function del(target,key){
      //判断是否为数组
      if(Array.isArray(target)){
          //执行splice
          target.splice(key,1)
          return
      }
      const ob = target.__ob__
      //对象本身就没有这个属性，直接返回
      if(!(key in target)) return
      //否则，删除这个属性
      delete target[key]
      //判断是否是响应式对象，不是的话，直接返回
      if(!ob) return
      //是的话，删除后要通知视图更新
      ob.dep.notify()
 }
```

## 23.nextTick的原理？
```js
let callbacks = []; //回调函数
    let pending = false;
    function flushCallbacks() {
        pending = false; //把标志还原为false
        // 依次执行回调
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i]();
        }
    }
    let timerFunc; //先采用微任务并按照优先级优雅降级的方式实现异步刷新
    if (typeof Promise !== "undefined") {
        // 如果支持promise
        const p = Promise.resolve();
        timerFunc = () => {
            p.then(flushCallbacks);
        };
    } else if (typeof MutationObserver !== "undefined") {
        // MutationObserver 主要是监听dom变化 也是一个异步方法
        let counter = 1;
        const observer = new MutationObserver(flushCallbacks);
        const textNode = document.createTextNode(String(counter));
        observer.observe(textNode, {
            characterData: true,
        });
        timerFunc = () => {
            counter = (counter + 1) % 2;
            textNode.data = String(counter);
        };
    } else if (typeof setImmediate !== "undefined") {
        // 如果前面都不支持 判断setImmediate
        timerFunc = () => {
            setImmediate(flushCallbacks);
        };
    } else {
        // 最后降级采用setTimeout
        timerFunc = () => {
            setTimeout(flushCallbacks, 0);
        };
    }

    export function nextTick(cb) {
        callbacks.push(cb);
        if (!pending) {
            pending = true;
            timerFunc();
        }
    }
```
## 24.如果子组件改变peops里的数据会发生什么？
```js
//改变的props数据是基本类型：
    //如果修改的是基本类型，则会报错
    props:{
        num:Number
    }
    created(){
        this.num = 999
    }
//改变的props数据是引用类型：
props:{
    item:{
        default:()=>({})
    }
}
created(){
    //不报错，并且父级数据会跟着变
    this.item.name = 'Hua wei'
    //会报错，跟基础类型报错一样
    this.item = 'Xiao mi'
}
```
## 25.props怎么自定义验证？
```js
props:{
        num:{
            default:1
            validator:function(value){
                //返回值为true则验证不通过，报错
                return [
                    1,2,3,4,5
                ].indexOf(value) !== -1
            }
        }
    }
```
## 27.watch的immediate属性有什么作用？
```js
//在使用created时要请求一次数据，并且当搜索值改变，也要请求数据。
    created(){
        this.getList()
    }
    watch:{
        searchInputValue(){
            this.getList()
        }
    }
//使用immediate完全可以这么写，当它为true时，会初始执行一次。
watch:{
    searchInputValue:{
        handler:'getList'
        immediate:true
    }
}
```
## 28.computed如何实现传参？
```js
<div>{{total(3)}}</div>
    computed:{
        total(){
            return function(n){
                return n * this.num
            }
        }
}
```
## 29.Vue的hook的使用？

在同一组件中使用 - 【常用的定时器的方式】

~~~js
export default{
    data(){
        timer:null
    },
    mounted(){
        this.timer = setInterval(()=>{
            //具体执行内容
            console.log('1)
                        },1000)
        },
                                 beforeDestroy(){
                                 clearInterval(this.timer);
        this.timer = null;
    }
}
//上面做法不太好 - 【全局多定义一个timer变量，可以使用hook这么做】
    export default{
        methods:{
            fn(){
            let timer = setInterval(()=>{
                //具体执行代码
                console.log('1');
            },1000);
            this.$once('hook:beforeDestroy',()=>{
                clearInterval(timer);
                timer = null;
            })
            }
        }
    }
//父子组件使用 - 【如果子组件需要在mounted时触发父组件的某一个函数】
    //父组件
    <rl-child @childMounted="childMountedHandle"></rl-child>
    method(){
        childMountedHandle(){
            // do something...
        }
    }
    //子组件
    mounted(){
        this.$emit('childMounted')
    }
//使用hook的话更方便
    //父组件
    <rl-child @hook:mounted="childMountedHandle"/>
    method () {
        childMountedHandle() {
            // do something...
        }
    },
```
~~~

## 30.在计算变量时，methods和computed哪个好？

computed会好一些，因为computed会有缓存。
例如index由0变成1，那么会触发视图更新，这时候methods会重新执行一次，而computed不会。所依赖的num和price都没变。

```js
<div>{{howMuch1()}}</div>
<div>{{howMuch2()}}</div>
<div>{{index}}</div>
data(){
    return {
        index:0
    }
},
methods:{
    howMuch1(){
        return this.num + this.price
    }
},
computed:{
   howMuch2(){
       return this.num + this.price
   }
} 
```

