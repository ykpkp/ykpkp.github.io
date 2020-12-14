---
title: SpringMVCHelloWorld
categories:
  - Java
tags:
  - Spring
abbrlink: e23bce6
date: 2020-11-22 19:22:34
cover: https://i.loli.net/2020/11/22/giG9mXWb1aqeDdN.jpg
---
下载引入jar包
### 编写HelloContorller.java
```
package com.ykp.springmvc.hello;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
//@Controller 定义这个是借助xml中配置的 <context:component-scan>来识别Controller
@Controller
public class HelloContorller {
	//@RequestMapping:浏览器访问的地址value="/hello"
	@RequestMapping(value="/hello")
	public String hello(ModelMap model){
		//添加值
		model.addAttribute("msg","Hello World SpringMVC");
		//转到对应jsp文件的名
		return "hello";
	}
}
```
web.xml配置文件

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
	id="WebApp_ID" version="3.0">
	<display-name>SpringMVC</display-name>
	<servlet>
		<servlet-name>springmvc</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>springmvc</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
</web-app>
```

Spring配置文件

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:p="http://www.springframework.org/schema/p" xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans-3.2.xsd 
http://www.springframework.org/schema/context 
http://www.springframework.org/schema/context/spring-context-3.2.xsd 
http://www.springframework.org/schema/mvc 
http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd">
	<!-- 自动扫描controller包下的所有类，使其认为spring mvc的控制器 -->
	<context:component-scan base-package="com.ykp.springmvc.hello" />
	<!--
		设置要跳转到的jsp的路径 (只是一个路径，文件名是HelloContorller类return出来的)
		后缀p:suffix
		 前缀p:prefix
	 -->
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"	p:prefix="/WEB-INF/jsp/" p:suffix=".jsp" /></beans>
```

jsp文件

```
<html>
<body>
<h1>Hello SpringMVC</h1>
message:${msg}
</body>
</html>
```

我的目录结构

![](https://i.loli.net/2020/11/22/4fq5xwVTJzrKDGu.jpg)

到此所有配置完成

测试

访问地址：http://localhost:8099/SpringMVC/hello（我的端口号是8099）

![](https://i.loli.net/2020/11/22/DZCL7eifG856FJN.jpg)