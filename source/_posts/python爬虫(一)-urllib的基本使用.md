---
title: python爬虫(一)-urllib的基本使用
categories:
  - python
tags:
  - 爬虫
abbrlink: 794500f6
date: 2019-06-01 00:00:10
cover: https://i.loli.net/2020/11/14/E6ZaYCGIckQUMdn.png
---

### 前言
python之所以强大主要是因为他有许多的开源库可以使用，爬虫的库就有很多，具体可以自行了解一下。


为了方便我们这次使用的IDE就是用sublime text 3 ，sublime text 3并不支持python程序，所以我们需要配置一下。具体配置教程请查看[sublime text 3 打造成python IDE 环境](https://www.jianshu.com/p/a401a0bfddf7) 

学习python爬虫当少不了，python的一些基础。
可以在通过如下方式进行学习：

**(1)廖雪峰Python3教程(文档)：** 
这个也是我的入门教程
	URL：[http://www.liaoxuefeng.com/](http://www.liaoxuefeng.com/)
<!--more-->	
**(2)菜鸟教程Python3教程(文档)：**
    URL：[http://www.runoob.com/python3/python3-tutorial.html](http://www.runoob.com/python3/python3-tutorial.html)
    
**(3)鱼C工作室Python教程(视频)：**
    小甲鱼老师很厉害，讲课风格幽默诙谐，如果时间充裕可以考虑看视频。
URL：[http://www.fishc.com/](http://www.fishc.com/)

### urllib简介
在Python 2中，有urllib和urllib2两个库来实现请求的发送。而在Python 3中，已经不存在urllib2这个库了，统一为urllib，其官方文档链接为：[https://docs.python.org/3/library/urllib.html](https://docs.python.org/3/library/urllib.html)。

首先，了解一下urllib库，它是Python内置的HTTP请求库，也就是说不需要额外安装即可使用。它包含如下4个模块：

>  **request**：最基本的HTTP请求模块，可用来模拟发送请求。传入URL以及额外的参数就可以实现想浏览器那样访问网站
**error**：异常处理模块，请求错误时，我们可以捕获这些异常，在进行重试以保证程序不意外终止
**parse**：一个工具模块，提供URL处理方法，比如拆分，解析，合并
**robotparser**：主要用来识别网站的robots.txt文件，然后判断哪些网站可以爬，用得少。

我们主要用的就前三个。
### 爬虫的简单实例
使用urllib.request.urlopen()可以轻松打开一个网站并获取源码。

> urllib.request.urlopen(url, data=None, [timeout, ]*, cafile=None, capath=None, cadefault=False, context=None)

urlopen有几个默认的参数具体可查看官方文档



了解了这些信息后，我们就可以写一个简单的爬虫小程序，在sublime text中新建一个urllib_test.py的文件输入如下代码：

```
rom urllib import request
response = urllib.request.urlopen('https://www.python.org')
html = response.read()
html = html.decode("utf-8")
print(html)
```
urllib使用equest.urlopen()打开和读取URL信息，返回的对象response如同一个文本对象，我们可调用read方法进行读取，decode("utf-8")将编码换成通用的utf-8.然后利用print函数将其打印出来。
![](https://i.loli.net/2019/05/31/5cf14beb6d11f87271.png)
上图就是我们利用python写的一个简单的小爬虫，爬取下来的网页源码。

其实这些源码就是浏览器接收到https://www.python.org  这个网站服务发送的内容，只不过通过浏览器解析后将这些代码转换成了界面信息给我们浏览
当然这些源码信息我们用浏览器的审查元素也可以到，例如我们使用谷歌浏览器在页面右键选择检查，也就是审查元素(不是所有页面都可以审查元素的，例如起点中文网付费章节就不行.)
### 结语
感觉啥都没写不知不觉就0点了，只有自己写才能体会别人每篇文章写出来都不容易呀，写文章真的很耗时间，但是能让人印象更深。时间不早啦，今天就写这么多了，后面还有更好玩的等着我去学习呢！
