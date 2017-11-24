基础理论  
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
  BASE'Basically Available','Soft-state','Eventually Consistent' ,
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
相关概念 
  SQL_term      MongoDB_term  解释/说明 
  database      database      数据库,集合的实际容器 
    MongoDB的单个实例可容纳多个独立的数据库,
      每一个都有自己的集合和权限,不同的数据库也放置在不同的文件中
    数据库命名规范 
      数据库也是通过名字来标识
      ★数据库名可以是满足以下条件的任意'UTF-8'字符串:
      应全部小写,最多64字节 
      不能是空字符串"",不可含有空格' '、'.'、'$'、'/'、\和'\0'空字符 
    特殊作用的数据库: 可直接访问 
      admin: "root"数据库 
        若将一个用户添加到这个数据库,该用户自动继承所有数据库的权限.
        一些特定的服务器端命令也只能从这个数据库运行,
        比如列出所有的数据库或者关闭服务器.
      local: 这个数据永远不会被复制,可以用来存储限于本地单台服务器的任意集合 
      config: 当Mongo用于分片设置时,config数据库在内部使用,用于保存分片的相关信息 
      test: 默认的数据库 
  table         collection    表/集合,一组MongoDB文档  
    集合没有固定的结构
      即集合可插入不同格式和类型的数据
      但通常插入集合的数据都会有一定的关联性 
      Example: 
        将以下不同数据结构的文档插入到集合中：
        {"site":"www.baidu.com"}
        {"site":"www.google.com","name":"Google"}
        {"site":"www.runoob.com","name":"菜鸟教程","num":5}
    当第一个文档插入时,集合就会被创建 
    集合命名规范:   
      不能是空字符串""、'$' 
      不能含有'\0'空字符,该字符表示集合名的结尾 
      集合名不能以"system."开头,系统集合保留的前缀 
    'capped collections'固定大小的collection 
      有很高的性能以及队列过期的特性[过期按照插入的顺序],和"RRD"概念类似 
        高性能自动的维护对象的插入顺序,非常适合类似记录日志的功能 
      必须要显式的创建 
        指定一个collection的大小,单位是字节,
        collection的数据存储空间值提前分配的,
        要注意的是指定的存储大小包含了数据库的头信息 
        db.createCollection("mycoll", {capped:true, size:100000})
        在capped collection中,你能添加新的对象。
        能进行更新,然而,对象不会增加存储空间。如果增加,更新就会失败  
        数据库不允许进行删除。使用drop()方法删除collection所有的行 
        注意: 删除之后,你必须显式的重新创建这个collection 
        在32bit机器中,capped collection最大存储为1e9个字节 
  row           document      记录行/文档,MongoDB的一条记录  
    一组键值对'key-val'集,类似于JSON格式 
      文档中的键/值对是有序的 
      MongoDB的文档不能有重复的键 
    与关系型数据库的区别 
      MongoDB的文档不需要设置相同的字段,
      且相同的字段不需要相同的数据类型,
      每个文档必须有一个'_id'字段作为主键  
    文档键命名规范:  
      不能含有'\0'空字符,该字符用来表示键的结尾 
      '.'和'$'有特别的意义,只有在特定环境下才能使用 
      以下划线"_"开头的键是保留的,约定而非严格要求 
    Example: 
      一个简单的文档：
      {
        "site":"www.runoob.com", 
        "name":"菜鸟教程"
      }
  column        field         字段/域,文档的一个'key-val'键值对  
    字段值可包含其他文档、数组及文档数组  
  index         index         索引 
  table joins                 表连接,MongoDB不支持 
  primary key   primary key   主键,MongoDB自动将_id字段设置为主键 
  ★元数据 
    数据库的信息集 
      使用了系统的命名空间,是包含多种系统信息的特殊集合,格式: <dbname>.system.xxx 
      集合命名空间                描述
      dbname.system.namespaces   列出所有名字空间 
      dbname.system.indexes      列出所有索引 
      dbname.system.profile      包含数据库概要'profile'信息 
      dbname.system.users        列出所有可访问数据库的用户 
      dbname.local.sources       包含复制对端'slave'的服务器信息和状态 
      对于修改系统集合中的对象的限制 
        在{{system.indexes}}插入数据,可以创建索引 
        但除此之外该表信息是不可变的(特殊的drop index命令将自动更新相关信息) 
        {{system.users}}是可修改的  
        {{system.profile}}是可删除的 
  ★支持的数据类型: 
    Boolean      布尔值  
    Integer      整型数值,根据使用服务器可分为 32/64 位 
    Double       双精度浮点值 
    Timestamp    时间戳,记录文档修改或添加的具体时间 
    String       字符串,在MongoDB中,'UTF-8'编码的字符串才是合法的 
    Null         用于创建空值 
    Arrays       用于将数组或列表或多个值存储为一个键 
    Object       用于内嵌文档 
    Object ID    对象ID,用于创建文档的ID
    Date         日期时间,用'UNIX'时间格式来存储当前日期或时间,
      可指定自己的日期时间：创建Date对象,传入年月日信息 
    Symbol       符号,该数据类型基本上等同于字符串类型,但不同的是,它一般用于采用特殊符号类型的语言 
    Binary Data  二进制数据 ,用于存储二进制数据 
    Code         代码类型,用于在文档中存储JS代码 
    Regular expression   正则表达式类型,用于存储正则表达式 
    Min/Max keys  将一个值与BSON[二进制的JSON]元素的最低值和最高值相对比  
  ★其他术语: 
    BSON: 是一种类json的一种二进制形式的存储格式,简称'Binary JSON'
安装&使用&启动: 
  下载安装包进行安装[位置可自定义],将 bin 目录,配置到环境变量中  
  项目目录结构 
    db_project
      data   // 存放数据库  
        db   // 存放数据 
      log    // 日志 
      conf   // 配置文件 
        mongod.cfg 
  $ mongod --dbpath e:\db_project\data\db     // 指定数据库目录 
  $ mongo   // 连接到数据库 
'mongod.cfg'配置文件 
  $ mongod --config  'C:/mongodb/mongod.cfg'  // 通过配置文件,指定数据库目录  
  内容详情: 
    systemLog:  // 必须项 
      destination: file
      path: c:\data\log\mongod.log
    // 其他可选项 
    storage: 
      dbPath: c:\data\db
◆相关命令 
★数据库'db'操作 
  $ show dbs  // 以列表形式显示所有数据库 
  $ db        // 显示当前数据库对象或集合 
  $ use <dbName>  // 使用或创建数据库 
    存在则切换到该数据库,否则新建数据库 
  $ db.<dbName>.insert({"name":"菜鸟教程"})
  $ db.dropDatabase() // 删除当前使用的数据库  
  $ db.createCollection(<ctName>,<options>)  // 创建集合 
    ctName    str,需创建的集合名称
    options obj,可选的选项  
      capped: bol  默认'false',若为'true',则创建固定集合,即有着固定大小的集合 
        当达到最大值时,会自动覆盖最早的文档,且必须指定'size'参数 
      size: num    为固定集合指定一个最大值,单位byte  
      max: num     指定固定集合中包含文档的最大数量 
      autoIndexID: bol   默认'false',若为'true',自动在'_id'字段创建索引 
★集合'ct'操作 
  $ db.<ctName>.insert(<dc>)   // 向指定集合中插入文档 
    PS: 若该集合不存在,则创建后插入 
  $ db.<ctName>.save(<newDc>[options])  // 插入/替换文档 
    PS: 未指定'_id'字段,同 insert(),指定'_id'字段,则会更新该'_id'的数据 
    newDc  插入/更新的文档 
    option = {  // 可选,配置对象 
      writeConcern: <dc>  // 可选,抛出异常的级别 
    }
  $ db.<ctName>.find(<query>,projection)  // 以非结构化的方式显示文档 
    query  可选,查询条件,默认:{},所有文档 
    projection  可选,使用投影操作符指定返回的键,默认省略 
  $ db.<ctName>.findOne()  // 只返回一个文档 
  $ db.<ctName>.find().pretty()   // 用格式化方式显示结果 
  $ db.<ctName>.findOne()   // 只返回一个文档 
  $ db.<ctName>.update(<query>,{$xxx:<newDc>}[,option]) // 更新已存在的文档  
    query  update的查询条件,类似sql update查询内where后面的 
    $xxx   更新的操作符,如:$set、$inc 
    newDc  update的对象,也可以理解为sql update查询内set后面的
    option = { // 可选,配置项 
      upsert: bol, // 可选,当不存在update的记录,是否插入,默认:false,不插入 
      multi: bol,  // 是否更新查出的全部记录,默认:false,只更新第一条记录 
      writeConcern: <dc> // 可选,抛出异常的级别 
    }  
    Example: 
      db.mycol.update(
        {'title':'MongoDB Overview'}
        ,{$set:{'title':'New MongoDB Tutorial'}}
      )
  $ db.<ctName>.remove(<query>[,option])  // 删除指定条件的文档 
    query  可选,删除文档的标准,默认:{},将集合中的所有文档删除  
    option  = { // 可选,如果设为 true 或 1,则只删除一个文档 
      justOne: bol, // 可选,是否只删除一个文档,默认false
        只删除一个文档可为 true 或 1 
      writeConcern: <dc>  // 可选,抛出异常的级别 
    }  
  $ db.<ctName>.drop()  // 删除指定集合,返回是否删除成功的布尔值   
★文档'dc'操作 
  ▼单个文档操作 
  ▼多个文档操作 
  $ <dcs>.limit(<num>)  // 限制显示的文档数量 
    num  数值,当num不存在将显示所有文档 
  $ <dcs>.skip(<num>)   // 跳过num个文档 
    num 可选,默认:0,不跳过 
  $ <dcs>.sort({<key>:1/-1,..})  // 通过指定字段来排序,1:升序、-1:降序 
    PS: 默认按照升序排序 
    // 按照降序排列标题的文档 
    db.mycol.find({},{"title":1,_id:0}).sort({"title":-1})
◆索引,实现高效查询 
  PS: 无索引时,读取数据则需扫描集合中的所有文档,才能找到匹配查询语句的文档;
    索引是一种特殊的数据结构,存储在一个易于遍历读取的数据集合中    
    索引能够存储某种特殊字段或字段集的值,并按照指定的方式将字段值进行排序  
  $ db.<ctName>.ensureIndex(  // 创建索引  
    { 
      PS: 可使用多个字段创建索引[关系型数据库中称作复合索引]
      <key>: 1/-1 
      key  创建索引的字段名称
      1 代表按升序排列字段值;-1 代表按降序排列
    }
    ,{  // 可选,配置选项
      background: bol  // 可选,是否后台创建,默认:false  
        建索引过程会阻塞其它数据库操作,background可指定以后台方式创建索引,即增加 "background" 可选参数。 "background" 默认值为false。
      ,unique Boolean 建立的索引是否唯一。指定为true创建唯一索引。默认值为false.
      name string 索引的名称。如果未指定,MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。
      dropDups Boolean 在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 false.
      sparse Boolean 对文档中不存在的字段数据不启用索引；这个参数需要特别注意,如果设置为true的话,在索引字段中不会查询出不包含对应字段的文档.。默认值为 false.
      expireAfterSeconds integer 指定一个以秒为单位的数值,完成 TTL设定,设定集合的生存时间。
      v index version 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。
      weights document 索引权重值,数值在 1 到 99,999 之间,表示该索引相对于其他索引字段的得分权重。
      default_language string 对于文本索引,该参数决定了停用词及词干和词器的规则的列表。 默认为英语
      language_override string 对于文本索引,该参数指定了包含在文档中的字段名,语言覆盖默认的language,默认值为 language.
    }
  )  
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
  $ db.<ctName>.aggregate(options)  
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
  ★复制: 在多个服务器上同步数据的过程 
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
  ★分片: 在多台机器上存储数据记录的操作
    为应对数据增长需求而采取的办法 
    当数据量增长时,单台机器有可能无法存储数据或可接受的读取写入吞吐量,通过横向扩展,分片技术解决该问题 
    利用分片技术,可以添加更多的机器来应对数据量增加以及读写操作的要求 
创建备份:将服务器上的所有数据都转储到dump目录中 
  $ mongodump     // 备份 
  $ mongorestore  // 恢复备份 
  ★其他
  $ mongostat  检查所有运行中的mongod实例的状态 
  $ mongotop [<time>]  记录并报告MongoDB实例基于每个集合的读写活动,默认每秒返回一次结果 
    mongotop 30  // 每 30 秒返回 
<query>条件语句查询规则：
  ★条件操作符 
  操作             格式                    RDBMS中的类似语句 
  ='equal'        {<key>:<value>}         where by = '菜鸟教程' 
    db.col.find({"by":"菜鸟教程"}).pretty()  
  !='not equal'   {<key>:{$ne:<value>}}   where likes != 50 
    db.col.find({"likes":{$ne:50}}).pretty()  
  <'less than'    {<key>:{$lt:<value>}}   where likes < 50 
    db.col.find({"likes":{$lt:50}}).pretty()  
  <='lt equal'    {<key>:{$lte:<value>}}  where likes <= 50 
    db.col.find({"likes":{$lte:50}}).pretty()  
  >'greater than' {<key>:{$gt:<value>}}   where likes > 50 
    db.col.find({"likes":{$gt:50}}).pretty()  
  >='gt equal'    {<key>:{$gte:<value>}}  where likes >= 50 
    db.col.find({"likes":{$gte:50}}).pretty()  
  $type,条件操作符,基于BSON类型来检索集合中匹配的数据类型 
    类型                     数字      备注
    Double                   1   
    String                   2   
    Object                   3   
    Array                    4   
    Binary data              5   
    Undefined                6        已废弃 
    Object id                7   
    Boolean                  8   
    Date                     9   
    Null                     10   
    Regular Expression       11   
    JavaScript               13   
    Symbol                   14   
    JavaScript(with scope)   15   
    32-bit integer           16   
    Timestamp                17   
    64-bit integer           18   
    Min key                  255  Query with -1.
    Max key                  127   
    Example: 
      获取"col"集合中'title'为 String 的数据 
      db.col.find({"title": {$type: 2}})
  操作符组合 
    db.col.find({likes: {$lt: 200, $gt: 100}}) 
  ★条件组合 
  'AND'条件: 传入多个键,用逗号','分隔 
    db.mycol.find({key1:val1, key2:val2}) 
  'OR'条件: 使用关键字'$or' 
    db.mycol.find(
      {
        $or: [
          {key1: value1}
          ,{key2:value2}
        ]
      }
    )



