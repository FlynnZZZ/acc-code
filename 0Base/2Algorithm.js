// 算法
数据结构 
  数据结构就是存储数据的方式
  队列 
  堆栈: 一种数据项按序排列的数据结构,只能在一端[称为'top'栈顶]对数据项进行插入和删除 
    'heap'堆: 一种先进先出[FIFO'first in first out']的数据结构 
    'stack'栈: 一种后进先出[LIFO'Last In First Out']的数据结构  
  链表
    将零散的东西连起来,从而进行有序的操作.
    Example:
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
  复杂度: 对一个操作复杂程度的大致估计 
    ◆时间复杂度: 消耗的时间
    O(1)     常数复杂度,比如读取数组中的某一个元素
    O(logN)  比如二分搜索,常用于有序列表的查找
    O(N)     比如数组的遍历
    O(NlogN) 两个有序列表求交集,使用二分搜索
    O(N^2)   两个列表求交集
    ◆空间复杂度: 占用的内存 
    O(1)     在数组中返回某一个元素
    O(N)     复制一个数组并返回
  15 个经典基础算法 
    Hash
    快速排序
    快递选择SELECT
    BFS/DFS 广度/深度优先遍历 
    红黑树--一种自平衡的二叉查找树 
    KMP 字符串匹配算法
    DP'dynamic programming'动态规划 
    A*寻路算法: 求解最短路径
    Dijkstra:最短路径算法 
    遗传算法
    启发式搜索
    图像特征提取之SIFT算法
    傅立叶变换
    SPFA'shortest path faster algorithm'单元最短路径算法
  算法设计思想 
    迭代法
    穷举搜索法
    递推法
    动态规划
    贪心算法
    回溯
    分治算法
二叉树 


