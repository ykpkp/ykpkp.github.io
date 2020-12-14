---
title: 8X8的 LED灯显示 各种形状
categories:
  - 硬件
tags:
  - Arduino
abbrlink: de2bfe18
date: 2019-05-19 20:44:10
cover: https://i.loli.net/2020/11/14/iKT4NjaoAemtghc.png
---

**接线图：**

![](https://i.loli.net/2020/11/14/MhuB2WEN6jpfceq.png)
<!--more-->
**形状图：**
![](https://i.loli.net/2020/11/14/yQqgfdAr4C5OMbZ.png)


代码：

    int R[] = {2,3,4,5,A3,A2,A1,A0};      //行  数组，记录接口int C[] = {6,7,8,9,10,11,12,13};      //列  数组，记录接口int led[8][8] = {//实心心形，1处是亮灯的led
      {0, 0, 0, 0, 0, 0, 0, 0},
      {0, 1, 1, 0, 0, 1, 1, 0},
      {1, 1, 1, 1, 1, 1, 1, 1},
      {1, 1, 1, 1, 1, 1, 1, 1},
      {1, 1, 1, 1, 1, 1, 1, 1},
      {0, 1, 1, 1, 1, 1, 1, 0},
      {0, 0, 1, 1, 1, 1, 0, 0},
      {0, 0, 0, 1, 1, 0, 0, 0}
    };
    int led3[8][8] = {//字母I，1处是亮灯的led
      {0, 0, 0, 0, 0, 0, 0, 0},
      {0, 0, 0, 1, 1, 0, 0, 0},
      {0, 0, 0, 1, 1, 0, 0, 0},
      {0, 0, 0, 1, 1, 0, 0, 0},
      {0, 0, 0, 1, 1, 0, 0, 0},
      {0, 0, 0, 1, 1, 0, 0, 0},
      {0, 0, 0, 1, 1, 0, 0, 0},
      {0, 0, 0, 0, 0, 0, 0, 0}
    };
    
    int led4[8][8] = {//字母U，1处是亮灯的led
      {0, 0, 0, 0, 0, 0, 0, 0},
      {0, 1, 1, 0, 0, 1, 1, 0},
      {0, 1, 1, 0, 0, 1, 1, 0},
      {0, 1, 1, 0, 0, 1, 1, 0},
      {0, 1, 1, 0, 0, 1, 1, 0},
      {0, 1, 1, 1, 1, 1, 1, 0},
      {0, 0, 1, 1, 1, 1, 0, 0},
      {0, 0, 0, 0, 0, 0, 0, 0}
    };
    
    void setup() {  // put your setup code here, to run once:for(int i = 0;i< 8;i++)
        {
            pinMode(R[i],OUTPUT);
            pinMode(C[i],OUTPUT);
          }  // Serial.begin(9600);}
    
    
    void loop() {  // put your main code here, to run repeatedly://    myDisplay(led);
         for(int i = 0 ; i < 100 ; i++)        //循环显示100次  
          {  
            myDisplay(led3);                   //显示字母“I”  
          }  
          for(int i = 0 ; i < 100 ; i++)         //循环显示100次  
          {     
            myDisplay(led);                 //显示心形
          } 
          for(int i = 0 ; i < 100 ; i++)         //循环显示100次  
          {     
            myDisplay(led4);                 //显示字母“U”
          }  
    }//自定义函数//显示函数  void myDisplay(int Led[8][8])   
    {  
      for(int c = 0; c<8;c++)  
      {  
        digitalWrite(C[c],LOW);//选通第c列  
      
        //循环  
        for(int r = 0;r<8;r++)  
        {  
          digitalWrite(R[r],Led[r][c]);  
        }  
        delay(1);  
        Clear();  //清空显示
      }  
    }  
    
    //清空显示  void Clear()                          
    {  
      for(int i = 0;i<8;i++)  
      {  
        digitalWrite(R[i],LOW);
        digitalWrite(C[i],HIGH);  
      }  
    }

完成！
