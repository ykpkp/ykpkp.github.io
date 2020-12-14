---
title: python控制arduino uno R3--------pyfirmata篇
categories:
  - 硬件
tags:
  - Arduino
abbrlink: 98c03907
date: 2019-05-19 21:44:10
cover: https://i.loli.net/2020/11/14/54drkQCEMB8vqsT.png
---

1.下载pyfirmata

   链接：https://github.com/tino/pyFirmata 
   windows下：`pip install pyfirmata` 
2.下载arduinoIDE

   [窗口版下载](https://coding.net/u/coloz/p/arduino-installer/git/raw/master/1.8.7/arduino-1.8.7-windows.exe)

   [MAC下载](https://coding.net/u/coloz/p/arduino-installer/git/raw/master/1.8.7/arduino-1.8.7-macosx.zip)

  [网盘下载](https://pan.baidu.com/s/1MnqSQWi0Fjfdil1GZT64FQ)
<!--more-->
准备工作完成后打开arduinoIDE：
      **选择我们对应的开发版**
![](https://i.loli.net/2020/11/14/zoWahrNKlSDg4m9.png)
**接着将的Arduino的版接入电脑找到端口中的对应的COM3**
   
![](https://i.loli.net/2020/11/14/8iy95huQcg4qdjV.png)
**安装求最后安装标准FIRMATA**

![](https://i.loli.net/2020/11/14/vteaFLTIZbnsXOM.png)

这样准备工作就完成了接下来就是开始写的Python的代码了：

    from pyfirmata import Arduino,utilimport time
    board = Arduino('COM3') while 1:
     	board.digital[13].write(0) #向端口13写入0   0代表灭灯
     	time.sleep(1)
     	board.digital[13].write(1) #向端口13写入1   1代表亮灯
     	time.sleep(1)

   运行代码就会看到Arduino的13号脚LED灯间隔一秒一闪一闪了！

大功告成

