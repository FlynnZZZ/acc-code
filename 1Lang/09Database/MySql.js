MySQL: 一种关联数据库管理系统 
  关系型数据库: 所有数据都存储在不同的表中,表之间的关系是建立在主键或其他键[外键]的基础之上的 
  描述: 
    多平台支持,包括 Windows、Linux、UNIX、 Mac OS 等 
    采用了GPL协议,可修改源码来开发自己的MySql系统,[有付费和免费版] 
    支持5000万条记录的数据仓库,
    32 位系统表文件最大可支持4GB,64 位系统支持最大的表文件为8TB 
    关联数据库将数据保存在不同的表中,使用标准的SQL数据语言形式;
  相关概念 
    'header'表头: 每一列的名称;
    'row'列: 具有相同数据类型的数据的集合;
    'col'行: 每一行用来描述某个人/物的具体信息;
    'value'值: 行的具体信息,每个值必须与该列的数据类型相同;
    'key'键: 表中用来识别某个特定的人\物的方法,键的值在当前列中具有唯一性。
安装使用 
  server端: 数据存放 
    安装: 
  client端: 
    Navicate-管理工具 
    NodeJS-程序中使用  
      $ npm i -S mysql // 安装MySql模块,用于连接到服务端请求数据 
      const mysql = require('mysql')
      var db = mysql.createConnection({ // 连接到MySql服务器 
        host: 'localhost'    // 需连接的MySql主机 
        ,port: 3306          // 端口,默认: 3306 
        ,user: 'root'        // 用户名
        ,password: '111111'  // 密码 
        ,database: 'dtdemo1' // 连接到指定的数据库 
      })  
      db.query(KW,fn)     // 查询 
        KW      具体的操作,SQL语句  
        function(err,data){ }  回调函数 
          JSON.stringify(data) 直接将数据JSON化 
        Example: 
          db.query("SELECT * FROM `user_tb`;",function(err,data){
            if (err) {
              
            }
            else {
              console.log(data);
              console.log(JSON.stringify(data));
            }
          })     
数据类型 
  1、整型
  tinyint(m)    1 个字节  范围(-128~127)
  smallint(m)   2 个字节  范围(-32768~32767)
  mediumint(m)  3 个字节  范围(-8388608~8388607)
  int(m)        4 个字节  范围(-2147483648~2147483647)
  bigint(m)     8 个字节  范围(+-9.22*10^18 )
  取值范围如果加了unsigned,则最大值翻倍,
    如 tinyint unsigned 的取值范围为(0~256)  
  2、浮点型(float和double)
  float(m,d)  单精度浮点型    8 位精度(4 字节)     m总个数,d小数位
  double(m,d) 双精度浮点型    16 位精度(8 字节)    m总个数,d小数位
  3、定点数 
    浮点型在数据库中存放的是近似值,而定点类型在数据库中存放的是精确值。 
  decimal(m,d)  m<65 总个数,d<30 且 d<m 小数位 
  4、字符串(char,varchar,_text)
  char(n)    固定长度,最多255个字符
  varchar(n) 固定长度,最多65535个字符
  tinytext   可变长度,最多255个字符
  text       可变长度,最多65535个字符
  mediumtext 可变长度,最多 2^24-1 个字符 
  longtext   可变长度,最多 2^32-1 个字符 
  char 和 varchar 
    char(n) 若存入字符数小于n,则以空格补于其后,查询之时再将空格去掉。
    所以char类型存储的字符串末尾不能有空格,varchar不限于此。 
    char(n) 固定长度,char(4)不管是存入几个字符,都将占用4个字节,
    varchar是存入的实际字符数+1 个字节（n<=255）或 2 个字节(n>255),
    所以varchar(4),存入3个字符将占用4个字节。 
    char类型的字符串检索速度要比varchar类型的快。
  varchar 和 text  
    text是实际字符数+2 个字节 
    text类型不能有默认值 
    varchar可直接创建索引,text创建索引要指定前多少个字符。
    varchar查询速度快于text,在都创建索引的情况下,text的索引似乎不起作用。
  5、二进制数据(_Blob)
  _BLOB和_text存储方式不同,_TEXT以文本方式存储,英文存储区分大小写,而_Blob是以二进制方式存储,不分大小写。 
  _BLOB存储的数据只能整体读出。 
  _TEXT可以指定字符集,_BLO不用指定字符集。
  6、日期时间类型
  date        日期 '2008-12-2'
  time        时间 '12:25:36'
  datetime    日期时间 '2008-12-2 22:06:44'
  timestamp   自动存储记录修改时间
  若定义一个字段为timestamp,这个字段里的时间数据会随其他字段修改的时候自动刷新,
  所以这个数据类型的字段可以存放这条记录最后被修改的时间。
  7、数据类型的属性
  NULL           数据列可包含NULL值
  NOT NULL       数据列不允许包含NULL值
  DEFAULT        默认值
  PRIMARY KEY    主键
  AUTO_INCREMENT 自动递增,适用于整数类型
  UNSIGNED       无符号
  CHARACTER SET  name 指定一个字符集
使用MySQL数据库 
  登录到 MySQL  
    当 MySQL 服务已经运行时,我们可以通过MySQL自带的客户端工具登录到MySQL数据库中
    $ mysql -h 主机名 -u 用户名 -p
      h: 该命令用于指定客户端所要登录的MySQL主机名,登录当前机器该参数可以省略;
      u: 所要登录的用户名;
      p: 告诉服务器将会使用一个密码来登录,如果所要登录的用户名密码为空,可以忽略此选项。 
    Example: 
      以登录刚刚安装在本机的MySQL数据库为例,
      在命令行下输入 mysql -u root -p 按回车确认,
      如果安装正确且MySQL正在运行,会得到以下响应:
      Enter password:
  
      若密码存在,输入密码登录,不存在则直接按回车登录,
      按照本文中的安装方法,默认 root 账号是无密码的。
      登录成功后你将会看到 Welecome to the MySQL monitor... 的提示语。
      然后命令提示符会一直以 mysql> 加一个闪烁的光标等待命令的输入,输入 exit 或 quit 退出登录。
  创建一个数据库 
    $ create database <数据库名> [其他选项];
  选择所要操作的数据库 
    要对一个数据库进行操作, 必须先选择该数据库, 否则会提示错误:
    两种方式对数据库进行使用的选择:
    一: 在登录数据库时指定, 命令: mysql -D 所选择的数据库名 -h 主机名 -u 用户名 -p
      例如登录时选择刚刚创建的数据库: mysql -D samp_db -u root -p
    二: 在登录后使用 use 语句指定, 命令:use 数据库名;
      use 语句可以不加分号, 执行 use samp_db 来选择刚刚创建的数据库, 
      选择成功后会提示: Database changed
  创建数据库表 
    create table 表名称(列声明);
    Example:  
      create table students （
        id int unsigned not null auto_increment primary key,
        name char(8) not null,
        sex char(4) not null,
        age tinyint unsigned not null,
        tel char(13) null default "-"
      );
  操作 MySQL 数据库
    向表中插入数据 
      insert [into] 表名 [(列名1, 列名2, 列名3, ...)] values (值1, 值2, 值3, ...);
    查询表中的数据 
      select 列名称 from 表名称 [查询条件];
      按特定条件查询
      where 关键词用于指定查询条件, 用法形式为: select 列名称 from 表名称 where 条件;
      
      where 子句不仅仅支持 "where 列名 = 值" 这种名等于值的查询形式, 
      对一般的比较运算的运算符都是支持的, 
      例如 =、>、<、>=、<、!= 以及一些扩展运算符 is [not] null、in、like 等等。 
      还可以对查询条件使用 or 和 and 进行组合查询
    更新表中的数据 
      update 表名称 set 列名称=新值 where 更新条件;
    删除表中的数据 
      delete from 表名称 where 删除条件;
表的修改 
  添加列 
    alter table 表名 add 列名 列数据类型 [after 插入位置];
  修改列 
    alter table 表名 change 列名称 列新名称 新数据类型;
  删除列 
    alter table 表名 drop 列名称;
  重命名表
    alter table 表名 rename 新表名;
  删除整张表
    drop table 表名;
  删除整个数据库
    drop database 数据库名;























