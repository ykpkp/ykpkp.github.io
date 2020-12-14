---
title: python爬虫(三)-urllib.error异常
categories:
  - python
tags:
  - 爬虫
abbrlink: 6f6b0998
date: 2019-06-03 14:09:10
cover: https://i.loli.net/2020/11/14/E6ZaYCGIckQUMdn.png
---

### urllib.error
urllib.error异常可以接收urllib.request尝试的异常,urllib.error有两个方法，URLError和HTTPError如下图所示：
![](https://i.loli.net/2019/06/03/5cf4b01834b7660294.png)
<!--more-->
![](https://i.loli.net/2019/06/03/5cf4b0723cc0293255.png)

 URLError是OSError的一个子类，HTTPError是URLError的一个子类，服务器上HTTP的响应会返回一个状态码，根据这个HTTP状态码，我们可以知道我们的访问是否成功。常见的状态码200表示成功，还有404等，具体自行了解

### URLError异常
 让我们先看下URLError的异常，代码如下所示：
```
import urllib.request as res
import urllib.error as uer
#一个不存在的网址
url = "http://www.www.www"
req = res.Request(url)
try:
    response = res.urlopen(req)
    html = response,read().decode('utf-8')
    print(html)
except uer.URLError as e:
    print(e.reason)

```
可以看到结果：

>  **获取地址信息失败**
>  ![](https://i.loli.net/2019/06/03/5cf4b1bfc125a51857.png)


### HTTPError异常
再看下HTTPError异常，代码如下
```
import urllib.request as res
import urllib.error as uer
#一个不存在的页面
url = "http://www.douyu.com/ykp.html"
req = res.Request(url)
try:
    response = res.urlopen(req)
except uer.HTTPError as e:
    print(e.code)
```
运行之后，我们可以看到404，这说明请求的资源没有在服务器上找到，www.douyu.com 这个服务器是存在的，但是我们要查找的ykp.html资源是没有的，所以抛出404异常。


![](https://i.loli.net/2019/06/03/5cf4b440c730c96658.png)

### URLError和HTTPError混合使用


**有一点需要注意：**

如果想用HTTPError和URLError一起捕获异常，那么需要将HTTPError放在URLError的前面，因为HTTPError是URLError的一个子类。如果URLError放在前面，出现HTTP异常会先响应URLError，这样HTTPError就捕获不到错误信息了。

![](https://i.loli.net/2019/06/03/5cf4b69e468f547608.png)
如果不用上面的方法，也可以使用hasattr函数判断URLError含有的属性，如果含有reason属性表明是URLError，如果含有code属性表明是HTTPError。

```
import urllib.request as res
import urllib.error as uer
url = "http://www.douyu.com/ykp.html"
req = res.Request(url)
try:
    response = res.urlopen(req)
except uer.URLError as e:
    if hasattr(e,'code'):
        print("HTTPError")
        print(e.code)
    elif hasattr(e,'reason'):
        print("URLError")
        print(e.reason)
```
运行结果：
![](https://i.loli.net/2019/06/03/5cf4b81e5a64215238.png)
### 结语
用了三篇文章的内容写urllib这个库，基本使用方式就差不多就这样，如果还想深入的学习这个库可自行查看[官方文档](https://docs.python.org/3/library/urllib.html)  下次我们就开始学习其他的爬虫库了




















