---
title: struts2入门例子登录demo
categories:
  - Java
tags:
  - struts2
abbrlink: e6d89b39
date: 2020-11-22 19:10:37
cover: https://i.loli.net/2020/11/22/rqx3tEAFLCNGzR9.png
---

1.下载所需的jar包
下载地址：https://struts.apache.org/download.cgi#struts25101
![](https://i.loli.net/2020/11/22/GFVYjInhaiRHocf.jpg)

下载完后解压，在lid文件夹里面找以下这几个jar包，基本功能就只需要这些:
![](https://i.loli.net/2020/11/22/znC1gIx3QtNGqy8.jpg)

复制这些jar包到你新建的web项目WebContent/WEB-INF/lib下

右击你的web项目如图：
![](https://i.loli.net/2020/11/22/zoieM8CPXKyWxhR.jpg)

在WEB-INF/lib目录下有你刚才复制过来的jar包

全部选中点击OK，jar就全部导入进来了


接下来就开始下代码了

配置web.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" id="WebApp_ID" version="3.0">
    <welcome-file-list> 
    <welcome-file>index.jsp</welcome-file> 
  </welcome-file-list>
  <filter> 
    <filter-name>struts2</filter-name> 
    <filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class> 
  </filter> 
  <filter-mapping> 
    <filter-name>struts2</filter-name> 
    <url-pattern>/*</url-pattern> 
  </filter-mapping>
 
</web-app>
```

写DemoLog.java

```
package com.strtus2.action;
 
import com.opensymphony.xwork2.Action;
 
public class DemoLog implements Action {
   private String uname;
   private String upass;
	@Override
	public String execute() throws Exception {
		System.out.println("姓名："+uname);
		System.out.println("密码："+upass);
		if(uname.equals("ykp")&&upass.equals("123")){
			
			return SUCCESS;
		}
		return "error";
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUpass() {
		return upass;
	}
	public void setUpass(String upass) {
		this.upass = upass;
	}
 
}
```

struts.xml
```
<?xml version="1.0" encoding="UTF-8" ?> 
<!DOCTYPE struts PUBLIC "-//Apache Software Foundation//DTD Struts Configuration 2.0//EN" "http://struts.apache.org/dtds/struts-2.0.dtd" >
<struts>
	<package name="default" namespace="/" extends="struts-default">
		<action name="login" class="com.strtus2.action.DemoLog">
			<result name="success">/Helloworld.jsp</result>
			<result name="error">/error.jsp</result>
		</action>
	</package>
</struts>
```

三个jsp文件
error.jsp

```
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
<h1>登陆出错</h1>
</body>
</html>
```

Helloword.jsp

```
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
 
<h1>Hello Strtus2！！！！你好</h1>
</body>
</html>
```


index.jsp
```
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
<form action="login"> 
      用户名:<input type="text" name="uname"><br> 
      密 码:<input type="text" name="upass"><br> 
      <input type="submit" value="登陆" /> 
    </form> 
</body>
</html>
```
现在基本完成了 可以运行了!