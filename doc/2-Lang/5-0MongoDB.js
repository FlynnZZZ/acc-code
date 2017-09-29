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
  $ db.<clcName>.insert(doc) // 在集合中插入文档,若clcName集合不存在则会自动创建  
  $ db.<clcName>.save(doc)   // 类似于'insert',但指定'_id'时,会覆盖文档 
  $ db.<clcName>.find()      // 以非结构化的方式显示所有文档 
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
  $ db.<clcName>.find().pretty()   // 用格式化方式显示结果 
  $ db.<clcName>.findOne()   // 只返回一个文档 
  $ db.<clcName>.update(doc,{$set:newDoc}[,options])  // 更新文档 
    db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}})
    // 默认只更新单个文档,要想更新多个文档,需要把参数 multi 设为 true   
    db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}},{multi:true})
  $ db.<clcName>.remove(condition,justOne)  // 删除指定条件的文档 
    condition  可选,删除文档的标准,默认 {} 将集合中的所有文档删除  
    justOne    可选,如果设为 true 或 1,则只删除一个文档 
    // 删除其中所有标题为 'MongoDB Overview' 的文档 
    db.mycol.remove({'title':'MongoDB Overview'}) 
  $ <docs>.limit(<num>)  // 限制文档数量 
    num  数值,当num不存在将显示所有文档 
  $ <docs>.skip(<num>)  // 显示第num+1个文档 
    num 默认为0,显示第一个文档 
  $ <docs>.sort({<key>:1/-1,..})  // 排序,1 正序、-1 倒序 
    // 按照降序排列标题的文档 
    db.mycol.find({},{"title":1,_id:0}).sort({"title":-1})
  ◆索引: 实现高效查询 
    若无索引,则需扫描集合中的所有文档,才能找到匹配查询语句的文档;
    索引是一种特殊的数据结构,将一小块数据集保存为容易遍历的形式   
    索引能够存储某种特殊字段或字段集的值,并按照索引指定的方式将字段值进行排序   
  $ db.<clcName>.ensureIndex({<key>:1/-1})  // 创建索引 
    key  想创建索引的字段名称
    1 代表按升序排列字段值;-1 代表按降序排列
    可选参数: 
    参数  类型  描述
    background  bol,是否在后台构建索引,从而不干扰数据库的其他活动,默认'false' 
    unique  bol,是否创建唯一的索引,从而当索引键匹配了索引中一个已存在值时,集合不接受文档的插入,默认'false'
    name  str,索引名称,若未指定,MongoDB会结合索引字段名称和排序序号,生成一个索引名称   
    dropDups  bol,在可能有重复的字段内创建唯一性索引
      MongoDB 只在某个键第一次出现时进行索引,去除该键后续出现时的所有文档   
    sparse  bol,若为'true',索引只引用带有指定字段的文档,默认'false'
      这些索引占据的空间较小,但在一些情况下的表现也不同（特别是排序）
    expireAfterSeconds  int,单位秒,作为 TTL 来控制 MongoDB 保持集合中文档的时间   
    v  索引版本,索引版本号   默认的索引版本跟创建索引时运行的 MongoDB 版本号有关   
    weights  文档,数值,范围从 1 到 99999   表示就字段相对于其他索引字段的重要性 
    default_language  str,默认'english' 
      对文本索引而言,用于确定停止词列表,以及词干分析器'stemmer'与断词器'tokenizer'的规则 
    language_override  str,默认'language' 
      对文本索引而言,指定了文档所包含的字段名,该语言将覆盖默认语言
  聚合: 能够处理数据记录并返回计算结果
    聚合操作能将多个文档中的值组合起来,对成组数据执行各种操作,返回单一的结果 
  $ db.<clcName>.aggregate(options)  
    // 从集合中归纳出一个列表,以显示每个用户写的教程数量 
    db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}]) 
    聚合表达式列表:    
      $sum      对集合中所有文档的定义值进行加和操作  
        db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])
      $avg      对集合中所有文档的定义值进行平均值  
        db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])
      $min      计算集合中所有文档的对应值中的最小值  
        db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])
      $max      计算集合中所有文档的对应值中的最大值  
        db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])
      $push     将值插入到一个结果文档的数组中  
        db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])
      $addToSet 将值插入到一个结果文档的数组中,但不进行复制  
        db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])
      $first    根据成组方式,从源文档中获取第一个文档,但只有对之前应用过 $sort 管道操作符的结果才有意义  
        db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])
      $last     根据成组方式,从源文档中获取最后一个文档,但只有对之前进行过 $sort 管道操作符的结果才有意义  
        db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])
    聚合架构中的管道操作符： 
      $project 用来选取集合中一些特定字段 
      $match   过滤操作 减少用作下一阶段输入的文档的数量 
      $group   执行真正的聚合操作 
      $sort    对文档进行排序 
      $skip    在一组文档中,跳过指定数量的文档 
      $limit   将查看文档的数目限制为从当前位置处开始的指定数目 
      $unwind  解开使用数组的文档 
        当使用数组时,数据处于预连接状态,通过该操作,数据重新回归为各个单独的文档的状态
        利用该阶段性操作可增加下一阶段性操作的文档数量 
  ◆复制: 在多个服务器上同步数据的过程 
    通过在不同的数据库服务器上实现多个数据副本,复制能够实现数据冗余,提高数据的可用性,
    从而避免了仅仅因为一台服务器故障后就会产生的数据库灾难 
    复制的运作方式 
      使用副本集'replica set'来实现复制操作 
      副本集是一组托管同一数据集的 mongod 对象 
      在副本集中,主节点负责接收写入操作,所有其他的实例[从节点]则通过执行主节点的操作来拥有同样的数据集 
      副本集只有一个主节点,其他全是从节点,任何节点都可能成为主节点  
      所有数据都是从主节点复制到从节点上的 
      副本集具有 2 个或多个节点（但一般最少需要 3 个节点） 
      当发生自动故障转移或维护时,会重新推举一个新的主节点 
      当失败节点恢复后,该节点重新又连接到副本集中,重新作为从节点 
  ◆分片: 在多台机器上存储数据记录的操作
    为应对数据增长需求而采取的办法 
    当数据量增长时,单台机器有可能无法存储数据或可接受的读取写入吞吐量,通过横向扩展,分片技术解决该问题 
    利用分片技术,可以添加更多的机器来应对数据量增加以及读写操作的要求 
  ◆创建备份:将服务器上的所有数据都转储到dump目录中 
  $ mongodump     // 备份 
  $ mongorestore  // 恢复备份 
  ◆其他
  $ mongostat  检查所有运行中的mongod实例的状态 
  $ mongotop [<time>]  记录并报告MongoDB实例基于每个集合的读写活动,默认每秒返回一次结果 
    mongotop 30  // 每 30 秒返回 
  
     
  条件查询文档: 
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








