---
title: python爬虫实例(二)--爬取猫眼电影最受期待排行榜
date: 2019-05-019 23:34:10
categories:
  - python
tags:
  - 爬虫
abbrlink: ec8f6773
cover: https://i.loli.net/2020/11/14/E6ZaYCGIckQUMdn.png
---

### 前言
这次使用的还是requests+beautifulsoup这两个库，方法也可之前 [爬取酷狗TOP500音乐信息](http://t.cn/AiNB2OYu)一样，分析链接，然后分析网页结构。抓取电影的  排名，片名，上映时间，主演

###  分析链接
https://maoyan.com/board/6 这个链接就是猫眼最受期待电影排行榜，这个跟酷狗不一样这个有翻页，可以很快的观察出每一的链接，一共5页。

我们可以先点击第二页观察连接：https://maoyan.com/board/6?offset=10    ，发现多了一个 ?offset=10 我们继续点击第三页观察链接：https://maoyan.com/board/6?offset=20     ，发现链接的?offset=10变成的?offset=20
<!--more-->
在点击第一页 观察链接：https://maoyan.com/board/6?offset=0   ，可以看到?offset=0  可以总结出  每点击下一页offset的值增加10，总共有5页，所以我们总共有5个链接，每页有10个电影，总共50个电影

### 分析网页结构
回到第一页，打开审查元素，选中第一个电影。可以看到10个dd的标签，每个标签里面都对应一部电影的信息
![](https://i.loli.net/2019/06/19/5d0a50809e73074722.png)
打开第一个dd标签，可以看到 片名，片名，主演和上映时间等信息：
![](https://i.loli.net/2019/06/19/5d0a5173488fe11254.png)

以获取排名举例，其他信息都是一样的操作
选中排名的 **i** 标签，右键--> copy--> copy selector,可以得到一串代码，我们就需要利用beautifulsoup通过这串代码定位到排名

```
#app > div > div > div.main > dl > dd:nth-child(1) > i
```
copy下来的只是对应这一个电影的排名，我们需要获取到所有排名，所以我们需要将复制的代码修改如下：

```
#app > div > div > div.main > dl > dd > i
```
这样就可以获取当前页所有电影的排名

其他信息也是相同的操作，选中对应的标签，右键--> copy--> copy selector 然后删除dd后面的 `:nth-child(1)`  这几个字符

完整代码：

```
import requests
from bs4 import BeautifulSoup
Headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'
}
def get_info(url):
    response = requests.get(url,headers = Headers)
    soup = BeautifulSoup(response.text,'lxml')
    ranks = soup.select("#app > div > div > div.main > dl > dd > i")
    titles = soup.select("#app > div > div > div.main > dl > dd > div > div > div.movie-item-info > p.name > a")
    stars = soup.select("#app > div > div > div.main > dl > dd > div > div > div.movie-item-info > p.star")
    times = soup.select("#app > div > div > div.main > dl > dd > div > div > div.movie-item-info > p.releasetime")
    wants = soup.select("#app > div > div > div.main > dl > dd > div > div > div.movie-item-number.wish > p.month-wish > span > span")
    for rank,title,star,time,want in zip(ranks,titles,stars,times,wants):
        print("排名：" + rank.text.strip()+"----"+"片名：" +title.text.strip()+"-----"+star.text.strip()+"----"+time.text.strip())
if __name__ == '__main__':
    #生成对应的5个页面的链接
    urls = ['https://maoyan.com/board/6?offset={}' .format(offset*10)for offset in range(6)]
    for url in urls:
        get_info(url)
```
结果：
![](https://i.loli.net/2019/06/19/5d0a54c7949b260142.gif)

