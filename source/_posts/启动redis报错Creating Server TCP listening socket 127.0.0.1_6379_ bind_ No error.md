---
title: 启动redis报错Creating Server TCP listening socket 127.0.0.1_6379_ bind_ No error
categories:
  - centos7
tags:
  - redis
abbrlink: b62f15c9
date: 2019-05-17 20:44:10
cover: https://i.loli.net/2020/11/14/ZoSAageMQrLWPKU.png
---

### 启动redis
1.启动服务：`redis-server.exe redis.windows.conf2`.
新开cmd窗口：`redis-cli`
如果报错`Creating Server TCP listening socket 127.0.0.1:6379: bind: No error`
分别输入：

    redis-cli.exe
    shutdown  
    exit
    redis-server.exe redis.windows.conf
<!--more-->
如果输入 shutdown 报错：`(error) NOAUTH Authentication required.`
说明没有用密码链接：
    请输入： `AUTH "password"` 
    
查看reids内容

    kyes *

**启动关闭redis**
启动服务：`redis-server --service-start`
停止服务：`redis-server --service-stop`
安装redis相关的库

    pip install django-redis
    pip install django-redis-sessions

在setting中配置redis缓存session

    SESSION_ENGINE = 'redis_sessions.session'
    SESSION_REDIS = {
        'host': 'localhost',
        'port': 6379,
        'db': 0,
        'password': '123456',
        'prefix': 'session',
        'socket_timeout': 10}

