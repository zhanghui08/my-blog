---
title: React基础学习
date: 2020-05-29
---

## 说明:
React作为Facebook内部开发lnstagram的项目中，是一个用来构建用户界面的优秀JS库,于2013年5月开源.做为前端的三大框架之一.
这里讲服务端的渲染框架 - next.js踩坑过程。

### 技术栈：
react、next.js、ant design、axios
### jsx语法：
直接写在JavaScript语言中，不加任何引号，它允许HTML于JavaScript的混写。
```js
    import React from 'react';
    class Demo1 extends React.Component{
    render(){
        const lists = ['我是谁','我来自哪里','我要到哪儿去'];
        return(
        <div className="list">
            <ul>
            {
                lists.map((list,index)=>{
                return(
                    <li key={index}>{list}</li>
                )
                })
            }  
            </ul>
        </div>
        )
    }
    }
    export default Demo1;
```