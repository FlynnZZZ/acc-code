概念
  'RDMBSs'关系数据库管理系统 
    关系型数据库遵循ACID规则,有如下四个特性:
    A,Atomicity   原子性
      即事务里的所有操作要么全部做完,要么都不做,事务成功的条件是事务里的所有操作都成功,
      只要有一个操作失败,整个事务就失败,需要回滚 ,
    C,Consistency 一致性
      数据库要一直处于一致的状态,事务的运行不会改变数据库原本的一致性约束 ,
      例如现有完整性约束a+b=10,如果一个事务改变了a,那么必须得改变b,
      使得事务结束后依然满足a+b=10,否则事务失败 ,
    I,Isolation   独立性
      所谓的独立性是指并发的事务之间不会互相影响,
      如果一个事务要访问的数据正在被另外一个事务修改,只要另外一个事务未提交,
      它所访问的数据就不受未提交事务的影响 ,
    D,Durability  持久性
      持久性是指一旦事务提交后,它所做的修改将会永久的保存在数据库上,即使出现宕机也不会丢失 ,
  'distributed system',分布式系统
    PS:由多台计算机和通信的软件组件通过计算机网络连接[本地网络或广域网]组成 
      分布式系统是建立在网络之上的软件系统 ,
      正是因为软件的特性,所以分布式系统具有高度的内聚性和透明性 ,
      因此,网络和分布式系统之间的区别更多的在于高层软件[特别是操作系统],而不是硬件 ,
      分布式系统可以应用在在不同的平台上如:Pc、工作站、局域网和广域网上等 ,
    分布式计算的优点
      可靠性[容错]:一台服务器的系统崩溃并不影响到其余的服务器 ,
      可扩展性: 在分布式计算系统可以根据需要增加更多的机器 ,
      资源共享: 共享数据是必不可少的应用,如银行,预订系统 ,
      灵活性:  由于该系统是非常灵活的,它很容易安装,实施和调试新的服务 ,
      更快的速度:分布式计算系统可以有多台计算机的计算能力,使得它比其他系统有更快的处理速度 ,
      开放系统: 由于它是开放的系统,本地或者远程都可以访问到该服务 ,
      更高的性能:相较于集中式计算机网络集群可以提供更高的性能[及更好的性价比] ,
    分布式计算的缺点
      故障排除: 故障排除和诊断问题 ,
      软件: 更少的软件支持是分布式计算系统的主要缺点 ,
      网络: 网络基础设施的问题,包括:传输问题,高负载,信息丢失等 ,
      安全性: 开发系统的特性让分布式计算系统存在着数据的安全性和共享的风险等问题 ,
  'NoSQL'非关系型的数据库 
    PS: 数据存储不需要固定的模式,无需多余操作就可以横向扩展
      有时也称作Not Only SQL的缩写,是对不同于传统的关系型数据库的数据库管理系统的统称 
      NoSQL用于超大规模数据的存储 
      NoSQL数据库,本身就是在JSON格式的基础上诞生的,大部分NoSQL数据库允许JavaScript直接操作 
    RDBMS vs NoSQL
      RDBMS 
        高度组织化结构化数据 
        结构化查询语言（SQL） (SQL) 
        数据和关系都存储在单独的表中 , 
        数据操纵语言,数据定义语言 
        严格的一致性
        基础事务
      NoSQL 
        代表着不仅仅是SQL
        没有声明性查询语言
        没有预定义的模式
        键 - 值对存储,列存储,文档存储,图形数据库
        最终一致性,而非ACID属性
        非结构化和不可预知的数据
        CAP定理 
        高性能,高可用性和可伸缩性
    NoSQL数据库分类
      列存储      
        顾名思义,是按列存储数据的 ,
        最大的特点是方便存储结构化和半结构化数据,方便做数据压缩,
        对针对某一列或者某几列的查询有非常大的IO优势 ,
        部分代表: Hbase Cassandra Hypertable
      文档存储    
        文档存储一般用类似json的格式存储,存储的内容是文档型的 ,
        这样也就有有机会对某些字段建立索引,实现关系数据库的某些功能 ,
        部分代表: MongoDB CouchDB
      key-value存储 
        可以通过key快速查询到其value ,一般来说,存储不管value的格式,照单全收 ,（Redis包含了其他功能）
        部分代表: Tokyo Cabinet / Tyrant Berkeley DB MemcacheDB Redis
      图存储
        图形关系的最佳存储 ,使用传统关系数据库来解决的话性能低下,而且设计使用不方便 ,
        部分代表: Neo4J FlockDB
      对象存储
        通过类似面向对象语言的语法操作数据库,通过对象的方式存取数据 ,
        部分代表: db4o Versant
      xml数据库
        高效的存储XML数据,并支持XML的内部查询语法,比如XQuery,Xpath ,
        部分代表: Berkeley DB XML BaseX
  'CAP theorem'CAP定理  
    计算机科学中,CAP定理,又被称作 布鲁尔定理,
    它指出对于一个分布式计算系统来说,不可能同时满足以下三点:
    Consistency,一致性: 所有节点在同一时间具有相同的数据
    Availability,可用性: 保证每个请求不管成功或者失败都有响应
    Partition_tolerance,分隔容忍: 系统中任意信息的丢失或失败不会影响系统的继续运作
    CAP理论的核心是:
     一个分布式系统不可能同时很好的满足一致性,可用性和分区容错性这三个需求,最多只能同时较好的满足两个 ,
    因此,根据 CAP 原理将 NoSQL 数据库分成了满足 CA 原则、满足 CP 原则和满足 AP 原则三 大类:
    CA - 单点集群,满足一致性,可用性的系统,通常在可扩展性上不太强大 ,
    CP - 满足一致性,分区容忍性的系统,通常性能不是特别高 ,
    AP - 满足可用性,分区容忍性的系统,通常可能对一致性要求低一些 ,
  BASE Basically Available, Soft-state, Eventually Consistent ,
    CAP理论的核心是:一个分布式系统不可能同时很好的满足一致性,可用性和分区容错性这三个需求,
    最多只能同时较好的满足两个 ,
    BASE是NoSQL数据库通常对可用性及一致性的弱要求原则:
      Basically Availble --基本可用
      Soft-state --软状态/柔性事务 , "Soft state" 可以理解为"无连接"的, 而 "Hard state" 是"面向连接"的
      Eventual Consistency --最终一致性 最终一致性, 也是是 ACID 的最终目的 ,
数据库分类: 
  Sql数据库: 支持sql语言的数据库 
  NoSql数据库: 一般不支持sql语言 
MongoDB: 基于分布式文件存储的数据库 
  PS: 由C++编写,旨在为WEB应用提供可扩展的高性能数据存储方案 
    介于关系数据库和非关系数据库之间,是非关系数据库当中功能最丰富,最像关系数据库的 
  特点: 
    无数据结构限制: 没有表结构的概念,每条记录可以有不同的结构,无需先定义表结构再使用 
    完全的索引支持: 单键索引,多键索引,数组索引,全文索引,地理位置索引等 
    方便的冗余与扩展   
  MongoDB相关概念 
    'document'文档: MongoDB的一条记录,一个包含多个字段的数据结构,类似于JSON格式 
      同一集合内的文档不需要具有同样的字段或结构 
      每个文档必须有一个'_id'字段作为主键 
    'collection'集合: 一组MongoDB文档,相当关系型数据库'RDBMS'中的表 
    数据库: 集合的实际容器,一个MongoDB服务器通常有多个数据库 
相关命令 
  ◆安装及启动数据库 
  先安装MongoDB,然后配置PATH环境变量 
  创建结构目录 
    project
      data   // 存放数据库  
        db   // 存放数据 
      log    // 日志
      conf   // 配置文件 
  $ mongod --dbpath ./data/db   // 指定数据库目录 
  $ mongo   // 运行数据库 
  ◆数据库操作
  $ show dbs  // 检测数据库列表 
  $ db        // 检查当前选定的数据库 
  $ use <dbName>  // 存在则返回,否则新建数据库 
  $ db.dropDatabase() // 删除当前使用的数据库 
  ◆集合操作 
  $ db.createCollection(<clcName>, <options>)  // 创建集合 
    clcName    str,需创建的集合名称
    options obj,可选的选项  
      capped: bol  默认'false',若为'true',则创建固定集合,即有着固定大小的集合 
        当达到最大值时,会自动覆盖最早的文档,且必须指定'size'参数 
      size: num    为固定集合指定一个最大值,单位byte  
      max: num     指定固定集合中包含文档的最大数量 
      autoIndexID: bol   默认'false',若为'true',自动在'_id'字段创建索引 
  $ show collections  // 查看创建的集合 [?]  
  $ db.<clcName>.drop()  // 删除集合,删除成功返回true,否则返回false  
  ◆文档操作 
  $ db.<docName>.insert(doc) // 在集合中插入文档,若docName集合不存在则会自动创建  
  $ db.<docName>.save(doc)   // 类似于'insert',但指定'_id'时,会覆盖文档 
  $ db.<docName>.find()      // 以非结构化的方式显示所有文档 
    'AND'条件: 传入多个键,用逗号','分隔 
      db.mycol.find({key1:val1, key2:val2}) 
    'OR'条件: 使用关键字'$or' 
      db.mycol.find(
        {
          $or: [
            {key1: value1}, {key2:value2}
          ]
        }
      )
  $ db.<docName>.find().pretty()   // 用格式化方式显示结果 
  $ db.<docName>.findOne()   // 只返回一个文档 
  基于一些条件来查询文档: 
    操作          格式                     RDBMS中的类似语句
    =         {<key>:<value>}             where by = 'tutorials point'
      db.mycol.find({"by":"tutorials point"}).pretty()  
    <         {<key>:{$lt:<value>}}       where likes < 50
      db.mycol.find({"likes":{$lt:50}}).pretty()  
    <=        {<key>:{$lte:<value>}}      where likes <= 50
      db.mycol.find({"likes":{$lte:50}}).pretty()  
    >         {<key>:{$gt:<value>}}       where likes > 50
      db.mycol.find({"likes":{$gt:50}}).pretty()  
    >=        {<key>:{$gte:<value>}}      where likes >= 50
      db.mycol.find({"likes":{$gte:50}}).pretty()  
    !         {<key>:{$ne:<value>}}       where likes != 50
    db.mycol.find({"likes":{$ne:50}}).pretty()  
MongoDB支持的数据类型: 
  String：字符串,在MongoDB中,'UTF-8'编码的字符串才是合法的 
  Integer：整型数值,根据所采用的服务器可分为 32 位或 64 位 
  Boolean：布尔值  
  Double：双精度浮点值 
  Arrays：用于将数组或列表或多个值存储为一个键 
  Timestamp：时间戳,记录文档修改或添加的具体时间 
  Object：用于内嵌文档 
  Null：用于创建空值 
  Symbol：符号,该数据类型基本上等同于字符串类型,但不同的是,它一般用于采用特殊符号类型的语言 
  Date：日期时间,用'UNIX'时间格式来存储当前日期或时间,可指定自己的日期时间：创建Date对象,传入年月日信息 
  Object ID：对象ID,用于创建文档的ID
  Binary Data：二进制数据 ,用于存储二进制数据 
  Code：代码类型,用于在文档中存储JS代码 
  Regular expression：正则表达式类型,用于存储正则表达式 
  Min/Max keys：将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比  








