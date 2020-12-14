---
title: python3爬虫(五)--requests库的基本使用
categories:
  - python
tags:
  - 爬虫
abbrlink: dc79fa45
date: 2019-06-05 00:13:10
cover: https://i.loli.net/2020/11/14/E6ZaYCGIckQUMdn.png
---


###  前言
前面几篇学习了，urllib的这个库，这个库用起来有点麻烦，发送请求，添加header等等，这篇来介绍下requests这个库，Requests是用python语言基于urllib编写的，采用的是Apache2 Licensed开源协议的HTTP库，Requests它会比urllib更加方便，可以节约我们大量的工作。

### 安装

```
pip install requests
```
### 例子
先看一个简单的小例子，来看看requests的威力

```
import requests
r = requests.get('http:www.baidu.com')
print(r.text)
```
这样就可以把百度的首页源码给抓 下来，对你没看错，就这几行代码。是不是比urllib方便多了。又方便又简单。
r是我们请求返回的一个response的一个对象
<!--more-->
### requests库的方法
requests的库主要有以下7个方法

|  方法| 解释 |
|--|--|--|
|requests.request()  | 构造一个请求，支持以下各种方法| 
|requests.get()|获取html的主要方法|
|requests.head()|获取html头部信息的主要方法|
|requests.post()|向html网页提交post请求的方法|
|equests.put()|向html网页提交put请求的方法|
|equests.patch()|向html提交局部修改的请求|
|requests.delete()|向html提交删除请求|

#### requests.get()方法
这个方法是我们平时最常用的方法之一，通过这个方法我们可以了解到其他的方法，所以我们详细介绍这个方法。
具体参数是：

```
r=requests.get(url,params,**kwargs)
```

> url:就是需要爬取的网站地址
> params: 就是参数的意思，url中的参数，字典或者字节流格式。
> **kwargs: 关键字参数，params中传的字典类型
**看看** ****kwargs:**

**params**：字典或字节序列， 作为参数增加到url中,使用这个参数可以把一些键值对以?key1=value1&key2=value2的模式增加到url中
例子：

```
kw = {'key1':' values', 'key2': 'values'}
r = requests.get('http://www.baidu.com', params=kw)
```
其中response对象有以下属性：

|属性| 说明 |
|--|--|
| r.status_code | http请求的返回状态，若为200则表示请求成功。 |
|r.text|http响应内容的字符串形式，即返回的页面内容|
|r.encoding|从http header 中猜测的相应内容编码方式|
|r.apparent_encoding|从内容中分析出的响应内容编码方式（备选编码方式）|
|r.content|http响应内容的二进制形式|

### 带参数的get请求
开篇说了一个简单的get请求，现在来看看带参数的get请求是怎样的。

```
import requests
url = 'http://httpbin.org/get'
data = {
    'name': 'lisi',
    'age': '18'
}
r = requests.get(url,params=data)
print(r.text)
```
可以看到返回的结果中，带有我们的参数。

```
{
  "args": {
    "age": "18", 
    "name": "lisi"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.20.0"
  }, 
  "origin": "61.140.125.81, 61.140.125.81", 
  "url": "https://httpbin.org/get?name=lisi&age=18"
}

```

### Json数据
在requests中 `requests.json()`等同于 `json.loads(requests.text)`
```
import requests
import json
url = 'http://httpbin.org/get'
requests= requests.get(url)
print(type(requests.text))
print(requests.json())
print(json.loads(requests.text))
print(type(requests.json()))
```
结果：
![](https://i.loli.net/2019/06/05/5cf7e449189c038502.png)
### 获取二进制数据
在上面提到了response.content，这样获取的数据是二进制数据，同样的这个方法也可以用于下载图片以及视频资源
### 添加header
在讲urlib时有说过为什么要添加header，现在来看看，requests中如何添加header

以知乎为例：

```
import requests
url = 'https://www.zhihu.com'
r = requests.get(url)
print(r.text)
```
结果：可以看到400的提示，不添加header连接知乎的登陆界面也抓不下来

```
<html>
<head><title>400 Bad Request</title></head>
<body bgcolor="white">
<center><h1>400 Bad Request</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

如果想访问就必须得加headers信息。

```
import requests
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
}
url = 'https://www.zhihu.com'
r = requests.get(url,headers=headers)
print(r.text)
```
结果：

```
<!doctype html>
<html lang="zh" data-hairline="true" data-theme="light"><head><meta charSet="utf-8"/><title data-react-helmet="true">知乎 - 有问题，上知乎</title><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/><meta name="renderer" content="webkit"/><meta name="force-rendering" content="webkit"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><meta name="google-site-verification" content="FTeR0c8arOPKh8c5DYh_9uu98_zJbaWw53J-Sch9MTg"/><meta name="description" property="og:description" content="有问题，上知乎。知乎，可信赖的问答社区，以让每个人高效获得可信赖的解答为使命。知乎凭借认真、专业和友善的社区氛围，结构化、易获得的优质内容，基于问答的内容生产方式和独特的社区机制，吸引、聚集了各行各业中大量的亲历者、内行人、领域专家、领域爱好者，将高质量的内容透过人的节点来成规模地生产和分享。用户通过问答等交流方式建立信任和连接，打造和提升个人影响力，并发现、获得新机会。"/><link rel="shortcut icon" type="image/x-icon" href="https://static.zhihu.com/static/favicon.ico"/><link rel="search" type="application/opensearchdescription+xml" href="https://static.zhihu.com/static/search.xml" title="知乎"/><link rel="dns-prefetch" href="//static.zhimg.com"/><link rel="dns-prefetch" href="//pic1.zhimg.com"/><link rel="dns-prefetch" href="//pic2.zhimg.com"/><link rel="dns-prefetch" href="//pic3.zhimg.com"/><link rel="dns-prefetch" href="//pic4.zhimg.com"/><link href="https://static.zhihu.com/heifetz/app.e65e6e8cef2b2b961232.css" rel="stylesheet"/><link rel="stylesheet"/><script defer="" crossorigin="anonymous" src="https://unpkg.zhimg.com/@cfe/sentry-script@latest/dist/init.js" data-sentry-config="{&quot;dsn&quot;:&quot;https://65e244586890460588f00f2987137aa8@crash2.zhihu.com/193&quot;,&quot;sampleRate&quot;:0.1,&quot;release&quot;:&quot;1641-a5f80cef&quot;,&quot;ignoreErrorNames&quot;:[&quot;NetworkError&quot;,&quot;SecurityError&quot;],&quot;ignoreErrors&quot;:[&quot;origin message&quot;,&quot;Network request failed&quot;,&quot;Loading chunk&quot;,&quot;这个系统不支持该功能。&quot;,&quot;Can&#x27;t find variable: webkit&quot;,&quot;Can&#x27;t find variable: $&quot;,&quot;内存不足&quot;,&quot;out of memory&quot;,&quot;DOM Exception 18&quot;,&quot;The operation is insecure&quot;,&quot;[object Event]&quot;,&quot;[object FileError]&quot;,&quot;[object DOMError]&quot;,&quot;[object Object]&quot;,&quot;拒绝访问。&quot;,&quot;Maximum call stack size exceeded&quot;,&quot;UploadError&quot;,&quot;无法 fetch&quot;,&quot;draft-js&quot;,&quot;缺少 JavaScript 对象&quot;,&quot;componentWillEnter&quot;,&quot;componentWillLeave&quot;,&quot;componentWillAppear&quot;,&quot;getInlineStyleAt&quot;,&quot;getCharacterList&quot;],&quot;whitelistUrls&quot;:[&quot;static.zhihu.com&quot;]}"></script></head><body class="EntrySign-body"><div id="root"><div data-zop-usertoken="{}" data-reactroot=""><div class="LoadingBar"></div><div><header role="banner" class="Sticky AppHeader" data-za-module="TopNavBar"><div class="AppHeader-inner"><a href="//www.zhihu.com" aria-label="知乎"><svg viewBox="0 0 200 91" class="Icon ZhihuLogo ZhihuLogo--blue Icon--logo" style="height:30px;width:64px" width="64" height="30" aria-hidden="true"><title></title><g><path d="M53.29 80.035l7.32.002 2.41 8.24 13.128-8.24h15.477v-67.98H53.29v67.978zm7.79-60.598h22.756v53.22h-8.73l-8.718 5.473-1.587-5.46-3.72-.012v-53.22zM46.818 43.162h-16.35c.545-8.467.687-16.12.687-22.955h15.987s.615-7.05-2.68-6.97H16.807c1.09-4.1 2.46-8.332 4.1-12.708 0 0-7.523 0-10.085 6.74-1.06 2.78-4.128 13.48-9.592 24.41 1.84-.2 7.927-.37 11.512-6.94.66-1.84.785-2.08 1.605-4.54h9.02c0 3.28-.374 20.9-.526 22.95H6.51c-3.67 0-4.863 7.38-4.863 7.38H22.14C20.765 66.11 13.385 79.24 0 89.62c6.403 1.828 12.784-.29 15.937-3.094 0 0 7.182-6.53 11.12-21.64L43.92 85.18s2.473-8.402-.388-12.496c-2.37-2.788-8.768-10.33-11.496-13.064l-4.57 3.627c1.363-4.368 2.183-8.61 2.46-12.71H49.19s-.027-7.38-2.372-7.38zm128.752-.502c6.51-8.013 14.054-18.302 14.054-18.302s-5.827-4.625-8.556-1.27c-1.874 2.548-11.51 15.063-11.51 15.063l6.012 4.51zm-46.903-18.462c-2.814-2.577-8.096.667-8.096.667s12.35 17.2 12.85 17.953l6.08-4.29s-8.02-11.752-10.83-14.33zM199.99 46.5c-6.18 0-40.908.292-40.953.292v-31.56c1.503 0 3.882-.124 7.14-.376 12.773-.753 21.914-1.25 27.427-1.504 0 0 3.817-8.496-.185-10.45-.96-.37-7.24 1.43-7.24 1.43s-51.63 5.153-72.61 5.64c.5 2.756 2.38 5.336 4.93 6.11 4.16 1.087 7.09.53 15.36.277 7.76-.5 13.65-.76 17.66-.76v31.19h-41.71s.88 6.97 7.97 7.14h33.73v22.16c0 4.364-3.498 6.87-7.65 6.6-4.4.034-8.15-.36-13.027-.566.623 1.24 1.977 4.496 6.035 6.824 3.087 1.502 5.054 2.053 8.13 2.053 9.237 0 14.27-5.4 14.027-14.16V53.93h38.235c3.026 0 2.72-7.432 2.72-7.432z" fill-rule="evenodd"/></g></svg></a><ul role="navigation" class="Tabs AppHeader-Tabs"><li role="tab" class="Tabs-item AppHeader-Tab Tabs-item--noMeta"><a class="Tabs-link AppHeader-TabsLink" href="//www.zhihu.com/" data-za-not-track-link="true">首页</a></li><li role="tab" class="Tabs-item AppHeader-Tab Tabs-item--noMeta"><a class="Tabs-link AppHeader-TabsLink" href="//www.zhihu.com/explore" data-za-not-track-link="true">发现</a></li><li role="tab" class="Tabs-item AppHeader-Tab Tabs-item--noMeta"><a class="Tabs-link AppHeader-TabsLink" href="//www.zhihu.com/topic" data-za-not-track-link="true">话题</a></li></ul><div class="SearchBar" role="search" data-za-module="PresetWordItem"><div class="SearchBar-toolWrapper"><form class="SearchBar-tool"><div><div class="Popover"><div class="SearchBar-input Input-wrapper Input-wrapper--grey"><input type="text" maxLength="100" value="" autoComplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-activedescendant="null--1" id="null-toggle" aria-haspopup="true" aria-owns="null-content" class="Input" placeholder=""/><div class="Input-after"><button aria-label="搜索" type="button" class="Button SearchBar-searchIcon Button--primary"><span style="display:inline-flex;align-items:center">​<svg class="Zi Zi--Search" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M17.068 15.58a8.377 8.377 0 0 0 1.774-5.159 8.421 8.421 0 1 0-8.42 8.421 8.38 8.38 0 0 0 5.158-1.774l3.879 3.88c.957.573 2.131-.464 1.488-1.49l-3.879-3.878zm-6.647 1.157a6.323 6.323 0 0 1-6.316-6.316 6.323 6.323 0 0 1 6.316-6.316 6.323 6.323 0 0 1 6.316 6.316 6.323 6.323 0 0 1-6.316 6.316z" fill-rule="evenodd"></path></svg></span></button></div></div></div></div></form></div></div><div class="AppHeader-userInfo"><div class="AppHeader-profile"><div><button type="button" class="Button AppHeader-login Button--blue">登录</button><button type="button" class="Button Button--primary Button--blue">加入知乎</button></div></div></div></div></header></div><main role="main" class="App-main"><div class="SignFlowHomepage"><div class="SignFlowHomepage-content"><div class="Card SignContainer-content"><div class="SignFlowHeader" style="padding-bottom:5px"><svg viewBox="0 0 200 91" class="Icon ZhihuLogo ZhihuLogo--blue Icon--logo" style="height:65.625px;width:140px" width="140" height="65.625" aria-hidden="true"><title></title><g><path d="M53.29 80.035l7.32.002 2.41 8.24 13.128-8.24h15.477v-67.98H53.29v67.978zm7.79-60.598h22.756v53.22h-8.73l-8.718 5.473-1.587-5.46-3.72-.012v-53.22zM46.818 43.162h-16.35c.545-8.467.687-16.12.687-22.955h15.987s.615-7.05-2.68-6.97H16.807c1.09-4.1 2.46-8.332 4.1-12.708 0 0-7.523 0-10.085 6.74-1.06 2.78-4.128 13.48-9.592 24.41 1.84-.2 7.927-.37 11.512-6.94.66-1.84.785-2.08 1.605-4.54h9.02c0 3.28-.374 20.9-.526 22.95H6.51c-3.67 0-4.863 7.38-4.863 7.38H22.14C20.765 66.11 13.385 79.24 0 89.62c6.403 1.828 12.784-.29 15.937-3.094 0 0 7.182-6.53 11.12-21.64L43.92 85.18s2.473-8.402-.388-12.496c-2.37-2.788-8.768-10.33-11.496-13.064l-4.57 3.627c1.363-4.368 2.183-8.61 2.46-12.71H49.19s-.027-7.38-2.372-7.38zm128.752-.502c6.51-8.013 14.054-18.302 14.054-18.302s-5.827-4.625-8.556-1.27c-1.874 2.548-11.51 15.063-11.51 15.063l6.012 4.51zm-46.903-18.462c-2.814-2.577-8.096.667-8.096.667s12.35 17.2 12.85 17.953l6.08-4.29s-8.02-11.752-10.83-14.33zM199.99 46.5c-6.18 0-40.908.292-40.953.292v-31.56c1.503 0 3.882-.124 7.14-.376 12.773-.753 21.914-1.25 27.427-1.504 0 0 3.817-8.496-.185-10.45-.96-.37-7.24 1.43-7.24 1.43s-51.63 5.153-72.61 5.64c.5 2.756 2.38 5.336 4.93 6.11 4.16 1.087 7.09.53 15.36.277 7.76-.5 13.65-.76 17.66-.76v31.19h-41.71s.88 6.97 7.97 7.14h33.73v22.16c0 4.364-3.498 6.87-7.65 6.6-4.4.034-8.15-.36-13.027-.566.623 1.24 1.977 4.496 6.035 6.824 3.087 1.502 5.054 2.053 8.13 2.053 9.237 0 14.27-5.4 14.027-14.16V53.93h38.235c3.026 0 2.72-7.432 2.72-7.432z" fill-rule="evenodd"/></g></svg><div class="SignFlowHeader-slogen">注册<!-- -->知乎，发现更多可信赖的解答</div></div><div class="SignContainer-inner"><div class="Register"><div class="Register-content"><form novalidate=""><div class="SignFlow-account"><div class="SignFlow-supportedCountriesSelectContainer"></div><div class="SignFlowInput SignFlow-accountInputContainer"><div class="SignFlow-accountInput Input-wrapper"><input type="tel" value="" name="phoneNo" class="Input" placeholder="手机号"/></div><div class="SignFlowInput-errorMask SignFlowInput-requiredErrorMask SignFlowInput-errorMask--hidden"></div></div></div><div class="Captcha SignFlow-captchaContainer Register-captcha" style="width:0;height:0;opacity:0;overflow:hidden;margin:0;padding:0;border:0"><div><div class="SignFlowInput"><div class="Input-wrapper"><input type="text" value="" name="captcha" tabindex="-1" class="Input" placeholder="验证码"/></div><div class="SignFlowInput-errorMask SignFlowInput-requiredErrorMask SignFlowInput-errorMask--hidden"></div></div><span class="Captcha-englishImage"><div class="Captcha-englishContainer"><img data-tooltip="看不清楚？换一张" class="Captcha-englishImg" src="data:image/jpg;base64,null" alt="图形验证码"/></div></span></div></div><div class="Register-SMSInput"><div class="SignFlow SignFlow-smsInputContainer"><div class="SignFlowInput SignFlow-smsInput"><div class="Input-wrapper"><input type="number" value="" name="digits" class="Input" placeholder="输入 6 位短信验证码"/></div><div class="SignFlowInput-errorMask SignFlowInput-requiredErrorMask SignFlowInput-errorMask--hidden"></div></div><button type="button" class="Button CountingDownButton SignFlow-smsInputButton Button--plain">获取短信验证码</button></div><div class="Register-smsBackUp"><span>接收<!-- -->语音<!-- -->验证码</span></div></div><button type="submit" class="Button Register-submitButton Button--primary Button--blue">注册</button></form><div class="Register-footer"><span class="Register-declaration">注册即代表同意<a href="//www.zhihu.com/terms">《知乎协议》</a><a href="//www.zhihu.com/term/privacy">《隐私保护指引》</a></span><a class="Register-org" href="//www.zhihu.com/org/signup">注册机构号</a></div></div></div><div class="SignContainer-switch">已有帐号？<span>登录</span></div><div class="SignFlowHomepage-qrImage SignFlowHomepage-qrImageHidden"><div></div></div></div></div><button type="button" class="Button SignFlowHomepage-downloadBtn">下载知乎 App</button></div><footer class="SignFlowHomepage-footer"><div class="ZhihuLinks"><a target="_blank" rel="noopener noreferrer" href="https://zhuanlan.zhihu.com">知乎专栏</a><a target="_blank" rel="noopener noreferrer" href="/roundtable">圆桌</a><a target="_blank" rel="noopener noreferrer" href="/explore">发现</a><a target="_blank" rel="noopener noreferrer" href="/app">移动应用</a><a target="_blank" rel="noopener noreferrer" href="/contact">联系我们</a><a target="_blank" rel="noopener noreferrer" href="https://app.mokahr.com/apply/zhihu">来知乎工作</a><a target="_blank" rel="noopener noreferrer" href="/org/signup">注册机构号</a></div><div class="ZhihuRights"><span>© <!-- -->2019<!-- --> 知乎</span><a target="_blank" rel="noopener noreferrer" href="http://www.miibeian.gov.cn/">京 ICP 证 110745 号</a><span>京公网安备 11010802010035 号<a href="https://zhstatic.zhihu.com/assets/zhihu/publish-license.jpg" target="_blank" rel="noopener noreferrer">出版物经营许可证</a></span></div><div class="ZhihuReports"><a target="_blank" rel="noopener noreferrer" href="https://zhuanlan.zhihu.com/p/51068775">侵权举报</a><a target="_blank" rel="noopener noreferrer" href="http://www.12377.cn">网上有害信息举报专区</a><a target="_blank" rel="noopener noreferrer" href="/jubao">儿童色情信息举报专区</a><span>违法和不良信息举报：010-82716601</span></div><div class="ZhihuIntegrity"><div><img src="https://static.zhihu.com/static/revved/img/index/chengxing_logo@2x.65dc76e8.png" alt="诚信网站示范企业"/><a href="https://credit.szfw.org/CX20170607038331320388.html">诚信网站示范企业</a></div></div></footer></div></main></div></div><script id="js-clientConfig" type="text/json">{"host":"zhihu.com","protocol":"https:","wwwHost":"www.zhihu.com","zhuanlanHost":"zhuanlan.zhihu.com"}</script><script id="js-initialData" type="text/json">{"initialState":{"common":{"ask":{}},"loading":{"global":{"count":0},"local":{}},"entities":{"users":{},"questions":{},"answers":{},"articles":{},"columns":{},"topics":{},"roundtables":{},"favlists":{},"comments":{},"notifications":{},"ebooks":{},"activities":{},"feeds":{},"pins":{},"promotions":{},"drafts":{},"chats":{}},"currentUser":"","account":{"lockLevel":{},"unlockTicketStatus":false,"unlockTicket":null,"challenge":[],"errorStatus":false,"message":"","isFetching":false,"accountInfo":{},"urlToken":{"loading":false}},"settings":{"socialBind":null,"inboxMsg":null,"notification":{},"email":{},"privacyFlag":null,"blockedUsers":{"isFetching":false,"paging":{"pageNo":1,"pageSize":6},"data":[]},"blockedFollowees":{"isFetching":false,"paging":{"pageNo":1,"pageSize":6},"data":[]},"ignoredTopics":{"isFetching":false,"paging":{"pageNo":1,"pageSize":6},"data":[]},"restrictedTopics":null,"laboratory":{}},"notification":{},"people":{"profileStatus":{},"activitiesByUser":{},"answersByUser":{},"answersSortByVotesByUser":{},"answersIncludedByUser":{},"votedAnswersByUser":{},"thankedAnswersByUser":{},"voteAnswersByUser":{},"thankAnswersByUser":{},"topicAnswersByUser":{},"articlesByUser":{},"articlesSortByVotesByUser":{},"articlesIncludedByUser":{},"pinsByUser":{},"questionsByUser":{},"commercialQuestionsByUser":{},"favlistsByUser":{},"followingByUser":{},"followersByUser":{},"mutualsByUser":{},"followingColumnsByUser":{},"followingQuestionsByUser":{},"followingFavlistsByUser":{},"followingTopicsByUser":{},"publicationsByUser":{},"columnsByUser":{},"allFavlistsByUser":{},"brands":null,"creationsByUser":{},"creationsSortByVotesByUser":{}},"env":{"ab":{"config":{"experiments":[{"expId":"launch-us_foltopic_user-10","expPrefix":"us_foltopic_user","isDynamicallyUpdated":true,"isRuntime":false,"includeTriggerInfo":false}],"params":[{"id":"tp_qa_toast","type":"String","value":"1","chainId":"_all_"},{"id":"web_column_auto_invite","type":"String","value":"0"},{"id":"li_mceb","type":"String","value":"0","chainId":"_all_"},{"id":"se_km_ad_locate","type":"String","value":"1","chainId":"_all_"},{"id":"tp_m_intro_re_topic","type":"String","value":"1","chainId":"_all_"},{"id":"top_universalebook","type":"String","value":"1","chainId":"_all_"},{"id":"tp_header_style","type":"String","value":"1","chainId":"_all_"},{"id":"ug_follow_answerer_0","type":"String","value":"0","chainId":"_all_"},{"id":"zr_se_footer","type":"String","value":"1","chainId":"_all_"},{"id":"pf_foltopic_usernum","type":"String","value":"50","chainId":"_all_"},{"id":"se_auto_syn","type":"String","value":"0","chainId":"_all_"},{"id":"se_page_limit_20","type":"String","value":"1","chainId":"_all_"},{"id":"se_topicdirect","type":"String","value":"2","chainId":"_all_"},{"id":"soc_bigone","type":"String","value":"0","chainId":"_all_"},{"id":"top_root","type":"String","value":"0","chainId":"_all_"},{"id":"tp_qa_metacard_top","type":"String","value":"top","chainId":"_all_"},{"id":"ug_follow_topic_1","type":"String","value":"2","chainId":"_all_"},{"id":"ug_goodcomment_0","type":"String","value":"1","chainId":"_all_"},{"id":"web_answer_list_ad","type":"String","value":"1"},{"id":"zr_album_exp","type":"String","value":"0","chainId":"_all_"},{"id":"se_expired_ob","type":"String","value":"0","chainId":"_all_"},{"id":"se_ri","type":"String","value":"0","chainId":"_all_"},{"id":"se_search_feed","type":"String","value":"N","chainId":"_all_"},{"id":"se_zu_onebox","type":"String","value":"0","chainId":"_all_"},{"id":"top_vipconsume","type":"String","value":"1","chainId":"_all_"},{"id":"tp_sticky_android","type":"String","value":"0","chainId":"_all_"},{"id":"li_se_intervene","type":"String","value":"1","chainId":"_all_"},{"id":"se_title_only","type":"String","value":"0","chainId":"_all_"},{"id":"se_wannasearch","type":"String","value":"0","chainId":"_all_"},{"id":"se_ltr_v002","type":"String","value":"0","chainId":"_all_"},{"id":"tp_discussion_feed_type_android","type":"String","value":"2","chainId":"_all_"},{"id":"ug_goodcomment","type":"String","value":"0","chainId":"_all_"},{"id":"qa_web_answerlist_ad","type":"String","value":"1","chainId":"_all_"},{"id":"se_colorfultab","type":"String","value":"0","chainId":"_all_"},{"id":"se_ios_spb309","type":"String","value":"0","chainId":"_all_"},{"id":"pf_fuceng","type":"String","value":"1","chainId":"_all_"},{"id":"se_movietab","type":"String","value":"0","chainId":"_all_"},{"id":"se_new_topic","type":"String","value":"0","chainId":"_all_"},{"id":"se_likebutton","type":"String","value":"0","chainId":"_all_"},{"id":"top_v_album","type":"String","value":"1","chainId":"_all_"},{"id":"zr_es_update","type":"String","value":"0","chainId":"_all_"},{"id":"web_rp_id","type":"String","value":"0"},{"id":"li_qa_cover","type":"String","value":"old","chainId":"_all_"},{"id":"ls_new_upload","type":"String","value":"0","chainId":"_all_"},{"id":"se_famous","type":"String","value":"1","chainId":"_all_"},{"id":"top_rank","type":"String","value":"0","chainId":"_all_"},{"id":"top_recall_exp_v1","type":"String","value":"1","chainId":"_all_"},{"id":"se_ad_index","type":"String","value":"10","chainId":"_all_"},{"id":"se_p_slideshow","type":"String","value":"0","chainId":"_all_"},{"id":"se_rr","type":"String","value":"0","chainId":"_all_"},{"id":"ug_newtag","type":"String","value":"0","chainId":"_all_"},{"id":"zr_album_chapter_exp","type":"String","value":"0","chainId":"_all_"},{"id":"zr_km_xgb_model","type":"String","value":"old","chainId":"_all_"},{"id":"pf_creator_card","type":"String","value":"1","chainId":"_all_"},{"id":"qa_test","type":"String","value":"0","chainId":"_all_"},{"id":"se_webtimebox","type":"String","value":"0","chainId":"_all_"},{"id":"ug_zero_follow_0","type":"String","value":"0","chainId":"_all_"},{"id":"li_lt_tp_score","type":"String","value":"1","chainId":"_all_"},{"id":"se_webrs","type":"String","value":"1","chainId":"_all_"},{"id":"ug_zero_follow","type":"String","value":"0","chainId":"_all_"},{"id":"se_webmajorob","type":"String","value":"0","chainId":"_all_"},{"id":"tp_sft_v2","type":"String","value":" a","chainId":"_all_"},{"id":"zr_km_answer","type":"String","value":"open_cvr","chainId":"_all_"},{"id":"zr_video_rec_weight","type":"String","value":"close","chainId":"_all_"},{"id":"li_album_liutongab","type":"String","value":"0","chainId":"_all_"},{"id":"li_filter_ttl","type":"String","value":"2","chainId":"_all_"},{"id":"se_featured","type":"String","value":"1","chainId":"_all_"},{"id":"li_tjys_ec_ab","type":"String","value":"0","chainId":"_all_"},{"id":"se_amovietab","type":"String","value":"0","chainId":"_all_"},{"id":"zr_ans_rec","type":"String","value":"gbrank","chainId":"_all_"},{"id":"web_question_invite","type":"String","value":"B"},{"id":"li_hot_score_ab","type":"String","value":"0","chainId":"_all_"},{"id":"tp_qa_metacard","type":"String","value":"1","chainId":"_all_"},{"id":"web_answer_update","type":"String","value":"0"},{"id":"ls_fmp4","type":"String","value":"0","chainId":"_all_"},{"id":"se_preset_tech","type":"String","value":"0","chainId":"_all_"},{"id":"tp_top_sticky","type":"String","value":"0","chainId":"_all_"},{"id":"zr_ebook_chapter","type":"String","value":"0","chainId":"_all_"},{"id":"zr_rel_search","type":"String","value":"base","chainId":"_all_"},{"id":"se_se_index","type":"String","value":"1","chainId":"_all_"},{"id":"se_subtext","type":"String","value":"0","chainId":"_all_"},{"id":"top_ebook","type":"String","value":"0","chainId":"_all_"},{"id":"se_zu_recommend","type":"String","value":"0","chainId":"_all_"},{"id":"top_ydyq","type":"String","value":"X","chainId":"_all_"},{"id":"ug_fw_answ_aut_1","type":"String","value":"0","chainId":"_all_"},{"id":"gue_new_special_page","type":"String","value":"0"},{"id":"li_ts_sample","type":"String","value":"old","chainId":"_all_"},{"id":"ug_follow_answerer","type":"String","value":"0","chainId":"_all_"},{"id":"zr_art_rec","type":"String","value":"base","chainId":"_all_"},{"id":"gue_anonymous","type":"String","value":"hide"},{"id":"li_album3_ab","type":"String","value":"0","chainId":"_all_"},{"id":"top_hotcommerce","type":"String","value":"1","chainId":"_all_"},{"id":"se_backsearch","type":"String","value":"0","chainId":"_all_"},{"id":"soc_special","type":"String","value":"0","chainId":"_all_"},{"id":"top_native_answer","type":"String","value":"1","chainId":"_all_"},{"id":"top_quality","type":"String","value":"0","chainId":"_all_"},{"id":"top_user_cluster","type":"String","value":"0","chainId":"_all_"},{"id":"tp_time_information","type":"String","value":"0","chainId":"_all_"},{"id":"web_heifetz_grow_ad","type":"String","value":"1"},{"id":"se_lottery","type":"String","value":"0","chainId":"_all_"},{"id":"se_timebox_num","type":"String","value":"3","chainId":"_all_"},{"id":"se_time_threshold","type":"String","value":"1.5","chainId":"_all_"},{"id":"se_billboardsearch","type":"String","value":"0","chainId":"_all_"},{"id":"web_answerlist_ad","type":"String","value":"0"},{"id":"li_se_ebook_chapter","type":"String","value":"1","chainId":"_all_"},{"id":"top_reason","type":"String","value":"1","chainId":"_all_"},{"id":"tsp_lastread","type":"String","value":"0","chainId":"_all_"},{"id":"se_terminate","type":"String","value":"0","chainId":"_all_"},{"id":"soc_bignew","type":"String","value":"1","chainId":"_all_"},{"id":"zr_km_slot_style","type":"String","value":"event_card","chainId":"_all_"},{"id":"li_price_test","type":"String","value":"1","chainId":"_all_"},{"id":"pf_feed","type":"String","value":"1","chainId":"_all_"},{"id":"se_payconsult","type":"String","value":"0","chainId":"_all_"},{"id":"se_agency","type":"String","value":" 0","chainId":"_all_"},{"id":"soc_update","type":"String","value":"1","chainId":"_all_"},{"id":"top_new_feed","type":"String","value":"5","chainId":"_all_"},{"id":"li_ebook_detail","type":"String","value":"1","chainId":"_all_"},{"id":"se_spb309","type":"String","value":"0","chainId":"_all_"},{"id":"tp_meta_card","type":"String","value":"0","chainId":"_all_"},{"id":"tsp_childbillboard","type":"String","value":"1","chainId":"_all_"},{"id":"zr_infinity_rec_num","type":"String","value":"close","chainId":"_all_"},{"id":"se_site_onebox","type":"String","value":"0","chainId":"_all_"},{"id":"top_recall_exp_v2","type":"String","value":"1","chainId":"_all_"},{"id":"top_test_4_liguangyi","type":"String","value":"1","chainId":"_all_"},{"id":"top_gr_ab","type":"String","value":"0","chainId":"_all_"},{"id":"pf_newguide_vertical","type":"String","value":"0","chainId":"_all_"},{"id":"pf_noti_entry_num","type":"String","value":"0","chainId":"_all_"},{"id":"se_rewrite3","type":"String","value":"1","chainId":"_all_"},{"id":"top_recall_deep_user","type":"String","value":"1","chainId":"_all_"},{"id":"tp_sft","type":"String","value":"a","chainId":"_all_"},{"id":"qa_answerlist_ad","type":"String","value":"0","chainId":"_all_"},{"id":"se_websearch","type":"String","value":"3","chainId":"_all_"},{"id":"se_whitelist","type":"String","value":"0","chainId":"_all_"}],"chains":[{"chainId":"_all_"}]},"triggers":{}},"userAgent":{"Edge":false,"Wechat":false,"Weibo":false,"QQ":false,"MQQBrowser":false,"Qzone":false,"Mobile":false,"Android":false,"iOS":false,"isAppleDevice":false,"Zhihu":false,"ZhihuHybrid":false,"isBot":false,"Tablet":false,"UC":false,"Sogou":false,"Qihoo":false,"Baidu":false,"BaiduApp":false,"Safari":false,"isWebView":false,"origin":"Mozilla\u002F5.0 (Windows NT 10.0; WOW64) AppleWebKit\u002F537.36 (KHTML, like Gecko) Chrome\u002F57.0.2987.133 Safari\u002F537.36"},"ctx":{"path":"\u002Fsignup"},"trafficSource":"production","edition":{"baidu":false,"sogou":false,"baiduBeijing":false},"theme":"light","enableShortcut":true,"referer":"","conf":{},"ipInfo":{},"logged":false,"tdkInfo":{}},"me":{"accountInfoLoadStatus":{},"organizationProfileStatus":{},"columnContributions":[]},"label":{"recognizerLists":{}},"comments":{"pagination":{},"collapsed":{},"reverse":{},"reviewing":{},"conversation":{},"parent":{}},"commentsV2":{"stickers":[],"commentWithPicPermission":{},"notificationsComments":{},"pagination":{},"collapsed":{},"reverse":{},"reviewing":{},"conversation":{},"conversationMore":{},"parent":{},"commentV2PostErr":{}},"pushNotifications":{"default":{"isFetching":false,"isDrained":false,"ids":[]},"follow":{"isFetching":false,"isDrained":false,"ids":[]},"vote_thank":{"isFetching":false,"isDrained":false,"ids":[]},"currentTab":"default","notificationsCount":{"default":0,"follow":0,"vote_thank":0}},"messages":{"data":{},"currentTab":"common","messageCount":0},"register":{"registerValidateSucceeded":null,"registerValidateErrors":{},"registerConfirmError":null,"sendDigitsError":null,"registerConfirmSucceeded":null},"login":{"loginUnregisteredError":false,"loginBindWechatError":false,"loginConfirmError":null,"sendDigitsError":null,"validateDigitsError":false,"loginConfirmSucceeded":null,"qrcodeLoginToken":"","qrcodeLoginScanStatus":0,"qrcodeLoginError":null,"qrcodeLoginReturnNewToken":false},"active":{"sendDigitsError":null,"activeConfirmSucceeded":null,"activeConfirmError":null},"switches":{},"captcha":{"captchaNeeded":false,"captchaValidated":false,"captchaBase64String":null,"captchaValidationMessage":null,"loginCaptchaExpires":false},"sms":{"supportedCountries":[]},"question":{"followers":{},"concernedFollowers":{},"answers":{},"hiddenAnswers":{},"updatedAnswers":{},"collapsedAnswers":{},"notificationAnswers":{},"invitationCandidates":{},"inviters":{},"invitees":{},"similarQuestions":{},"relatedCommodities":{},"recommendReadings":{},"bio":{},"brand":{},"permission":{},"adverts":{},"advancedStyle":{},"commonAnswerCount":0,"hiddenAnswerCount":0,"meta":{},"autoInvitation":{},"simpleConcernedFollowers":{},"draftStatus":{}},"shareTexts":{},"answers":{"voters":{},"copyrightApplicants":{},"favlists":{},"newAnswer":{},"concernedUpvoters":{},"simpleConcernedUpvoters":{},"paidContent":{}},"banner":{},"topic":{"bios":{},"hot":{},"newest":{},"top":{},"unanswered":{},"questions":{},"followers":{},"contributors":{},"parent":{},"children":{},"bestAnswerers":{},"wikiMeta":{},"index":{},"intro":{},"meta":{},"schema":{},"creatorWall":{},"wikiEditInfo":{},"committedWiki":{}},"explore":{"recommendations":{}},"articles":{"voters":{}},"favlists":{"relations":{}},"pins":{"voters":{}},"topstory":{"topstorys":{"isFetching":false,"isDrained":false,"afterId":0,"items":[],"next":null},"recommend":{"isFetching":false,"isDrained":false,"afterId":0,"items":[],"next":null},"follow":{"isFetching":false,"isDrained":false,"afterId":0,"items":[],"next":null},"followWonderful":{"isFetching":false,"isDrained":false,"afterId":0,"items":[],"next":null},"sidebar":null,"announcement":{},"hotList":[],"guestFeeds":{"isFetching":false,"isDrained":false,"afterId":0,"items":[],"next":null},"followExtra":{"isNewUser":null,"isFetched":false,"followCount":0,"followers":[]}},"upload":{},"video":{"data":{},"shareVideoDetail":{},"last":{}},"guide":{"guide":{"isFetching":false,"isShowGuide":false}},"reward":{"answer":{},"article":{},"question":{}},"search":{"recommendSearch":[],"topSearch":{},"attachedInfo":{},"nextOffset":{},"topicReview":{},"generalByQuery":{},"generalByQueryInADay":{},"generalByQueryInAWeek":{},"generalByQueryInThreeMonths":{},"peopleByQuery":{},"topicByQuery":{},"columnByQuery":{},"liveByQuery":{},"albumByQuery":{},"eBookByQuery":{}},"creator":{"currentCreatorUrlToken":null,"homeData":{"recommendQuestions":[]},"tools":{"question":{"invitationCount":{"questionFolloweeCount":0,"questionTotalCount":0},"goodatTopics":[]},"customPromotion":{"itemLists":{}},"recommend":{"recommendTimes":{}}},"explore":{"academy":{"tabs":[],"article":{}}},"rights":[],"rightsStatus":{},"levelUpperLimit":10,"account":{"growthLevel":{}}},"publicEditPermission":{},"readStatus":{},"draftHistory":{"history":{},"drafts":{}},"chat":{"chats":{},"inbox":{"recents":{"isFetching":false,"isDrained":false,"isPrevDrained":false,"result":[],"next":null,"key":null,"name":"recents"},"strangers":{"isFetching":false,"isDrained":false,"isPrevDrained":false,"result":[],"next":null,"key":null,"name":"strangers"},"friends":{"isFetching":false,"isDrained":false,"isPrevDrained":false,"result":[],"next":null,"key":null,"name":"friends"},"config":{"newCount":0,"strangerMessageSwitch":false,"strangerMessageUnread":false}}},"notifications":{"recent":{"isFetching":false,"isDrained":false,"isPrevDrained":false,"result":[],"next":null,"key":null},"history":{"isFetching":false,"isDrained":false,"isPrevDrained":false,"result":[],"next":null,"key":null},"notificationActors":{"isFetching":false,"isDrained":false,"isPrevDrained":false,"result":[],"next":null,"key":null},"recentNotificationEntry":"all"},"emoticons":{"emoticonGroupList":[],"emoticonGroupDetail":{}}},"subAppName":"main"}</script><script src="https://static.zhihu.com/heifetz/vendor.5a9436bdf379e6d36200.js"></script><script src="https://static.zhihu.com/heifetz/main.app.e1aabdef8b6c9debdabb.js"></script><script></script></body></html>
```
可以看到很轻松就讲知乎的页面给抓下来了。

### 基本post请求
通过post把数据提交到url地址，等同于一字典的形式提交form表单里面的数据

```
import requests
url = 'http://httpbin.org/post'
data = {
    'name': 'zhangsan',
    'age': '20'
}
r = requests.post(url,data=data)
print(r.text)

```

结果：

```
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "age": "20", 
    "name": "zhangsan"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Content-Length": "20", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.20.0"
  }, 
  "json": null, 
  "origin": "61.140.125.81, 61.140.125.81", 
  "url": "https://httpbin.org/post"
}

```
### 　响应：

```
import requests

response = requests.get("http://www.baidu.com")
# 打印请求页面的状态（状态码）
print(type(response.status_code), response.status_code)
# 打印请求网址的headers所有信息
print(type(response.headers), response.headers)
# 打印请求网址的cookies信息
print(type(response.cookies), response.cookies)
# 打印请求网址的地址
print(type(response.url), response.url)
# 打印请求的历史记录（以列表的形式显示）
print(type(response.history), response.history)
```

结果：

```
<class 'int'> 200
<class 'requests.structures.CaseInsensitiveDict'> {'Cache-Control': 'private, no-cache, no-store, proxy-revalidate, no-transform', 'Connection': 'Keep-Alive', 'Content-Encoding': 'gzip', 'Content-Type': 'text/html', 'Date': 'Wed, 05 Jun 2019 16:05:13 GMT', 'Last-Modified': 'Mon, 23 Jan 2017 13:27:57 GMT', 'Pragma': 'no-cache', 'Server': 'bfe/1.0.8.18', 'Set-Cookie': 'BDORZ=27315; max-age=86400; domain=.baidu.com; path=/', 'Transfer-Encoding': 'chunked'}
<class 'requests.cookies.RequestsCookieJar'> <RequestsCookieJar[<Cookie BDORZ=27315 for .baidu.com/>]>
<class 'str'> http://www.baidu.com/
<class 'list'> []
```

### 结语
requests的基本操作就时以上这些，相比urllib要方便很多，下一篇就说一些，高级操作咯。

 1. 文件上传
 2. 获取cookie
 3. 会话维持
 4. 证书验证
 5. 代理设置
等。










































