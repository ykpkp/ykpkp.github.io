---
title: Centos7 中yum命令无法执行
categories:
  - centos7
abbrlink: bdebabc9
date: 2019-05-19 20:44:10
cover: https://i.loli.net/2020/11/14/FiMGIdXArPfpVEy.png
---

报错：

    **/usr/bin/yum: line 3: import: command not found
    
    /usr/bin/yum: line 4: try:: command not found
    
    /usr/bin/yum: line 5: import: command not found
    
    /usr/bin/yum: line 6: except: command not found
    
    /usr/bin/yum: line 24: syntax error near unexpected token `('
    
    /usr/bin/yum: line 24: `""" % (sys.exc_value, sys.version)'**
<!--more-->
原因：升级python3导致

解决方式：

    修改文件/usr/bin/yum、头中相应python为#!/usr/bin/python2.7
