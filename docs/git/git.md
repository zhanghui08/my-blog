---
title: 工作中常用
date: 2021-05-29
---

```js
提交代码：
	git branch #查看分支
	git checkout -b develop  #创建并切换到 develop 分支
	git branch -d develop       #删除 develop 分支

合并代码：
	git checkout develop
	git pull origin develop
	git merge feature
	git push origin develop

删除分支：
	git checkout master
	git branch -a  #查看已有的本地及远程分支
	git push origin --delete dev #删除远程分支
	git branch -D dev #删除本地分支

Git修改分支名称:
	1：修改本地分支名称 - git branch -m oldName newName
	2：将本地分支的远程分支删除 - git push origin :oldName
	3：将改名后的本地分支推送到远程，将本地分支关联
	      git push origin nawName

Git新版本上线打tag：
	git tag -a v1.3.0 -m "1.3.0版本保存"
	git push origin v1.3.0
	git tag  #查看是否推送成功
	- 修改tag名称 - 例如把v1.3.0改成tag1.4.0
                  -  git tag tag1.4.0 v1.3.0
	-  git tag -d v1.3.0
	-  git push origin tag1.4.0 
```

