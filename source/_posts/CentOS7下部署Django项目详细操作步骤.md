---
title: CentOS7下部署Django项目详细操作步骤
categories:
  - centos7
tags:
  - django
abbrlink: 591bf4a6
date: 2019-05-19 20:44:10
cover: https://i.loli.net/2020/11/14/FiMGIdXArPfpVEy.png
---

### 服务器环境部署详细步骤

详细步骤(下面步骤都是ROOT权限执行):

一、更新系统软件包

    yum update -y

二、安装软件管理包和可能使用的依赖

    yum -y groupinstall "Development tools"
    yum install openssl-devel bzip2-devel expat-devel gdbm-devel readline-devel sqlite-devel psmisc
<!--more-->
三、下载Pyhton3到/usr/local 目录

    cd /usr/local
    wget https://www.python.org/ftp/python/3.6.6/Python-3.6.6.tgz

解压

    tar -zxvf Python-3.6.6.tgz

进入 Python-3.6.6路径

    cd Python-3.6.6

编译安装到指定路径

    ./configure --prefix=/usr/local/python3

注意：/usr/local/python3 路径可以自己指定，自己记着就行，下边要用到。

安装python3

分别输入下面两条命令

    make
    make install

安装完成之后 建立软链接 添加变量 方便在终端中直接使用python3


    ln -s /usr/local/python3/bin/python3.6 /usr/bin/python3

Python3安装完成之后pip3也一块安装完成，不需要再单独安装
同样给pip3建立软链接


    ln -s /usr/local/python3/bin/pip3.6 /usr/bin/pip3

四、查看Python3和pip3安装情况

![](https://i.loli.net/2020/11/14/AKqNQsGImR1VpEn.png)

五、安装virtualenv ，建议大家都安装一个virtualenv，方便不同版本项目管理。


    pip3 install virtualenv

建立软链接


    ln -s /usr/local/python3/bin/virtualenv /usr/bin/virtualenv

安装成功在根目录下建立两个文件夹，主要用于存放env和网站文件的。(文件夹名字，和位置自己随意，记住就好)



    mkdir -p /data/env
    mkdir -p /data/wwwroot

六、切换到/data/env/下，创建指定版本的虚拟环境。


    virtualenv --python=/usr/bin/python3 pyweb

然后进入/data/env/pyweb/bin 
启动虚拟环境：


    source activate
![](https://i.loli.net/2020/11/14/U9dNMgvF4uZGChw.png)

留意我标记的位置，出现(pyweb)，说明是成功进入虚拟环境。

七、虚拟环境里用pip3安装django和uwsgi


    pip3 install django
    pip3 install uwsgi

留意：uwsgi要安装两次，先在系统里安装一次，然后进入对应的虚拟环境安装一次。

给uwsgi建立软链接，方便使用


    ln -s /usr/local/python3/bin/uwsgi /usr/bin/uwsgi

环境差不多了

我们将本地项目部署到服务器上

 1. 备份本地数据库。使用sqlite数据库的话，直接打包数据库文件上传到服务器即可。使用Mysql数据库，要先在本地Mysql里备份导出数据，然后在服务器上安装Mysql数据库软件，Mysql安装具体操作请看：

### CentOS7操作系统下快速安装MySQL5.7
在项目目录下用下面的命令把当前的环境依赖包导出到requirements.txt文件


    pip freeze > requirements.txt

3、把项目源码压缩打包。



4、把项目上传到服务器对应的目录里，解压。



5、创建新的虚拟环境（参照上面第六步）



6、进入虚拟环境然后进入项目路径安装requirements.txt里的依赖包


    pip3 install -r requirements.txt

7、导入数据库到服务器。（如果用的是Mysql的话）

如果是Mysql数据库的，则在命令行里输入：

###  本地导出Mysql
django为你的数据库

    mysqldump -uroot -ppassword django>django.sql

### 在服务器上输入：

    #把django.sql上传到服务器，在服务器里用下面命令导入
    mysql -uroot -ppassword
    use dajngo;
    source your Path\django.sql

8、通过`python3 manage.py runserver` 运行一下项目，如果能正常启动则进行下一步，不能正常运行往上检查。



9、在项目根目录里添加uwsgi配置文件

我们网站项目路径是 `/data/wwwroot/mysite/`,在项目根目录下创建`mysite.xml`文件：

    touch mysite.xml

创建完成后：

打开文件：


    vi mysite.xml

添加下面内容：

    <uwsgi>    
       <socket>127.0.0.1:8997</socket> <!-- 内部端口，自定义 --> 
       <chdir>/data/wwwroot/mysite/</chdir> <!-- 项目路径 -->            
       <module>mysite.wsgi</module>  <!-- mysite为wsgi.py所在目录名--> 
       <processes>4</processes> <!-- 进程数 -->     
       <daemonize>uwsgi.log</daemonize> <!-- 日志文件 -->
    </uwsgi>

保存

注意<module>里的mysite，为wsgi.py所在的目录名。你的wsgi.py在哪个目录你就写那个目录



10、安装nginx和配置nginx.conf文件

进入home目录，执行下面命令：


    cd /home/
    wget http://nginx.org/download/nginx-1.13.7.tar.gz

下载完成后，执行解压命令：


    tar -zxvf nginx-1.13.7.tar.gz

进入解压后的nginx-1.13.7文件夹，依次执行以下命令：


    ./configure
    make
    make install

nginx一般默认安装好的路径为`/usr/local/nginx`
在`/usr/local/nginx/conf`/中先备份一下`nginx.conf`文件，以防意外。


    cp nginx.conf nginx.conf.bak

然后打开`nginx.conf`，把原来的内容删除，直接加入以下内容：



    events {
        worker_connections  1024;
    }http {
        include       mime.types;
        default_type  application/octet-stream;
        sendfile        on;
        server {
            listen 80;
            server_name  www.yangkunpeng.cn; #改为自己的域名，没域名修改为127.0.0.1:80        
            charset utf-8;
            location / {
               include uwsgi_params;
               uwsgi_pass 127.0.0.1:8997;  #端口要和uwsgi里配置的一样           
               uwsgi_param UWSGI_SCRIPT mysite.wsgi;  #wsgi.py所在的目录名+.wsgi           
               uwsgi_param UWSGI_CHDIR /data/wwwroot/mysite/; #项目路径           
            }
            location /static/ {
            alias /data/wwwroot/mysite/static/; #静态资源路径
            }
        }
    }

 要留意备注的地方，要和UWSGI配置文件mysite.xml，还有项目路径对应上。 
进入`/usr/local/nginx/sbin/`目录
执行`./nginx -t`命令先检查配置文件是否有错，没有错就执行以下命令：


    ./nginx

终端没有任何提示就证明nginx启动成功。可以使用你的服务器地址查看，成功之后就会看到一个nginx欢迎页面。



之后，在`settings.py`里设置：

1、关闭DEBUG模式。

    DEBUG = False 

 

2、ALLOWED_HOSTS设置为* 表示任何IP都可以访问网站。

    ALLOWED_HOSTS = ['*']

留意：一定要注意Uwsgi和Nginx配置文件里的项目路径和静态资源路径，填写正确了才能成功访问。不然会出现502错误。还有就是，修改Django文件和其它配置文件之后，一定要重启Uwsgi和Nginx，不然不生效。

Uwsgi和Nginx重启方法：



    #查看Uwsgi进程
    ps -ef|grep uwsgi 
    #用kill方法把uwsgi进程杀死，然后启动
    uwsgikillall -9 uwsgi
    #启动方法
    uwsgi -x mysite.xml
    #Nginx平滑重启方法
    /usr/local/nginx/sbin/nginx -s reload

然后在浏览器里访问服务器地址（域名），就能查看到项目。

部署完成后 admin后台管理样式会失效

##### 关于线上部署admin后台样式没有生效的问题：

#### 方法一：

    1、在settings.py尾部：
    
    STATIC_ROOT  = os.path.join(BASE_DIR, 'static')#指定样式收集目录
    #或
    STATIC_ROOT = '/www/mysite/mysite/static'  #指定样式收集目录
    
    2、收集CSS样式，在终端输入
  
    python manage.py collectstatic
    运行这个命令之后，就会自动把后台CSS样式收集到/static/目录下。刷新页面就能恢复样式！



#### 方法二：

在Python安装目录下（如果使用虚拟环境，则在虚拟环境目录下）找到`\Lib\site-packages\django\contrib\admin\templates`目录，把里面的admin目录复制到指定目录即可。

注意：收集或复制前一定先在settings里配置并指定`STATIC_ROOT`路径，`static/` 个目录可以自己定。指定的时候一定要在`settings.py`和`nginx`里指定新的路径。不然无法生效。




