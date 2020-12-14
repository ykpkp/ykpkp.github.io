---
title: python3爬虫(七)--了解Beautiful Soup 4
categories:
  - python
tags:
  - 爬虫
abbrlink: 22f91623
date: 2019-06-7 23:29:10
cover: https://i.loli.net/2020/11/14/E6ZaYCGIckQUMdn.png
---


### Beautiful Soup 4简介
Beautiful Soup 是一个可以从HTML或XML文件中提取数据的Python库.它能够通过你喜欢的转换器实现惯用的文档导航,查找,修改文档的方式.Beautiful Soup会帮你节省数小时甚至数天的工作时间.
Beautiful Soup 3 目前已经停止开发,推荐使用Beautiful Soup 4 详情查看 [官方文档](https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html)
<!--more-->
### 安装
如果你用的是新版的Debain或ubuntu,那么可以通过系统的软件包管理来安装:

    $ apt-get install Python-bs4

Beautiful Soup 4 通过PyPi发布,所以如果你无法使用系统包管理安装,那么也可以通过 easy_install 或 pip 来安装.包的名字是 beautifulsoup4 ,这个包兼容Python2和Python3.

    $ easy_install beautifulsoup4
    
    $ pip install beautifulsoup4
在PyPi中还有一个名字是 BeautifulSoup 的包,但那可能不是你想要的,那是 Beautiful Soup3 的发布版本,因为很多项目还在使用BS3, 所以 BeautifulSoup 包依然有效.但是如果你在编写新项目,那么你应该安装的 beautifulsoup4 
### 简单的例子
Beautiful Soup4 到底有什么用呢，先来看看下面的代码。是官方给出的一个小例子
这是 爱丽丝梦游仙境的 的一段内容  定义一个`html_doc` 值是一段html代码

```
html_doc = """
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>
<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
and they lived at the bottom of a well.</p>
<p class="story">...</p>
"""
```
使用BeautifulSoup解析这段代码,能够得到一个 BeautifulSoup 的对象,并能按照标准的缩进格式的结构输出
```
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc,features="html.parser")
print(soup.prettify())
```

结果：

```
<html>
 <head>
  <title>
   The Dormouse's story
  </title>
 </head>
 <body>
  <p class="title">
   <b>
    The Dormouse's story
   </b>
  </p>
  <p class="story">
   Once upon a time there were three little sisters; and their names were
   <a class="sister" href="http://example.com/elsie" id="link1">
    Elsie
   </a>
   <a class="sister" href="http://example.com/lacie" id="link2">
    Lacie
   </a>
   and
   <a class="sister" href="http://example.com/tillie" id="link3">
    Tillie
   </a>
and they lived at the bottom of a well.
  </p>
  <p class="story">
   ...
  </p>
 </body>
</html>
```
#### 几个简单的浏览结构化数据的方法

```
#获取title标签包含内容
soup.title
<title>The Dormouse's story</title>

#获取标签名
soup.title.name
title

#获取title的内容
soup.title.string
The Dormouse's story

#获取title的父标签名
soup.title.parent.name
head

#获取第一个P标签
soup.p
<p class="title"><b>The Dormouse's story</b></p>

#获取第一个P标签的class名
soup.p['class']
title

# 获取第一个a标签
soup.a
 <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>

 # 获取所有a标签
soup.find_all('a')
[<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
<a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>,
 <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]

#获取id为link3的标签
soup.find(id="link3")
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>
```
#### 从文档中找到所有a标签的链接:

```
for link in soup.find_all('a'):
    print(link.get('href'))
    
  http://example.com/elsie
  http://example.com/lacie
  http://example.com/tillie
```
#### 从文档中获取所有文字内容:

```
print(soup.get_text())

The Dormouse's story
The Dormouse's story
Once upon a time there were three little sisters; and their names were
Elsie,
Lacie and
Tillie;
and they lived at the bottom of a well.
...
```
### 安装解析器
Beautiful Soup支持Python标准库中的HTML解析器,还支持一些第三方的解析器,其中一个是 lxml .根据操作系统不同,可以选择下列方法来安装lxml:

```
$ apt-get install Python-lxml

$ easy_install lxml

$ pip install lxml
```
另一个可供选择的解析器是纯Python实现的 html5lib , html5lib的解析方式与浏览器相同,可以选择下列方法来安装html5lib:

```
$ apt-get install Python-html5lib

$ easy_install html5lib

$ pip install html5lib
```



它们的优缺点:
![](https://i.loli.net/2019/06/13/5d026efd05eb812920.png)


推荐使用lxml作为解析器,因为效率更高. 在Python2.7.3之前的版本和Python3中3.2.2之前的版本,必须安装lxml或html5lib, 因为那些Python版本的标准库中内置的HTML解析方法不够稳定.

提示: 如果一段HTML或XML文档格式不正确的话,那么在不同的解析器中返回的结果可能是不一样的,查看 [解析器之间的区别](https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html#id49) 了解更多细节
