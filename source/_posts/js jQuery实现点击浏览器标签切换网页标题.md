---
title: js jQuery实现点击浏览器标签切换网页标题
categories:
  - 前端
tags:
  - javascript
abbrlink: 2ec86465
date: 2019-05-19 23:44:10
cover: https://i.loli.net/2020/11/14/J2TYmRn8aigxz1h.png
---

**效果图**：
![](https://i.loli.net/2019/06/09/5cfc9e735b8cb54633.gif)
<!--more-->
直接上代码

    <script>
        $(document).ready(function () {
            document.addEventListener("visibilitychange", function(){
            document.title = document.hidden ? "回来呀老弟！！" :"来啦老弟！！";});
        })
    </script>

