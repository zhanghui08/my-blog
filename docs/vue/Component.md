---
title: Vue 父子组件间的数据传递
date: 2021-08-28
---

## 一：父子组件传值[props]
1. 【重点】 父组件向子组件传数据：通过**属性**传递数据，子组件通过**props**接收数据
2. 父组件A通过props的方式向子组件B传递，B to A 通过在 B 组件中 $emit, A 组件中 v-on 的方式实现。
3. 总结：父组件通过props向下传递数据给子组件。注：组件中的数据共有三种形式：data、props、computed
```js
//父组件通过标签上面定义传值
    <template>
        <Main :obj="data">
    </template>
//引入子组件
	import Main from '.....'
//data中定义
	data:["Henry","Bucky","Emily"]
//初始化组件
    components:{
        Main
    }
//子组件通过props方法接收数据
    <template>
        <ul>
            <li v-for="user in data">{{user}}</li>//遍历传递过来的值，然后呈现到页面
        </ul>
    </template>
//接收父组件传值
    props:{
        data:{           //这个就是父组件中子标签自定义名字
            type:Array,
                required:true
        }
    }
```
## 二：子组件向父组件传值 （通过事件形式($emit)传值）
1. 【总结】：子组件通过events给父组件发送消息，实际上就是子组件把自己的数据发送到父组件。
```js
//子组件
    <template>
        <h1 @click="changeTitle">{{title}}</h1>//绑定一个点击事件
    </template>
    return {
        title:"Vue.js Demo"
    }
    methods:{
        changeTitle() {
            this.$emit("titleChanged","子向父组件传值");//自定义事件  传递值“子向父组件传值”
        }
    }
//父组件 
    <template>
        <div id="app">
            <app-header v-on:titleChanged="updateTitle" ></app-header>//与子组件titleChanged自定义事件保持一致
    // updateTitle($event)接受传递过来的文字
    <h2>{{title}}</h2>
    </div>
    </template>
    import Header from "./components/Header"
    return{
        title:"传递的是一个值"
    }
    components:{
        "app-header":Header,
    }
    methods:{
       updateTitle(e){   //声明这个函数
            this.title = e;
        }
    }

```
## 三：子组件向父组件传值得两种方法
1. 子组件主动触发事件将数据传递给父组件
    - 在子组件上绑定某个事件以及事件触发的函数子组件代码
    ```vue
    <template>
        <Tree :data="treeData" ref="treeData"></Tree>
        <Button type="success" @click="submit"></Button>
    </template>
    ```
    - 事件在子组件中触发函数
    ```js
    submit(){
        this.$emit('getTreeData',this.$refs.treeData.getCheckedNodes())
    }
    ```
    - 在父组件中绑定触发事件
    ```js
    <AuthTree @getTreeData="testData"></AuthTree>
    ```
    - 父组件触发函数显示子组件传递数据
    ```js
    testData(data){
        console.log("parent");
        console.log(data)
    }
    ```
2. 不需要在子组件中触发事件(如点击按钮，created()事件等)
    - 这种方式要简单的多，子组件中绑定ref
    ```vue
    <template>
    	<Tree :data="treeData" ref="treeData"></Tree>
    </template>
    ```
    - 然后再子组件中定义一个函数，这个函数是父组件可以直接调用的。函数的返回值定义为我们需要的数据
    ```js
    getData(){
        return this.$refs.treeData.getCheckedNodes()
    }
    ```
    - 在父组件注册子组件后绑定ref，调用子组件的函数获取数据
    ```vue
    <template>
    	<AuthTree ref="authTree"></AuthTree>
    </template>
    ```
    - 父组件函数调用
    ```js
    this.$refs.authTree.getData()
    ```

