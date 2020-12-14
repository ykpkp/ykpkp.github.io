---
title: linux服务器配置python3与python2共存
categories:
  - centos7
tags:
  - python
abbrlink: b8e6f2d5
date: 2019-05-19 21:44:10
cover: https://i.loli.net/2020/11/14/eGt64DuHjUX89mL.png
---

#### 话不多说直接动手。我用的是xshell 服务器系统是centos 7


**0.先从官网下载python源码**

    wget https://www.python.org/ftp/python/3.7.1/Python-3.7.1.tar.xz

**1.解压**
 可以新建一个文件夹将下载的python放到这个文件里
 进入home文件夹
 输入：`cd /home` 
 接着输入：`mkdir python`  
 上面的命令完成后就会在home中新建了一个文件夹python
 <!--more-->
 然后将下载的文件移动到我们新建的python文件中
 输入：c`d ~` 
 回到顶级目录
 然后输入： `mv Python-3.7.1.tar.xz /home/python`
 这样就把python的压缩包移动到了我们新建的python文件夹中
 
 接着需要进入到新建的python文件夹
 输入：`cd /home/python`
 进入到文件夹后 输入：`ls`  可以看到有我们的python压缩包`Python-3.7.1.tar.xz` 最后开始解压
 输入：`tar -xvJf Python-3.7.1.tar.xz` 
 解压完成后输入：l`s` 
 可以看到多了一个python的文件夹这就是python的源码了

**2.编译安装**
进入python源码的文件夹
输入：`cd Python-3.7.1`
开始编译：`./configure prefix=/usr/local/python3`
编译完成后开始安装： `make install`    需要等待一小会
安装完毕后 `/usr/local/`目录下就会有`python3`了
到这里python就安装完毕了
**3.重点来了**
由于linux系统都是自带python的，但是版本都是python2的，默认使用的是python2所以我们要更改一下将默认修改为python3

**3.1.查看系统默认的python版本**



我们先进入到`usr/bin`目录
输入：`ll python`
输入完可以看到`python ---> python2` 这个就是系统默认使用`python2.X`的版本
我们需要修改这个默认设置
**3.2.修改python默认版本**


**创建软链**：
      输入：`ln -s /usr/local/python3/bin/python3 /usr/bin/python`  
      如果提示：`ln: failed to create symbolic link '/usr/bin/python': File exists`  
      说明已经有链接链到的这个文件夹上，我们只需要删除他就可以了
      输入：`rm -rf /usr/bin/python`
      删除后在输入一次：`ln -s /usr/local/python3/bin/python3 /usr/bin/python` 
      OK完成了
      你可以按照3.1的方法查看一下是不是修改好了 
      或者也可输入：`python -V   与   python2 -V`           
      看看输出的版本是多少
           
      在安装库时需要输入： python -m install XXXX  这样才是安装到python3的版本是
      直接输入：pip install XXXX 这个是安装到python2的版本上
      还有一种方法是给pip3创建软链：
      输入：ln -s /usr/local/python3/bin/pip3.6 /usr/bin/pip3           
      完成后安装库就只需要输入：pip3 install XXXXX  就可以了

