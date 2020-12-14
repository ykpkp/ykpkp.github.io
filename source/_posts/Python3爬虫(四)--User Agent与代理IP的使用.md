---
title: Python3爬虫(四)--User Agent与代理IP
categories:
  - python
tags:
  - 爬虫
abbrlink: ac32d860
date: 2019-06-04 21:24:10
cover: https://i.loli.net/2020/11/14/E6ZaYCGIckQUMdn.png
---

### 为什么要使用User Agent
这个User Agent在系列文章第二篇中有简单的说过[python爬虫(二)-用urllib实现百度翻译](http://t.cn/Ai9l4nDA)，今天详细说明一下

很多网站不喜欢被爬虫程序访问，所以会设置关卡阻止爬虫程序的访问，如过对方服务器检查到访问者是爬虫程序，也就是非人为点击访问的，就不会让你继续访问。此时通过设置User Agent来达到隐藏身份的目的，User Agent简称UA。

User Agent储存在headers中，服务器通过检测headers中的User Agent来判断是谁在访问，在python中如果不设置User Agent它会有默认的值，那么这个User Agent会带有python的字样，如果检测到User Agent是python就不会在让你继续访问。
<!--more-->
### 常见的User Agent

 **1. Android**	

> 1. Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19
> 2. Mozilla/5.0 (Linux; U; Android 4.0.4; en-gb; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
> 3. Mozilla/5.0 (Linux; U; Android 2.2; en-gb; GT-P1000 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1

**2. Firefox**

> 1. Mozilla/5.0 (Windows NT 6.2; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0
> 2. Mozilla/5.0 (Android; Mobile; rv:14.0) Gecko/14.0 Firefox/14.0

**3. Google Chrome**

>1.  Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36
>2. Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19

**4.ios**

> 1. Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3
> 2. Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3


上面列举了Andriod、Firefox、Google Chrome、iOS的一些User Agent，直接copy就能用。

### 设置User-Agent
我们还是使用urllib这个库举例，设置User-Agent有两种方法，第一种在[python爬虫(二)-用urllib实现百度翻译](http://t.cn/Ai9l4nDA)中有说过这里不再赘述。
**这里说一下第二种方法：**

我们以百度首页为例，可以试一试不添加header，发现也能访问，但是访问此时过于频繁次数过多就会阻止你。这时候就需要添加header，直接copy一个上面列举的User-Agent
```
import urllib.request as res
url = "http://www.baidu.com"
req = res.Request(url)
req.add_header("User-Agent","Mozilla/5.0 (Windows NT 6.2; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0")
response = res.urlopen(req)
html = response.read().decode('utf-8')
print(html)
```
运行结果就是将百度首页的源码全部抓下来了。
![](https://i.loli.net/2019/06/03/5cf4d878dda6657104.png)
### 代理IP使用
有些网站就算你添加header，要知道我们程序运行速度是极其快的，如果使用同一个IP频繁的去爬取，就会被认定这不是人为操作，对方服务器会将你的IP封了，你就访问不了。所谓道高一尺魔高一丈，好的程序都是在不断改善中成长的，这时候我们就需要用到代理IP，就算封了我们的IP，我们可以换一个IP继续爬。


**使用步骤：**

> 1.调用urlib.request.ProxyHandler()，proxies参数为一个字典。
>class urllib.request.ProxyHandler(proxies=None) 


>2.创建Opener(类似于urlopen，这个代开方式是我们自己定制的)
>urllib.request.build_opener([handler, ...])

>3.安装Opener
>urllib.request.install_opener(opener)

详情查看[官方文档](https://docs.python.org/3/library/urllib.request.html)

#### 选取代理IP
在写代码前，需要在代理IP网站上选区 IP，推荐使用西刺代理IP。
URL：[http://www.xicidaili.com/](http://www.xicidaili.com/)
随便选一个信号好点的，类型为HTTPS的IP  我选的 (112.85.169.252:9999)，因为这是免费公开的代理IP所以肯定有很多人用，如果出现连接失败的情况，多尝试几个IP。我就尝试了好几个才成功。
![](https://i.loli.net/2019/06/04/5cf66909e26d049404.png)
编写代码访问 https://ip.cn/index.php  该网站是测试自己IP为多少的网址，服务器会返回访问者的IP。
我们可以先用浏览器打开这个网址查看我们自己的IP，这里可以看到我的ip是 `61.xx.xx.111`
![](https://i.loli.net/2019/06/04/5cf669bdd71d966605.png)
然后将我们选好的IP，放到我们的代码中，然后用代码访问这个网站，看看返回的是不是我们代理的IP，
注意 `proxy_port = res.ProxyHandler({'https':'112.85.169.252:9999'})` 这里要用https访问
**代码如下：**

```
import urllib.request as res
#访问的网址
url = "https://ip.cn/index.php"
#创建ProxyHandler
proxy_port = res.ProxyHandler({'https':'112.85.169.252:9999'})
#创建opener
opener = res.build_opener(proxy_port)
#添加User-Agent   这个添加User-Agent也可以在下面的urlopen中添加
opener.addheaders = [('User-Agent','Mozilla/5.0 (Windows NT 6.2; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0')]
#安装User Angent
res.install_opener(opener)
#使用自己安装好的opener
response = res.urlopen(url)
html = response.read().decode('utf-8')
print(html)
```
**看下结果：**
可以看到返回的IP就是我们选的代理IP，这样就说明代理成功了。
![](https://i.loli.net/2019/06/04/5cf66b8ed7a1170268.png)

我们还可以写一个IP列表，这样就不用我们经常手动更换IP
更改代码：

```
import urllib.request as res
import random
#访问的网址
url = "https://ip.cn/index.php"
#代理IP
proxy_list = [
    {'https':'112.85.171.133:9999'},
    {'https':'121.17.174.121:9797'},
    {'https':'114.217.229.53:8118'},
    {'https':'112.85.169.252:9999'}
]
# 从列表中随机选取一个IP
proxy = random.choice(proxy_list)
#查看随机出来的是那个IP
print(proxy)
#创建ProxyHandler
proxy_port = res.ProxyHandler(proxy)
#创建opener
opener = res.build_opener(proxy_port)
#添加User-Agent
opener.addheaders = [('User-Agent','Mozilla/5.0 (Windows NT 6.2; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0')]
#安装User Angent
res.install_opener(opener)
#使用自己安装好的opener
response = res.urlopen(url)
html = response.read().decode('utf-8')
print(html)

```
这样就不用一直去ProxyHandler中更换IP了，每次运行就随机一个IP。以上就是User Agent与代理IP的使用基本方式了。
### 结语
但是就算这样如果我们列表中的IP全部都被封了怎么办呢？
这就需要我们使用代理池了，有免费的也有收费的，例如我们用的西刺就是免费，我们可以写一个爬虫将上面的IP都抓取下来做一个代理池，只要IP被封，自动去代理池找能用的IP，这样就更方便了。
