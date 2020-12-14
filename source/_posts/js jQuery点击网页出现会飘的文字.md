---
title: js jQuery点击网页出现会飘的文字
categories:
  - 前端
tags:
  - javascript
abbrlink: 8516ffa3
date: 2019-05-19 22:44:10
cover: https://i.loli.net/2020/11/14/J2TYmRn8aigxz1h.png
---

效果图

![](https://i.loli.net/2019/06/09/5cfc9e8d8c2b231467.gif)
<!--more-->
上代码：
```
    <script type="text/javascript">
      var a_idx = 0;
      $(document).ready(function ($) {
        $("body").click(function (e) {
            var red = parseInt(Math.random()*257).toString(16);
        var blue = parseInt(Math.random()*257).toString(16);
        var green= parseInt(Math.random()*257).toString(16);
        var color = '#'+red+blue+green;
          var a = new Array("❤ 富强 ❤", "❤ 民主 ❤", "❤ 文明 ❤", " ❤ 和谐 ❤", "❤ 自由 ❤", " ❤ 平等 ❤", "❤ 公正 ❤", "❤ 法治 ❤", "❤ 爱国 ❤", "❤ 敬业 ❤", "❤ 诚信 ❤", "❤ 友善 ❤");
          var $i = $("<span/>").text(a[a_idx]);
          a_idx = (a_idx + 1) % a.length;
          var x = e.pageX,
            y = e.pageY;
          $i.css({
            "z-index": 999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": color
          });
          $("body").append($i);
          $i.animate({
            "top": y - 180,
            "opacity": 0
          }, 1500, function () {
            $i.remove();
          });
        });
      });
    </script>
```
