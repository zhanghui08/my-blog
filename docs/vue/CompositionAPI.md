---
title: Vue3-Composition API
date: 2021-08-28
---

## 1. setup
setup是组合Composition API中的入口函数，也是第一个要使用的函数。

setup只在初始化时执行一次，所有的Composition API函数都在此使用。

```js
setup() {
    console.log('我执行了') //我执行了
},
    //在setup执行的时候，组件对象还没有创建，组件实例对象this还不可用，此时this是undefined，不能通过this来访问。
```
setup函数如果返回对象，对象中的 `属性` 和 `方法`，`模版` 中可以直接使用。

```js
<div>{{number}}</div>
setup(){
    const number = 18;
    return{
        number
    }
}
```
setup的参数(props,context)
props: 是一个对象,里面有父级组件向子级组件传递的数据,并且是在子级组件中使用props接收到的所有的属性
context：上下文对象，可以通过es6语法解构 setup(props, {attrs, slots, emit})
    attrs: 获取当前组件标签上所有没有通过props接收的属性的对象, 相当于 this.$attrs
    slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
    emit: 用来分发自定义事件的函数, 相当于 this.$emit

**演示attrs和props**
```ts
//父组件
<template>
  <child :msg="msg" msg2='哈哈哈' />
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue';
// 引入子组件
import Child from './components/Child.vue';
export default defineComponent({
  name: 'App',
  components: {
    Child,
  },
  setup() {
    const msg = ref('hello,vue3');
    return {
      msg,
    };
  },
});
</script>

//子组件
<template>
  <h2>子组件</h2>
  <h3>msg:{{ msg }}</h3>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Child',
  props: ['msg'],
  setup(props, {attrs, slots, emit}) {
    console.log('props:', props);//msg: "hello,vue3"
    console.log('attrs:', attrs);//msg2: "哈哈哈"
    return {};
  },
});
</script>

```
**演示emit**
```ts
//父组件
<template>
  <child @show="show" />
</template>

<script lang='ts'>
  setup() {
    const show = () => {
      console.log('name:', 'hzw');
    };
    return {
      show,
    };
  },
</script>

//子组件
<template>
  <button @click='emitFn' >事件分发</button>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Child',
  setup(props, { emit }) {
    const emitFn = () => {
      emit('show');
    };
    return {
      emitFn,
    };
  },
});
</script>

```

## 2.ref
定义一个响应式的数据(一般用来定义一个基本类型的响应式数据Undefined、Null、Boolean、Number和String)

```js
const xxx = ref(initValue):
```
**注意**：scipt中操作数据需要使用 xxx.value的形式，而模板中不需要添加 .value

```js 
//例子：实现一个按钮，点击可以增加数字
<template>
    <div>{{count}}</div>
<button @click ='updateCount'>增加</button>
</template>
setup(){
    // ref用于定义一个响应式的数据，返回的是一个Ref对象，对象中有一个value属性
    //如果需要对数据进行操作，需要使用该Ref对象的value属性
    const count = ref(0)
    updateCount() =>{
        count.value ++
    }
    return {
        count,
        updateCount
    }
}
```
```ts
<template>
    <h2>App</h2>
<input type="text">---
    <input type="text" ref="inputRef">
        </template>
<script lang="ts">
    import { onMounted, ref } from 'vue'
/* 
  ref获取元素: 利用ref函数获取组件中的标签元素
  功能需求: 让输入框自动获取焦点
*/
export default {
    setup() {
        const inputRef = ref<HTMLElement|null>(null)
        onMounted(() => {
            inputRef.value && inputRef.value.focus()
        })
        return {
            inputRef
        }
    },
}
</script>
```

## 3.reactive
定义多个数据的响应式，接收一个普通对象然后返回该普通对象的响应式代理对象`(Proxy)`,响应式转换是“深层的”，会影响对象内部所有嵌套的属性，所有的数据都是响应式的。

```js
const proxy = reactive(obj)
```
```js
<template>
    <h3>姓名:{{user.name}}</h3>
<h3>年龄:{{user.age}}</h3>
<h3>wife:{{user.wife}}</h3>
<button @click="updateUser" >更新</button>
</template>
setup() {
    const user = reactive({
        name: 'hzw',
        age: 18,
        wife: {
            name: 'xioaohong',
            age: 18,
            books: ['红宝书', '设计模式', '算法与数据结构'],
        },
    });
    const updateUser = () => {
        user.name = '小红';
        user.age += 2;
        user.wife.books[0] = '金瓶梅';
    };
    return {
        user,
        updateUser,
    };
},
```

## 4.computed函数
计算属性的函数中如果传入一个回调函数，表示的事 `get` 操作。

```ts
import { computed } from 'vue';
const user = reactive({
    firstName: '韩',
    lastName: '志伟',
});
const fullName1 = computed(() => {
    return user.firstName + user.lastName;
});
return {
    user,
    fullName1,
};
```
计算属性的函数中可以传入一个对象，可以包含 `set` 和 `get`函数，进行数据读取和修改的操作。

```ts
    const fullName2 = computed({
        get() {
            return user.firstName + '_' + user.lastName;
        },
        set(val: string) {
            const names = val.split('_');
            user.firstName = names[0];
            user.lastName = names[1];
        },
    });
    return {
        user,
        fullName2,
    };
```

## 5.watch

作用：监听指定的一个或多个响应式数据，一旦数据变化，就自动执行监听回调。
           默认初始时不执行回调，但可以通过配置 `immeditate` 为 `true`，来指定初始时执行第一次。
           通过配置 `deep` 为 `true`，来指定深度监听。

```ts
import { watch, ref } from 'vue';
const user = reactive({
    firstName: '张',
    lastName: '三',
});
const fullName3 = ref('');
watch(
    user,
    ({ firstName, lastName }) => {
        fullName3.value = firstName + '_' + lastName;
    },
    { immediate: true, deep: true }
);
return {
    user,
    fullName3,
};
```
```js
//watch监听多个数据，使用数组
//watch监听非响应式数据的时候需要使用回调函数的形式
	watch([()=>user.firstName,()=>user.lastName,fullName3],()=>{console.log('我执行了')})
```

## 6.watchEffect函数
监视数据变化时执行的回调，不用直接指定要监视的数据，回调函数中使用的哪些响应式数据就监视哪些响应式数据，默认初始时就会执行第一次，从而可以收集需要监视的数据。

```js
import { watchEffect, ref } from 'vue';
const user = reactive({
    firstName: '韩',
    lastName: '志伟',
});
const fullName4 = ref('');
watchEffect(() => {
    fullName4.value = user.firstName + '_' + user.lastName;
});
return {
    user,
    fullName4,
};
//watchEffect可以实现计算属性set方法
watchEffect(() => {
    const names = fullName3.value.split('_');
    user.firstName = names[0];
    user.lastName = names[1];
});

```
## 7.Vue3生命周期
```js
setup() {  //可以代替初始化之前和初始化之后
    onBeforeMount(() => {
        console.log('组件挂载前--onBeforeMount') 
    })
    onMounted(() => {
        console.log('组件挂载后--onMounted')
    })
    onBeforeUpdate(() => {
        console.log('组件更新后之前--onBeforeUpdate')
    })
    onUpdated(() => {
        console.log('组件更新之后--onUpdated')
    })
    onBeforeUnmount(() => {
        console.log('组件销毁之前--onBeforeUnmount')
    })
    onUnmounted(() => {
        console.log('组件销毁之后--onUnmounted')
    })
}

```

## 8.toRefs
把一个响应式对象转换为普通对象，该普通对象的每个属性都是一个ref

```ts
<template>
    <div>name:{{name}}</div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: '',
    setup() {
        const state = reactive({
            name: 'hzw',
        });
        const state2 = toRefs(state);
        setInterval(() => {
            state.name += '===';
        }, 1000);
        return {
            //通过toRefs返回的对象,解构出来的属性也是响应式的
            ...state2,
        };
    },
});
</script>
```

## 9.provide 与 inject
实现跨级组件(祖孙)间通信

```ts
//父组件
    <template>
        <h1>父组件</h1>
        <p>当前颜色: {{color}}</p>
        <button @click="color='red'">红</button>
        <button @click="color='yellow'">黄</button>
        <button @click="color='blue'">蓝</button>
        <hr>
        <Son />
    </template>
    <script lang="ts">
    import { provide, ref } from 'vue'
    import Son from './Son.vue'
    export default {
    name: 'ProvideInject',
    components: {
        Son
    },
    setup() {
        const color = ref('red')
        provide('color', color)
        return {
            color
        }
    }
    }
    </script>
//子组件
    <template>
        <div>
            <h2>子组件</h2>
            <hr>
            <GrandSon />
        </div>
    </template>
    <script lang="ts">
    import GrandSon from './GrandSon.vue'
    export default {
    components: {
        GrandSon
    },
    }
    </script>
//孙子组件
    <template>
        <h3 :style="{color}">孙子组件: {{color}}</h3>
    </template>
    <script lang="ts">
    import { inject } from 'vue'
    export default {
    setup() {
        const color = inject('color')
        return {
            color
        }
    }
    }
    </script>

```
## 10.