---
title: mysql 8.0.12压缩包解压后找不到data文件夹解决办法
abbrlink: bfdf68bf
date: 2020-11-22 18:49:51
tags: mysql
cover: https://i.loli.net/2020/11/22/fxiTrJY9UOV7RDm.jpg
---
## 下载mysql

[mysql下载地址](https://dev.mysql.com/downloads/mysql/)  免安装版 直接解压后发现没有data文件夹 
![](https://i.loli.net/2020/11/22/wuG4cUoRI7rlYZf.jpg)
## 解压

解压出来是这样的，没有data文件夹
![](https://i.loli.net/2020/11/22/3gRKmWlPCZuyHn8.jpg)
解决方法：
```mysqld --initialize-insecure --user=mysql```

直接复制上面这条命令
然后cmd进入到 mysql解压出来bin的目录中：
![](https://i.loli.net/2020/11/22/rs5mNRGP2W8SKL9.jpg)

等待一会  就发现data的这个目录了！
![](https://i.loli.net/2020/11/22/uR3WsPGzeAd4KHL.jpg)