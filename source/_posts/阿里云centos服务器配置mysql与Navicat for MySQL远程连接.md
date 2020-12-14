---
title: 阿里云centos服务器配置mysql与Navicat for MySQL远程连接
categories:
  - centos7
tags:
  - mysql
abbrlink: 6c7383ad
date: 2019-05-18 20:44:10
cover: https://i.loli.net/2020/11/14/FiMGIdXArPfpVEy.png
---

**1.下载mysql：**

    输入命令：wget [http://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm](http://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm)

**2\. 安装mysql rpm包：**

    输入命令：yum localinstall mysql80-community-release-el7-1.noarch.rpm
<!--more-->
看到安装MySQL8.0安装完成后可到/etc/yum.repos.d/目录下看到：

     mysql-community.repo
     mysql-community-source.repo


**3\. 安装MySQL：**

    yum install mysql-community-server

等待安装成功  安装成功后会随机给一个密码 

**4.查看随机密码：**

**输入命令：**

    sudo grep 'temporary password' /var/log/mysqld.log


记住你的随机密码修改密码要用到
随机密码是一串随机字符穿  符号字母数字可能都有

**5.修改密码**

   登陆mysql输入下面的命令:

    mysql -uroot -p


然后输入你的mysql登录密码 

2.开始修改： 

**注意**: MySQL8.0修改密码需要有大小写字母、数字、特殊字符组合 

输入修改命令： 

    ALTER USER 'root'@'localhost' IDENTIFIED BY '你的新密码';


以上就是修改数据库密码

还有一种方法可以去除密码效验强度：

临时办法可以去除密码强度校验（不过下次登录又得用一遍，好处是不需要重启）输入下面命令即可：

    set global validate_password_policy=0;

完成后就是设置简单的密码了！

**远程链接阿里云服务器数据库**

我使用的是使用Navicat for MySQL

正常情况如下

![](https://i.loli.net/2020/11/14/4vICOjEdasxiumD.png)

![](https://i.loli.net/2020/11/14/lvhkXwCof37tS1M.png)

**我遇到的错误**

![](https://i.loli.net/2020/11/14/KazrBFuc582nkvm.png)

**我的解决方法：**

**方法一：**

执行命令：

    cat /etc/ssh/sshd_config
    vi  /etc/ssh/sshd_config


将：PasswordAuthentication 的默认值为 yes

    PermitRootLogin 设置 yes
    AllowTcpForwarding 设置 yes

去点前面的#号

    执行完重启： service sshd restart


**方法二：**

**1.查看sshd是否正确在运行** 

    netstat -anp| grep sshd


**2.如果没有运行使用 service sshd restart 重启服务** 对我无效 我的显示正常运行

**方法三：**

**1\. 查看本机是否安装SSH软件包** 

    执行：rpm -qa | grep ssh


如果现实下面这些说明安装成功了：

    openssh-server-6.6.1p1-12.el7_1.x86_64 
    openssh-clients-6.6.1p1-12.el7_1.x86_64 
    libssh2-1.4.3-8.el7.x86_64 
    openssh-6.6.1p1-12.el7_1.x86_64

如果没有 需要安装：

    yum install openssh-server


**2\. 开启 SSH 服务**

    执行：service sshd start


看到下面这句话说明你成功了

    Redirecting to /bin/systemctl start sshd.service

查看TCP 22端口是否打开

    netstat -ntpl | grep 22 

看下面这句说明打开了

     tcp 0 0 0.0.0.0:22 0.0.0.0:* LISTEN 17816/sshd


还有方法说  mysql授权的问题但是 对我没用：

Mysql授权可参考http://www.jb51.net/article/42441.htm
对我无用

以上都对我无效 但是错误变了

![](https://i.loli.net/2020/11/14/Pwty5LkulDp6vIj.png)

**参数 PasswordAuthentication 的默认值为 yes，SSH服务将其值置为 no 以禁用密码验证登录，导致此类故障。需要修改 PasswordAuthentication 配置解决此问题。执行命令：cat /etc/ssh/sshd_config  执行完重启服务器**

![](https://i.loli.net/2020/11/14/iN8MRIhgYVl71tq.png)** 

OK！  解决了！

