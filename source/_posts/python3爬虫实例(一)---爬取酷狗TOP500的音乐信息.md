---
title: python3爬虫实例(一)--爬取酷狗TOP500的音乐信息
categories:
  - python
tags:
  - 爬虫
abbrlink: 3921d68a
date: 2019-05-17 18:11:10
cover: https://i.loli.net/2020/11/14/E6ZaYCGIckQUMdn.png
---

### 前言
 学习完requests库与beautifulsoup这个库后，我们就可来搞一个简单的爬虫了，这次我们爬取酷狗音乐的TOP500的歌曲信息，包含排名，歌名，歌曲时长。分分钟爬取下来。

### 分析URL链接
http://www.kugou.com/yy/rank/home/1-8888.html ，  这个是酷狗TOP500歌曲信息页面，我们发现这里并不能翻页，一页只能显示，22首歌曲，如果我们直接用这个链接就只能爬取这一页的22首歌曲的信息。所以我们要想办法。
 观察这个链接，看到这个1-8888.html 我们只需要修改这个1就可以实现换页，例如把1修改成2：http://www.kugou.com/yy/rank/home/2-8888.html ， 他就可显示下一页的歌曲信息，计算一下，每页22首，共有500 ，可以算出一共有23页，也就是23个URL
 <!--more-->
### 分析网页结构
分析网页这个需要了解点html的基础知识，我们先将第一页的歌曲信息弄下来
http://www.kugou.com/yy/rank/home/1-8888.html ，    打开链接 审查元素 点击 酷狗TOP500，
定位到显示歌曲的div可以看这个div的ul里面的li包含 这些歌曲所有的信息而且结构是一样的只有歌曲信息不同：

![](https://i.loli.net/2019/06/17/5d075192d629021290.png)
我们只需要知道一首歌的结构就行了
利用选择工具选中第一首歌曲，选中后就右边的源码就定位到了响应的地方如图：
![](https://i.loli.net/2019/06/17/5d074cfb692d624313.png)
排名： 用选择工具选择 歌名旁边的数值，这个就是它的排名
![](https://i.loli.net/2019/06/17/5d074e922f03a49863.png)
这时候我们就需要用到beautifulsoup这个库了，用这个库可以快速的获取到这个文本：

```
import requests
from bs4 import BeautifulSoup
url = "https://www.kugou.com/yy/rank/home/1-8888.html"
Headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'
}

response = requests.get(url,headers = Headers)

#将页面源码解析
soup = BeautifulSoup(response.text,'lxml')

#获取到这页所有的排名  select查找的意思，span.pc_temp_num是查找span里面属性pc_temp_num
ranks = soup.select("span.pc_temp_num")

#获取所有的歌名，div.pc_temp_songlist>ul>li>a 这是歌名文本所在的位置
titles = soup.select("div.pc_temp_songlist>ul>li>a")

#获取所有歌曲时长
times = soup.select("div.pc_temp_songlist > ul > li > span.pc_temp_tips_r > span")

#遍历输出第一页所有的歌曲信息
for rank,title,time in zip(ranks,titles,times):
    print("排名："+rank.text.strip()+"-----歌名："+title.text.strip() +"----时间："+time.text.strip())
```
**结果：**
```
排名：1-----歌名：G.E.M.邓紫棋 - 来自天堂的魔鬼 (Live)----时间：4:06
排名：2-----歌名：海来阿木、阿呷拉古、曲比阿且 - 别知己----时间：4:40
排名：3-----歌名：隔壁老樊 - 多想在平庸的生活拥抱你 (Live)----时间：4:29
排名：4-----歌名：陈雪凝 - 你的酒馆对我打了烊----时间：4:11
排名：5-----歌名：蕾蕾的小麦霸们、张振轩 - 赢在江湖 (童声版)----时间：3:46
排名：6-----歌名：魏新雨 - 余情未了----时间：3:36
排名：7-----歌名：王力宏、谭维维 - 缘分一道桥----时间：4:06
排名：8-----歌名：Yusee西 - 心如止水----时间：3:02
排名：9-----歌名：陈雪凝 - 绿色----时间：4:29
排名：10-----歌名：焦迈奇 - 我的名字----时间：4:11
排名：11-----歌名：半吨兄弟 - 爱情错觉----时间：4:03
排名：12-----歌名：Ice Paper - 心如止水----时间：3:05
排名：13-----歌名：王琪 - 万爱千恩----时间：5:22
排名：14-----歌名：王小帅 - 最近 (正式版)----时间：3:37
排名：15-----歌名：杨胖雨 - 情深深雨濛濛----时间：2:35
排名：16-----歌名：虎二 - 你一定要幸福----时间：4:19
排名：17-----歌名：大壮 - 伪装----时间：5:01
排名：18-----歌名：孤独诗人 - 渡我不渡她----时间：3:02
排名：19-----歌名：王贰浪 - 像鱼----时间：4:45
排名：20-----歌名：NCF-艾力 - 黎明前的黑暗 (女声版)----时间：2:25
排名：21-----歌名：大欢 - 多年以后----时间：4:03
排名：22-----歌名：彭十六elf - 戏影----时间：3:40
```
这样就将第一页的所有歌曲信息都爬取下来了，只要第一页搞定，其他页也是相同的原理，只是URL不同而已。
修改代码：

```
import requests
from bs4 import BeautifulSoup
Headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'
}
def get_info(url):
    response = requests.get(url,headers = Headers)
    soup = BeautifulSoup(response.text,'lxml')
    ranks = soup.select("span.pc_temp_num")
    titles = soup.select("div.pc_temp_songlist>ul>li>a")
    times = soup.select("div.pc_temp_songlist > ul > li > span.pc_temp_tips_r > span")
    for rank, title, time in zip(ranks, titles, times):
        print("排名：" + rank.text.strip() + "-----歌名：" + title.text.strip() + "----时间：" + time.text.strip())

if __name__ == '__main__':
    urls = ['http://www.kugou.com/yy/rank/home/{}-8888.html' .format(number)for number in range(1, 24)]
    for url in urls:
        get_info(url)
```
结果：
![](https://i.loli.net/2019/06/17/5d0765adc58c785194.gif)
完结！！！ 是不是超级简单！！！
