◆名词解释 
  'scripting_language'脚本语言 
    不具备开发操作系统的能力,只用来编写控制其他大型应用程序的'脚本';
  'Application_Programming_interfaces',API : 应用编程接口 
    API 一些预先定义的函数
      目的是给应用程序与开发人员基于某软件或硬件得以访问一组例程的能力,
      无需访问源码,或理解内部工作机制的细节;
      提供了一组对象,方法和属性,可以用来访问这些技术的所有功能
      API 是对象,拥有属性和方法.
    PS-Self:程序提供的操作它的一些函数、方法等.
      对方定义的一种互相交互信息的方式.
  'host_environment'宿主环境 ：语言在运行时的环境 
    对于JS,宿主环境最常见的是web浏览器,
    浏览器提供了一个JS运行的环境,
    这个环境里面,需要提供一些接口,
    好让JS引擎能够和宿主环境对接.
    但是环境不是唯一的,也就是JS不仅仅能够在浏览器里面跑,
    也能在其他提供了宿主环境的程序里面跑,最常见的就是nodejs.
    同样作为一个宿主环境,nodejs也有自己的JS引擎--V8.
    Node.js 官方的定义:
    Node.js is a platform built on Chrome’s JS runtime for easily building fast, scalable network applications
  'localhost' ：计算机网络中,localhost 意为'本地主机',指'这台计算机' 
    是给loopback回路网络接口的一个标准主机名;
    相对应的IP地址为'127.0.0.1'「IPv4」和'::1'「IPv6」
◆约定常识 
  'file_path'文件路径访问
    /fileName    表示根目录下的文件
    ./filename   表示当前文件夹中的某个文件
    ../filename  表示上一层文件夹中的某个文件
URI&URL&URN 资源标识定位
  'Uniform Resource Identifier'URI : 统一资源标识符 
    一个用于标识某一互联网资源名称的字符串
    该种标识允许用户对任何（包括本地和互联网的）资源通过特定的协议进行交互操作
    URI由包括确定语法和相关协议的方案所定义。
    Web上可用的每种资源(HTML文档、图像、视频片段、程序等)由一个通用资源标识符进行定位
  'Uniform Resource Locator'URL : 统一资源定位符 
    从互联网上得到的资源的位置和访问方法的一种简洁的表示,是互联网上标准资源的地址
    互联网上的每个文件都有一个唯一的URL,它包含的信息指出文件的位置以及浏览器应该怎么处理它
    使用ASCII代码的一部分来表示互联网的地址,
    一般统一资源定位符的开始标志着一个计算机网络所使用的网络协议。
  'Uniform Resource Name'URN : 统一资源名称 
    标识一个实体的标识符
  区别
    URN 与地址无关。
    URL 和 URN 都是 URI 的子集
socket,套接字 
  源IP地址和目的IP地址以及源端口号和目的端口号的组合称为套接字。
  其用于标识客户端请求的服务器和服务。
  它是网络通信过程中端点的抽象表示,包含进行网络通信必需的五种信息：
  连接使用的协议,本地主机的IP地址,本地进程的协议端口,
  远地主机的IP地址,远地进程的协议端口。
二叉树 
数据结构 
  数据结构就是存储数据的方式
  队列
  栈
  链表
    将零散的东西连起来,从而进行有序的操作.
    e.g.
      // 定义零散的东西
      var Node =function(e){
        this.element =e;
        this.next =null
      }
      var n1 =new Node(1);
      var n2 =new Node(2);
      var n3 =new Node(3);
      // 建立关系,连起来
      n1.next = n2;
      n2.next = n3;
      // 将零散东西输出
      var n = n1;
      while(n != null){
        console.log('遍历链表',n.element);
        n = n.next;
      }
  哈希表
    哈希表就是用 字符串 当下标,也就是 JS 中的对象的实现方式
    也是其他语言中的 字典
  树
  集合
  图
    如 点 线 互联 求路线
算法 
  复杂度 :对一个操作复杂程度的大致估计 
    五种常见时间复杂度 : 消耗的时间
    O(1)     常数复杂度,比如读取数组中的某一个元素
    O(logN)  比如二分搜索,常用于有序列表的查找
    O(N)     比如数组的遍历
    O(NlogN) 两个有序列表求交集,使用二分搜索
    O(N^2)   两个列表求交集
    空间复杂度 : 占用的内存
    O(1)     在数组中返回某一个元素
    O(N)     复制一个数组并返回
  15 个经典基础算法 
    Hash
    快速排序
    快递选择SELECT
    BFS/DFS （广度/深度优先遍历）
    红黑树 （一种自平衡的二叉查找树）
    KMP 字符串匹配算法
    DP (动态规划 dynamic programming)
    A*寻路算法： 求解最短路径
    Dijkstra：最短路径算法 
    遗传算法
    启发式搜索
    图像特征提取之SIFT算法
    傅立叶变换
    SPFA(shortest path faster algorithm) 单元最短路径算法
  算法设计思想 
    迭代法
    穷举搜索法
    递推法
    动态规划
    贪心算法
    回溯
    分治算法







