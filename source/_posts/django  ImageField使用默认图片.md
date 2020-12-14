---
title: django  ImageField使用默认图片
categories:
  - python
tags:
  - django
abbrlink: f3abe4d6
date: 2019-05-19 23:44:10
cover: https://i.loli.net/2020/11/14/h5fALvioxCylnwt.png
---

修改`models.py`：

    img = models.ImageField(upload_to='article_img',default="upimg/default.png")
<!--more-->
`setting.py`文件：

**设置文件上传路径，图片上传、文件上传都会存放在此目录里**

    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

我的项目目录：
![](https://i.loli.net/2020/11/14/CsNQiV1EvXSnl4O.png)
