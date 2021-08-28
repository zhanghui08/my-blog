---
title: Vue开发须知道的技巧 
date: 2021-08-28
---

## 1.watch
1. 常用用法
```js
//场景：表格初始进来需要调用查询接口 getList(),然后input改变重新查询
created(){
    this.getList()
}
watch:{
    inputVal(){
        this.getList()
    }
}
```
2. 立即执行
```js
//可以直接利用watch的immediate和handler属性简写
watch:{
    inputVal:{
        handler:'getList',
        immediate:true
    }
}
```
3. 深度监听
```js
//watch的deep属性，深度监听，也就是监听复杂数据类型
watch:{
    inputValObj:{
        handler(newVal,oldVal){

        },
        deep:true
    }
}
```
`此时发现oldVal和 newVal 值一样; 因为它们索引同一个对象/数组,Vue 不会保留修改之前值的副本; 所以深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化`

## 2.组件通信 (常用的几种)
1. props - 父子组件传值，props可以是一个数组或者对象
```js
// 数组:不建议使用
props:[]

// 对象
props:{
 inpVal:{
  type:Number, //传入值限定类型
  // type 值可为String,Number,Boolean,Array,Object,Date,Function,Symbol
  // type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认
  required: true, //是否必传
  default:200,  //默认值,对象或数组默认值必须从一个工厂函数获取如 default:()=>[]
  validator:(value) {
    // 这个值必须匹配下列字符串中的一个
    return ['success', 'warning', 'danger'].indexOf(value) !== -1
  }
 }
}
```
2. $emit - 子传父
```js
// 父组件
<home @title = "title">
// 子组件
this.$emit('title',[{title:'这是title'}])
```
3. vuex
```js
//vuex是一个状态管理器；是一个独立的插件，适合数据共享多的项目里面，因为如果只是简单的通信，使用起来会比较重
state:定义存贮数据的仓库 ,可通过this.$store.state 或mapState访问
getter:获取 store 值,可认为是 store 的计算属性,可通过this.$store.getter 或mapGetters访问
mutation:同步改变 store 值,为什么会设计成同步,因为mutation是直接改变 store 值,vue 对操作进行了记录,如果是异步无法追踪改变.可通过mapMutations调用
action:异步调用函数执行mutation,进而改变 store 值,可通过 this.$dispatch或mapActions访问
modules:模块,如果状态过多,可以拆分成模块,最后在入口通过...解构引入
```
4. $refs
```js
// 父组件
<home ref="home"/>
mounted(){
  console.log(this.$refs.home) //即可拿到子组件的实例,就可以直接操作 data 和 methods
}
```
5. .sync
```js
// 父组件
<home :title.sync = "title" />
//编译时会被扩展为
<home :title = "title"  @update:title = "val => title = val"/>

// 子组件
// 所以子组件可以通过$emit 触发 update 方法改变
mounted(){
  this.$emit("update:title", '这是新的title')
}
```
6. v-slot - 作用就是将父组件的 template 传入子组件
```js
//A.匿名插槽(也叫默认插槽): 没有命名,有且只有一个
    // 父组件
    <todo-list> 
        <template v-slot:default>
        任意内容
        <p>我是匿名插槽 </p>
        </template>
    </todo-list> 

    // 子组件
    <slot>我是默认值</slot>
    //v-slot:default写上感觉和具名写法比较统一,容易理解,也可以不用写
//B.具名插槽: 相对匿名插槽组件slot标签带name命名的;
    // 父组件
    <todo-list> 
        <template v-slot:todo>
        任意内容
        <p>我是匿名插槽 </p>
        </template>
    </todo-list> 

    //子组件
    <slot name="todo">我是默认值</slot>
//C.作用域插槽: 子组件内数据可以被父页面拿到(解决了数据只能从父页面传递给子组件)
   // 父组件
    <todo-list>
    <template v-slot:todo="slotProps" >
    {{slotProps.user.firstName}}
    </template> 
    </todo-list> 
    //slotProps 可以随意命名
    //slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user="user"

    // 子组件
    <slot name = "todo" :user = "user" :test = "test">
        {{ user.lastName }}
    </slot> 
    data() {
        return {
        user:{
            lastName:"Zhang",
            firstName:"yue"
        },
        test:[1,2,3,4]
        }
    },
    // {{ user.lastName }}是默认数据  v-slot:todo 当父页面没有(="slotProps")
```
7. 路由传参
```js
//A.方案一
    // 路由定义
    {
        path: '/describe/:id',
        name: 'Describe',
        component: Describe
    }
    // 页面传参
    this.$router.push({
        path: `/describe/${id}`,
    })
    // 页面获取
    this.$route.params.id
//B.方案二
    // 路由定义
    {
        path: '/describe',
        name: 'Describe',
        component: Describe
    }
    // 页面传参
    this.$router.push({
        name: 'Describe',
        params: {
            id: id
        }
    })
    // 页面获取
    this.$route.params.id
//C.方案三
    // 路由定义
    {
        path: '/describe',
        name: 'Describe',
        component: Describe
    }
    // 页面传参
    this.$router.push({
        path: '/describe',
            query: {
            id: id
        `}
    )
    // 页面获取
    this.$route.query.id
```

## 3.render函数
render 和 template 的对比 前者适合复杂逻辑,后者适合逻辑简单; 后者属于声明是渲染，前者属于自定Render函数; 前者的性能较高，后者性能较低。
```js
//场景：有些代码在 template 里面写会重复很多,所以这个时候 render 函数就有作用
// 根据 props 生成标签
// 初级
<template>
  <div>
    <div v-if="level === 1"> <slot></slot> </div>
    <p v-else-if="level === 2"> <slot></slot> </p>
    <h1 v-else-if="level === 3"> <slot></slot> </h1>
    <h2 v-else-if="level === 4"> <slot></slot> </h2>
    <strong v-else-if="level === 5"> <slot></slot> </stong>
    <textarea v-else-if="level === 6"> <slot></slot> </textarea>
  </div>
</template>

// 优化版,利用 render 函数减小了代码重复率
<template>
  <div>
    <child :level ="level">Hello world!</child>
  </div>
</template>

<script type='text/javascript'>
  import Vue from 'vue'
  Vue.component('child', {
    render(h) {
      const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level-1]
      return h(tag, this.$slots.default)
    },
    props: {
      level: {  type: Number,  required: true  } 
    }
  })   
  export default {
    name: 'hehe',
    data() { return { level: 3 } }
  }
</script>
```

## 4.异步组件
异步组件的渲染本质上其实就是执行2次或者2次以上的渲染, 先把当前组件渲染为注释节点, 当组件加载成功后, 通过 forceRender 执行重新渲染。或者是渲染为注释节点, 然后再渲染为loading节点, 在渲染为请求完成的组件
```js
//场景:项目过大就会导致加载缓慢,所以异步组件实现按需加载就是必须要做的事啦 1.异步注册组件 3种方法
// 工厂函数执行 resolve 回调
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包, 这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

// 工厂函数返回 Promise
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

// 工厂函数返回一个配置化组件对象
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

## 5.动态组件
```js
//场景:做一个 tab 切换时就会涉及到组件动态加载
<component v-bind:is="currentTabComponent"></component>
    //但是这样每次组件都会重新加载,会消耗大量性能,所以 就起到了作用
    <keep-alive>
        <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
    //这样切换效果没有动画效果,这个也不用着急,可以利用内置的
    <transition>
        <keep-alive>
            <component v-bind:is="currentTabComponent"></component>
        </keep-alive>
    </transition>
```

## 6.递归组件
```js
//场景：如果开发一个tree组件，里面层级是根据后台数据决定的，这个时候就需要使用到动态组件
// 递归组件: 组件在它的模板内可以递归的调用自己，只要给组件设置name组件就可以了。
// 设置那么House在组件模板内就可以递归使用了,不过需要注意的是，
// 必须给一个条件来限制数量，否则会抛出错误: max stack size exceeded
// 组件递归用来开发一些具体有未知层级关系的独立组件。比如：
// 联级选择器和树形控件 
<template>
  <div v-for="(item,index) in treeArr">
      子组件，当前层级值： {{index}} <br/>
      <!-- 递归调用自身, 后台判断是否不存在改值 -->
      <tree :item="item.arr" v-if="item.flag"></tree>
  </div>
</template>
<script>
export default {
  // 必须定义name，组件内部才能递归调用
  name: 'tree',
  data(){
    return {}
  },
  // 接收外部传入的值
  props: {
     item: {
      type:Array,
      default: ()=>[]
    }
  }
}
</script>
```

## 7.components和 Vue.component
```js
//components:局部注册组件
    export default{
        components:{home}
    }
//Vue.component:全局注册组件
    Vue.component('home',home)
```

## 8.Vue.extend
```js
//场景:vue 组件中有些需要将一些元素挂载到元素上,这个时候 extend 就起到作用了 是构造一个组件的语法器
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>',//template对应的标签最外层必须只有一个标签
  data: function () {
    return {
      extendData: '这是extend扩展的数据',
    }
  },
  props:['propsExtend']
})

// 创建的构造器可以挂载到元素上,也可以通过 components 或 Vue.component()注册使用
// 挂载到一个元素上。可以通过propsData传参.
new Profile({propsData:{propsExtend:'我是实例传入的数据'}}).$mount('#app-extend')

// 通过 components 或 Vue.component()注册
Vue.component('Profile',Profile)

```

## 9.mixins
```js
//场景:有些组件有些重复的 js 逻辑,如校验手机验证码,解析时间等,mixins 就可以实现这种混入 mixins 值是一个数组
const mixin={
    created(){
      this.dealTime()
    },
    methods:{
      dealTime(){
        console.log('这是mixin的dealTime里面的方法');
      }
  }
}
export default{
  mixins:[mixin]
}
```

## 10.extends
```js
//extends用法和mixins很相似,只不过接收的参数是简单的选项对象或构造函数,所以extends只能单次扩展一个组件
const extend={
    created(){
      this.dealTime()
    },
    methods:{
      dealTime(){
        console.log('这是mixin的dealTime里面的方法');
      }
  }
}
export default{
  extends:extend
}
```

## 11.Vue.use()
我们使用 element时会先 import,再 Vue.use()一下,实际上就是注册组件,触发 install 方法; 这个在组件调用会经常使用到; 会自动组织多次注册相同的插件

## 12.Vue.nextTick
```js
//场景：页面加载时需要让文本框获取焦点，
//用法：在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。
mounted(){ //在此阶段dom并未渲染完毕，所以要使用$nextTick
    this.$nextTick(()=>{
        this.$refs.inputs.focus()  //通过 $refs 获取dom 并绑定 focus 方法
    })
}
```

## 13.Vue.directive
```js
//场景：官方给我们提供了很多指令,但是我们如果想将文字变成指定的颜色定义成指令使用,这个时候就需要用到Vue.directive
// 全局定义
Vue.directive("change-color",function(el,binding,vnode){
  el.style["color"]= binding.value;
})

// 使用
<template>
    <div v-change-color = “color”> {{message}} </div>
</template>
<script>
  export default {
    data(){
      return{
        color:'green'
      }
    }
  }
</script>
```

## 14.生命周期
1. bind 只调用一次，指令第一次绑定到元素时候调用，用这个钩子可以定义一个绑定时执行一次的初始化动作。
2. inserted:被绑定的元素插入父节点的时候调用(父节点存在即可调用，不必存在document中)
3. update: 被绑定与元素所在模板更新时调用，而且无论绑定值是否有变化，通过比较更新前后的绑定值，忽略不必要的模板更新
4. componentUpdate :被绑定的元素所在模板完成一次更新更新周期的时候调用
5. unbind: 只调用一次，指令月元素解绑的时候调用

## 15.Vue.filter
```js
//场景:时间戳转化成年月日这是一个公共方法,所以可以抽离成过滤器使用
// 使用
// 在双花括号中
{{ message | capitalize }}

// 在 `v-bind` 中
<div v-bind:id="rawId | formatId"></div>

// 全局注册
Vue.filter('stampToYYMMDD', (value) =>{
  // 处理逻辑
})

// 局部注册
filters: {
  stampToYYMMDD: (value)=> {
    // 处理逻辑
  }
}

// 多个过滤器全局注册
// /src/common/filters.js
let dateServer = value => value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') 
export { dateServer }
// /src/main.js
import * as custom from './common/filters/custom'
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))
```
## 16.Vue.set()
```js
//场景:当你利用索引直接设置一个数组项时或你修改数组的长度时,由于 Object.defineprototype()方法限制,数据不响应式更新 不过vue.3.x 将利用 proxy 这个问题将得到解决
// 利用 set
this.$set(arr,index,item)

// 利用数组 push(),splice()

```

## 17.v-pre
```js
//场景:vue 是响应式系统,但是有些静态的标签不需要多次编译,这样可以节省性能
<span v-pre>{{ this will not be compiled }}</span>   显示的是{{ this will not be compiled }}
<span v-pre>{{msg}}</span>     即使data里面定义了msg这里仍然是显示的{{msg}}
```
## 18.v-cloak
```js
//场景:在网速慢的情况下,在使用vue绑定数据的时候，渲染页面时会出现变量闪烁
//用法:这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的   Mustache 标签直到实例准备完毕
// template 中
<div class="#app" v-cloak>
    <p>{{value.name}}</p>
</div>

// css 中
[v-cloak] {
    display: none;
}
```

## 19.v-once
```js
//有些 template 中的静态 dom 没有改变,这时就只需要渲染一次,可以降低性能开销
<span v-once> 这时只需要加载一次的标签</span>
```
`v-once 和 v-pre 的区别: v-once只渲染一次；v-pre不编译,原样输出`

## 20.事件修饰符
```js
.stop:阻止冒泡
.prevent:阻止默认行为
.self:仅绑定元素自身触发
.once: 2.1.4 新增,只触发一次
.passive: 2.3.0 新增,滚动事件的默认行为 (即滚动行为) 将会立即触发,不能和.prevent 一起使用
```

## 21.按键修饰符和按键码
```js
//有的时候需要监听键盘的行为,如按下 enter 去查询接口等
// 对应键盘上的关键字
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
```

## 22.Vue-router
1. 全局路由钩子
```js
//router.beforeEach
//router.afterEach 全局后置钩子 在所有路由跳转结束的时候调用 这些钩子不会接受 next 函数也不会改变导航本身
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫：beforeEach -- next需要调用') //一般登录拦截用这个,也叫导航钩子守卫
  if (path === '/login') {
    next()
    return
  }
  if (token) {
    next();
  } 
})
```
2. 组件路由钩子
```js
//beforeRouteEnter在渲染该组件的对应路由被确认前调用，用法和参数与router.beforeEach类似，next需要被主动调用此时组件实例还未被创建，不能访问this可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数
//beforeRouteLeave 导航离开该组件的对应路由时调用，可以访问组件实例 this，next需要被主动调用，不能传回调
beforeRouteEnter (to, from, next) {
  // 这里还无法访问到组件实例，this === undefined
  next( vm => {
    // 通过 `vm` 访问组件实例
  })
}
```
3. 路由模式
```js
设置 mode 属性:hash或 history
```
4. Vue.$router
```js
this.$router.push():跳转到不同的url，但这个方法回向history栈添加一个记录，点击后退会返回到上一个页面
this.$router.replace():不会有记录
this.$router.go(n):n可为正数可为负数。正数前进， 负数后退,类似 window.history.go(n)
```
5. Vue.$route
```js
//表示当前跳转的路由对象,属性有:
    // name:路由名称
    // path:路径
    // query:传参接收值
    // params:传参接收值
    // fullPath:完成解析后的 URL，包含查询参数和 hash 的完整路径
    // matched:路由记录副本
    // redirectedFrom:如果存在重定向，即为重定向来源的路由的名字
```
6. router-view 的 key
```js
//场景:由于 Vue 会复用相同组件, 即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子
<router-view :key ="$route.fullPath"></router-view>
```

## 23.为路径设置别名
场景:在开发过程中，我们经常需要引入各种文件，如图片、CSS、JS等，为了避免写很长的相对路径（../），我们可以为不同的目录配置一个别名
```js
//vue-cli 2.x 配置
    // 在 webpack.base.config.js中的 resolve 配置项，在其 alias 中增加别名
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        }
    },
//vue-cli 3.x 配置
    // 在根目录下创建vue.config.js
    var path = require('path')
    function resolve (dir) {
        console.log(__dirname)
        return path.join(__dirname, dir)
    }
    module.exports = {
        chainWebpack: config => {
            config.resolve.alias
            .set(key, value) // key,value自行定义，比如.set('@@', resolve('src/components'))
        }
    }

```

## 24.img 加载失败
```js
//场景:有些时候后台返回图片地址不一定能打开,所以这个时候应该加一张默认图片
// page 代码
<img :src ="imgUrl" @error ="handleError" alt="">
<script>
export default{
  data(){
    return{
      imgUrl:''
    }
  },
  created () {
      this.imgSrc = require('./assets/default-avatar.png')
    }
  methods:{
    handleError(e){
      e.target.src=reqiure('图片路径')
    }
  }
}
</script>
```
## 25.Computed watch 和 method
```
computed：默认computed也是一个watcher具备缓存，只有当依赖的数据变化时才会计算，当时数据没有变化时，它会读取数据缓存。如果一个数据依赖于其他数据，使用computed
watch：每次都需要执行函数。watch更适用于数据变化时的异步操作。如果需要在某个数据变化时做一些事情，使用watch
method：只要把方法用到模板上了，每次一变化就会重新渲染视图。性能开销大
```
## 26.