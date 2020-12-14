---
title: Python3爬虫(六)--requests的高级操作
categories:
  - python
tags:
  - 爬虫
abbrlink: '19723458'
date: 2019-06-06 14:00:10
cover: https://i.loli.net/2020/11/14/E6ZaYCGIckQUMdn.png
---



### 文件上传

```
import requests
url = "http://httpbin.org/post"
files = {'files':open("alipay.png",'rb')}
response = requests.post(url,files=files)
print(response.text)
```
<!--more-->
结果：
![](https://i.loli.net/2019/06/09/5cfc952da392592448.png)
### 获取cookie
```
import requests
url = "http://www.baidu.com"
response = requests.get(url)
print(response.cookies)
for k,v in response.cookies.items():
    print(k,"=",v)
```
结果：

```
<RequestsCookieJar[<Cookie BDORZ=27315 for .baidu.com/>]>
BDORZ = 27315
```
### 会话维持
cookie的一个作用就是可以用于模拟登陆，做会话维持

```
import requests
session = requests.session()
session.get('http://httpbin.org/cookies/set/number/12456')
response = session.get('http://httpbin.org/cookies')
print(response.text)
```
结果：

```
{
  "cookies": {
    "number": "12456"
  }
}

```
可以看到我们设置的cookie的值

### 使用代理

```
import requests
url= "https://www.taobao.com"
proxies  = {
    "https":"https://115.28.148.192:8118",
}
headers  = {"User-Angent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36"}
response = requests.get(url,headers = headers,proxies = proxies)
print(response.status_code)
```
### 设置用户名和密码代理

```
import requests
 
proxies = {
    "http": "http://user:password@127.0.0.1:9743/",
}
response = requests.get("https://www.taobao.com", proxies=proxies)
print(response.status_code)
```

