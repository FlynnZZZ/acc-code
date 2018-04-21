MongoDB: 基于分布式文件存储的数据库 
  PS: C++编写,可扩展的高性能数据存储方案,介于关系数据库和非关系数据库之间 
  特点: 
    无数据结构限制: 没有表结构的概念,每条记录可有不同的结构,无需先定义表结构 
    完全的索引支持: 单键索引,多键索引,数组索引,全文索引,地理位置索引等 
    方便的冗余与扩展   
  数据描述术语   
    Mongo        SQL            解释/说明 
    database     database       数据库,集合的实际容器 
      MongoDB的单个实例可容纳多个独立的数据库,
        每一个都有自己的集合和权限,不同的数据库也放置在不同的文件中
      数据库命名规范 
        PS: 数据库也是通过名字来标识
        ★满足以下条件的任意'UTF-8'字符串:
        不能是空字符串"",全部小写 
        不可含有空格' '、点'.'、美元符'$'、斜线'/'、反斜线\和'\0'空字符 
        最多64字节 
      特殊作用的数据库: 可直接访问 
        admin: "root"数据库 
          若将一个用户添加到这个数据库,该用户自动继承所有数据库的权限.
          一些特定的服务器端命令也只能从这个数据库运行,
          比如列出所有的数据库或者关闭服务器.
        local: 这个数据永远不会被复制,可以用来存储限于本地单台服务器的任意集合 
        config: 当Mongo用于分片设置时,config数据库在内部使用,用于保存分片的相关信息 
        test: 默认的数据库 
    collection   table          集合/表,一组MongoDB文档  
      集合无固定结构,可插入不同格式和类型的数据 
        PS: 通常插入集合的数据都会有一定的关联性 
        Example: 
          将以下不同数据结构的文档插入到集合中:
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
          在capped collection中,你能添加新的对象 
          能进行更新,然而,对象不会增加存储空间。如果增加,更新就会失败  
          数据库不允许进行删除。使用drop()方法删除collection所有的行 
          注意: 删除之后,你必须显式的重新创建这个collection 
          在32bit机器中,capped collection最大存储为1e9个字节 
    document     row            文档/记录行,MongoDB的一条记录  
      一组键值对'key-val'集,类似于JSON格式 
        文档中的'key-val'键/值对是有序的 
        文档不能有重复的键 
      与关系型数据库的区别 
        MongoDB的文档不需要设置相同的字段,
        且相同的字段不需要相同的数据类型,
        每个文档必须有一个'_id'字段作为主键  
      文档键命名规范:  
        不能含有'\0'空字符,该字符用来表示键的结尾 
        '.'和'$'有特别的意义,只有在特定环境下才能使用 
        以下划线"_"开头的键是保留的,约定而非严格要求 
      Example: 
        一个简单的文档:
        {
          "site":"www.runoob.com", 
          "name":"菜鸟教程"
        }
    field        column         域/字段,文档的一个'key-val'键值对  
      字段值可包含其他文档、数组及文档数组  
    index        index          索引 
    无           table joins    表连接,MongoDB不支持 
    primary key  primary key    主键,MongoDB自动将'_id'字段设置为主键 
  元数据,数据库的信息集 
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
  支持的数据类型: 
    Boolean,布尔值  
    Integer,整型数值,根据使用服务器可分为 32/64 位 
    Double,双精度浮点值 
    Timestamp,时间戳,记录文档修改或添加的具体时间 
    String,字符串,'UTF-8'编码的字符串才是合法的 
    Null,用于创建空值 
    Arrays,用于将数组或列表或多个值存储为一个键 
    Object,用于内嵌文档 
    Object ID,对象ID,用于创建文档的ID
    Date,日期时间,用'UNIX'时间格式来存储当前日期或时间,
      可指定自己的日期时间:创建Date对象,传入年月日信息 
    Symbol,符号,该数据类型基本上等同于字符串类型,但不同的是,它一般用于采用特殊符号类型的语言 
    'Binary Data',二进制数据 ,用于存储二进制数据 
    Code,代码类型,用于在文档中存储JS代码 
    'Regular expression',正则表达式类型,用于存储正则表达式 
    'Min/Max keys',将一个值与BSON[二进制的JSON]元素的最低值和最高值相对比  
  其他术语: 
    BSON: 是一种类json的一种二进制形式的存储格式,简称'Binary JSON'
安装&使用&启动: 
  1 下载安装包安装[位置可自定义],将安装目录下的'bin'目录,配置到环境变量   
  2 创建数据存储目录'data/db' 
    该数据目录不会主动创建,在安装完成后需创建它。
    数据目录应该放在根目录下,如： C:\ 或 D:\ 等 
  3 $ mongod.exe --dbpath 'D:/data/db' // 指定mongo项目的数据库目录  
    ★mongod.exe 常用参数: 
    --bind_ip   绑定服务IP 
      若绑定127.0.0.1,则只能本机访问,不指定默认本地所有IP
    --port      指定服务端口号,默认:27017
    --dbpath    指定数据库路径 
    --logpath   指定定MongoDB日志文件[而非目录] 
    --logappend 使用追加的方式写日志
    --serviceName         指定服务名称
    --serviceDisplayName  指定服务名称,有多个mongodb服务时执行 
    --install     作为一个Windows服务安装 
  bin目录下提供的一系列有用的工具 
    mongod.exe    MongoDB服务启动工具 
    mongo         客户端命令行工具,也是一JS解释器,支持JS语法
    mongostat     自带的状态检测工具
    mongotop      跟踪一个MongoDB的实例,查看哪些大量的时间花费在读取和写入数据
    mongosniff    监测工具,作用类似于 tcpdump
    mongoexport   数据导出工具
    mongos        分片路由,如果使用了 sharding 功能,则应用程序连接的是 mongos 而不是 mongod
    mongodump     MongoDB数据备份工具
    mongorestore  MongoDB数据恢复工具
    bsondump      将BSON格式的文件转储为JSON格式的数据 
    mongoimport   Mongodb数据导入工具
    mongofiles    GridFS 管理工具,可实现二制文件的存取    
    mongooplog  
    mongoperf  
  项目目录结构 
    db_project 
      conf  // 配置文件目录 
        mongo.conf // 配置文件 
      db    // 数据库目录   
      log   // 日志文件目录 
        mongo.log // 日志 
  $ mongo   // 连接到数据库[需启动新的命令行窗口] 
  $ show dbs  // 以列表形式显示所有数据库 
  $ db        // 显示当前数据库对象或集合 
  $ use <dbName>  // 使用或创建数据库 
    存在则切换到该数据库,否则新建数据库 
'mongo.conf'配置文件 
  $ mongod --config  'e:/db_project/conf/mongo.conf'  // 通过配置文件启动   
  内容详情: 
    // #数据库存放目录 
    dbpath = e:\db_project\db\
    // #日志文件 
    logpath = e:\db_project\log\mongodb.log
    // #错误日志采用追加模式,日志会写在一个文件中,而非多个文件 
    logappend = true
    // #启用日志,默认:启用 
    journal = true
    // #过滤掉一些无用的日志信息,若需要调试使用请设置为false
    quiet = false
    // #端口号 默认:27017
    port = 27017
◆Shell操作 
数据库'db'操作 
  db.<dbName>.insert({"name":"菜鸟教程"})
  db.dropDatabase() // 删除当前使用的数据库  
  db.createCollection(<ctName>,<options>)  // 创建集合 
    ctName    str,需创建的集合名称
    options obj,可选的选项  
      capped: bol  默认'false',若为'true',则创建固定集合,即有着固定大小的集合 
        当达到最大值时,会自动覆盖最早的文档,且必须指定'size'参数 
      size: num    为固定集合指定一个最大值,单位byte  
      max: num     指定固定集合中包含文档的最大数量 
      autoIndexID: bol   默认'false',若为'true',自动在'_id'字段创建索引 
  db.copyDatabase()  从指定的机器上复制指定数据库数据到某个数据库
  db.cloneDatabase()  从指定主机上克隆数据库
  db.cloneCollection()  在MongoDB实例之间复制集合数据
  db.commandHelp()  返回数据库命令的帮助信息
  db.currentOp()  显示当前正在进行的操作
  db.fsyncLock()  刷新写入磁盘并锁定该数据库,以防止写入操作,并协助备份操作
  db.fsyncUnlock()  允许继续进行写入锁住的数据库（解锁)
  db.getName()  查看当前使用的数据库
  db.getMongo()  查看当前db的链接机器地址
  db.getCollection()  得到指定名称的聚集集合（table)
  db.getCollectionNames()  得到当前db的所有聚集集合
  db.getCollectionInfos()  返回当前数据库中的所有集合信息
  db.getLastError()  返回上一次错误,如果没有错误则为空
  db.getLastErrorObj()  查看完整的错误结果
  db.getLogComponents()  返回日志消息详细级别
  db.getPrevError()  返回包含自上次错误复位所有的错误状态文件
  db.hostInfo()  返回当前数据库主机系统的相关信息
  db.killOp()  终止指定的操作
  db.listCommands()  显示公共数据库的命令列表
  db.logout()  注销登录
  db.printCollectionStats()  显示当前db所有聚集索引的状态
  db.repairDatabase()  修复当前数据库
  db.repairDatabase()  修复当前数据库
  db.resetError()  重置db.getPrevError()和getPrevError返回的错误信息
  db.runCommand()  运行一个数据库命令
  db.stats()  显示当前db状态
  db.serverStatus()  返回当前数据库状态的概要
  db.setLogLevel()  设置一个单独的日志信息级别
  db.setProfilingLevel()  修改当前数据库的分析级别
  db.shutdownServer()  关闭当前数据库运行实例或安全停止有关操作进程
  db.version()  查看当前db版本      
集合'ct'操作 
  db.<ctName>.insert(<dc>)   // 向集合中插入文档 
    PS: 若该集合不存在,则创建后插入 
  db.<ctName>.save(<newDc>[options])  // 插入/替换文档 
    PS: 未指定'_id'字段,同 insert(),指定'_id'字段,则会更新该'_id'的数据 
    newDc  插入/更新的文档 
    option = {  // 可选,配置对象 
      writeConcern: <dc>  // 可选,抛出异常的级别 
    }
  db.<ctName>.find(<query>,projection)  // 以非结构化的方式显示文档,返回游标对象  
    query  可选,查询条件,默认:{},所有文档 
    projection  可选,使用投影操作符指定返回的键,默认省略 
  db.<ctName>.find().pretty()   // 用格式化方式显示结果 
  db.<ctName>.findOne()  // 查询单个文档 
  db.<ctName>.update(<query>,{$xxx:<newDc>}[,option]) // 更新已存在的文档  
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
  db.<ctName>.updateOne() 修改集合中的一条数据
  db.<ctName>.remove(<query>[,option])  // 删除指定条件的文档 
    query  可选,删除文档的标准,默认:{},将集合中的所有文档删除  
    option  = { // 可选,如果设为 true 或 1,则只删除一个文档 
      justOne: bol, // 可选,是否只删除一个文档,默认false
        只删除一个文档可为 true 或 1 
      writeConcern: <dc>  // 可选,抛出异常的级别 
    }  
  db.<ctName>.drop()  // 删除指定集合,返回是否删除成功的布尔值   
  db.<ctName>.aggregate() 聚合,主要用于处理数据(诸如统计平均值,求和等),并返回计算后的数据结果
  db.<ctName>.bulkWrite() 批量写入
  db.<ctName>.count() 返回集合总数或匹配查询的结果集总数
  db.<ctName>.createIndex() 创建一个集合索引
  db.<ctName>.dataSize() 返回集合的大小
  db.<ctName>.deleteOne() 删除集合中的一个文档
  db.<ctName>.deleteMany() 删除集合中的多个文档
  db.<ctName>.distinct() 返回具有指定字段不同值的文档（去除指定字段的重复数据）
  db.<ctName>.dropIndex() 删除一个集合中的指定索引
  db.<ctName>.dropIndexes() 删除一个集合中的所有索引
  db.<ctName>.ensureIndex() 已过时,现使用db.collection.createIndex()
  db.<ctName>.explain() 返回各种方法的查询执行信息
  db.<ctName>.findAndModify() 查询并修改
  db.<ctName>.findOneAndDelete() 查询单条数据并删除
  db.<ctName>.findOneAndReplace() 查询单条数据并替换
  db.<ctName>.findOneAndUpdate() 查询单条数据并更新
  db.<ctName>.getIndexes() 返回当前集合的所有索引数组
  db.<ctName>.group() 提供简单的数据聚合功能
  db.<ctName>.insertOne() 在当前集合插入一条数据
  db.<ctName>.insertMany() 在当前集合插入多条数据
  db.<ctName>.isCapped() 判断集合是否为定容量
  db.<ctName>.reIndex() 重建当前集合的所有索引
  db.<ctName>.replaceOne() 替换集合中的一个文档（一条数据）
  db.<ctName>.renameCollection() 重命名集合名称
  db.<ctName>.stats() 返回当前集合的状态
  db.<ctName>.storageSize() 返回当前集合已使用的空间大小
  db.<ctName>.totalSize() 返回当前集合的总占用空间,包括所有文件和所有索引
  db.<ctName>.totalIndexSize() 返回当前集合所有的索引所占用的空间大小
  db.<ctName>.updateMany() 修改集合中的多条数据
  db.<ctName>.validate() 执行对集合验证操作
游标'cs'操作 
  <cs>.batchSize() 
  <cs>.close() 
  <cs>.comment() 
  <cs>.count() 
  <cs>.explain() 
  <cs>.forEach() 
  <cs>.hasNext() 
  <cs>.hint() 
  <cs>.itcount() 
  <cs>.limit() 
  <cs>.map() 
  <cs>.maxScan() 
  <cs>.maxTimeMS() 
  <cs>.max() 
  <cs>.min() 
  <cs>.next() 
  <cs>.noCursorTimeout() 
  <cs>.objsLeftInBatch() 
  <cs>.pretty() 
  <cs>.readConcern() 
  <cs>.readPref() 
  <cs>.returnKey() 
  <cs>.showRecordId() 
  <cs>.size() 
  <cs>.skip() 
  <cs>.snapshot() 
  <cs>.sort() 
  <cs>.tailable() 
  <cs>.toArray()
文档'dc'操作 
  ▼单个文档操作 
  ▼多个文档操作 
  <dcs>.limit(<num>)  // 限制显示的文档数量 
    num  数值,当num不存在将显示所有文档 
  <dcs>.skip(<num>)   // 跳过num个文档 
    num 可选,默认:0,不跳过 
  <dcs>.sort({<key>:1/-1,..})  // 通过指定字段来排序,1:升序、-1:降序 
    PS: 默认按照升序排序 
    // 按照降序排列标题的文档 
    db.mycol.find({},{"title":1,_id:0}).sort({"title":-1})
◆操作符汇总 
  PS: 原子操作,即只有操作成功或操作无效两种状态    
    mongodb不支持事务,但提供了许多原子操作,如文档的保存,修改,删除等 
查询操作符 
★'query-comparison'比较查询操作符 
  格式              操作               RDBMS中的类似语句 
  {<key>: <val>}    ='equal'           where by = '菜鸟教程' 
    db.col.find({"by":"菜鸟教程"}).pretty()  
  $eq               =等于
  $ne               !='not equal'      where likes != 50 
    格式: { 
      <key>: { 
        $ne: <val> 
      }
    }
    Example: 
      db.col.find({"likes":{$ne:50}}).pretty()  
  $lt               <'less than'       where likes < 50 
    格式: {
      <key>: {
        $lt: <val>
      }
    }
    db.col.find({"likes":{$lt:50}}).pretty()  
  $lte              <='lt equal'       where likes <= 50 
    格式: {
      <key>: {
        $lte: <val>
      }
    } 
    db.col.find({"likes":{$lte:50}}).pretty()  
  $gt               >'greater than'    where likes > 50 
    格式: {
      <key>: {
        $gt: <val>
      }
    } 
    db.col.find({"likes":{$gt:50}}).pretty()  
  $gte              >='gt equal'       where likes >= 50 
    格式: { 
      <key>: {
        $gte: <val>
      }
    } 
    db.col.find({"likes":{$gte:50}}).pretty()  
  $in               包含 
  $nin              不包含
  组合使用 
    db.col.find({
      likes: {
        $lt: 200
        ,$gt: 100
      }
    }) 
★'query-logical'逻辑查询操作符 
  $and   交集
    传入多个键,用逗号','分隔 
    db.mycol.find({key1:val1, key2:val2}) 
  $or    并集
    db.mycol.find( {
      $or: [
        { 
          key1: value1
        }
        ,{
          key2:value2
        }
      ]
    } )
  $not   取反
  $nor   
★'query-element'元查询操作符 
  $type,基于BSON类型来检索集合中匹配的数据类型 
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
  $exists,判断字段是否存在 
★'query-evaluation'评价查询操作符 
  $where 
  $text 
  $regex 
  $mod,取模计算
★'query-array'数组查询操作符 
  $all,匹配所有
  $elemMatch,
  $size,匹配数组元素个数
  ★'query-geospatial'地理查询操作符 
★'query-bitwise'位查询操作符  
更新操作符 
★'update-field'字段更新操作符 
  {$set: {<field>: <val>}} 更新指定字段,不存在则创建[原子操作]
  {$unset: {<field>: 1}}   删除字段[原子操作]
  {$inc: {<field>: <num>}} 对数字类型的字段进行增减操作[原子操作] 
  {$rename: {<old_field_name>: <new_field_name>}} 字段的重命名[原子操作]
  $currentDate  
  $max  
  $min  
  $setOnInsert  
  $mul  
★'update-array'数组更新操作符 
  {$push: {<field>: <val>}} 追加成员,若该字段不存在,则新增并追加  [原子操作]
  {$pushAll: {<field>: <val_arr>}} 同$push,一次追加多个成员 [原子操作]
  $addToSet,当无该成员时,则增加[原子操作]
  {$pull: {<field>: <val>}} 从数组内内删除一等于<val>的成员 [原子操作]
  $pullAll,同$pull,可一次删除多个成员  
  {$pop: {<field>: 1}}  删除数组的第一个或最后一个元素[原子操作]
  $position,
  $each,
  $sort,
★'update-bitwise'位更新操作符 
  {$bit: {<field>: {and: 5}}} [原子操作]   
聚合管道操作符 
★'aggregation-group'group查询操作符 
  $sum,计算总和
  $avg,计算平均值
  $first,根据资源文档的排序获取第一个文档数据 
  $last,根据资源文档的排序获取最后一个文档数据
  $max,获取集合中所有文档对应值得最大值 
  $min,获取集合中所有文档对应值得最小值 
  $push,在结果文档中插入值到一个数组中 
  $addToSet,在结果文档中插入值到一个数组中,但不创建副本 
  $stdDevPop,
  $stdDevSamp,
★'aggregation-pipeline'管道聚合阶段 
  $project,修改输入文档的结构
    可以用来重命名、增加或删除域,也可以用于创建计算结果以及嵌套文档。
  $match,用于过滤数据,只输出符合条件的文档
    $match使用MongoDB的标准查询操作。
  $redact,
  $limit,用来限制MongoDB聚合管道返回的文档数。
  $skip,在聚合管道中跳过指定数量的文档,并返回余下的文档。
  $unwind,将文档中的某一个数组类型字段拆分成多条,每条包含数组中的一个值。
  $group,将集合中的文档分组,可用于统计结果。
  $sample,
  $sort,将输入文档排序后输出。
  $geoNear,输出接近某一地理位置的有序文档。
◆详解 
ObjectId,一个12字节BSON类型数据 
  PS: MongoDB中存储的文档必须有一个"_id"键。
    该键的值可是任何类型的,默认为ObjectId对象。
    在一个集合里面,每个文档都有唯一的"_id"值,
    来确保集合里面每个文档都能被唯一标识 
  组成: 
    前'4'个字节表示'时间戳'
    接下来的'3'个字节是'机器标识码'
    紧接的'2'个字节由进程id组成'PID'
    最后'3'个字节是随机数
  创建新的ObjectId
    // 生成新的ObjectId: ObjectId("5349b4ddd2781d08c09890f3")
    newObjectId = ObjectId() 
    // 使用生成的id来取代MongoDB自动生成的ObjectId 
    myObjectId = ObjectId("5349b4ddd2781d08c09890f4")  
  创建文档的时间戳 
    由于 ObjectId 中存储了 4 个字节的时间戳,所以不需要文档保存时间戳字段,
    可以通过 getTimestamp 函数来获取文档的创建时间:
    // 返回 ISO 格式的时间: ISODate("2014-04-12T21:49:17Z")  
    ObjectId("5349b4ddd2781d08c09890f4").getTimestamp()  
  ObjectId 转换为字符串 
    // 返回Guid格式的字符串: 5349b4ddd2781d08c09890f3  
    new ObjectId().str  
◆其他优化处理 
索引,实现高效查询 
  PS: 无索引时读取数据,需扫描集合中所有文档,进行查找; 
    索引是一种特殊的数据结构,存储在一个易于遍历读取的数据集合中    
    索引能够存储某种特殊字段或字段集的值,并按照指定的方式将字段值进行排序  
  $ db.<ctName>.ensureIndex(  // 创建索引  
    { // 创建的索引字段,可使用多个字段创建索引[关系型数据库中称作复合索引] 
      <key>: 1/-1 
        key  创建索引的字段名称
        1 代表按升序排列字段值;-1 代表按降序排列
    }
    ,{  // 可选,配置选项
      name: str // 可选,索引名称,默认通过连接索引的字段名和排序顺序生成一个索引名称 
      ,background: bol  // 可选,是否后台创建,默认:false  
        建索引的过程会阻塞其它数据库操作,该项可指定是否以后台方式创建索引 
      ,unique: bol  // 可选,建立的索引是否唯一,默认:false 
      ,dropDups: bol // 建立唯一索引时是否删除重复记录,默认:false 
        指定 true 创建唯一索引
      ,sparse: bol   // 对文档中不存在的字段数据不启用索引,默认:false 
        如果设置为true的话,在索引字段中不会查询出不包含对应字段的文档.。默认值为 false.
      ,expireAfterSeconds: int // 设定集合的生存时间,单位:秒s 
      ,v: 版本号  // 索引的版本号,默认:mongod创建索引时运行的版本 
      ,weights: int  //  索引权重值,范围:[1-99999] 
        表示该索引相对于其他索引字段的得分权重。
      ,default_language: kw // 默认:'english' 
        对文本索引而言,用于确定停止词列表,以及词干分析器'stemmer'与断词器'tokenizer'的规则 
      ,language_override: kw // 默认:language 
        对于文本索引,该参数指定了包含在文档中的字段名,该语言将覆盖默认语言 
    }
  )  
  索引数组字段 
    对数组类型的字段创建索引时,mongo会对数组内的每个字段依次建立索引 
    Example: 
    db.users.ensureIndex({"arr1" :1})  
    // 创建索引后,检索数组中的某一个成员字段 
    db.users.find({arr1: "meb1"})  
  索引子文档字段 
    PS: 使用'parent.child'的形式来指定字段 
    Example: 
    db.users.ensureIndex({"address.city":1,"address.state":1,"address.pincode":1})  
    // 创建索引后,使用子文档的字段来检索数据：
    db.users.find({"address.city":"Los Angeles"})  
  索引限制 
    额外开销: 每个索引占据一定的存储空间
      在进行插入,更新和删除操作时也需要对索引进行操作。
      若很少对集合进行读取操作,建议不使用索引。
    内存'RAM'使用: 索引是存储在内存'RAM'中,应确保该索引的大小不超过内存的限制 
      如果索引的大小大于内存的限制,MongoDB会删除一些索引,这将导致性能下降。
    索引不能被以下的查询使用：
      正则表达式及非操作符,如 $nin, $not, 等。
      算术运算符,如 $mod, 等。
      $where 子句
      所以,检测你的语句是否使用索引是一个好的习惯,可以用explain来查看。
    索引键限制
      '2.6+'版本开始,如果现有的索引字段的值超过索引键的限制,MongoDB中不会创建索引。
    插入文档超过索引键限制
      如果文档的索引字段值超过了索引键的限制,MongoDB不会将任何文档转换成索引的集合。
      与mongorestore和mongoimport工具类似。
    最大范围 
      集合中索引不能超过64个
      索引名的长度不能超过125个字符
      一个复合索引最多可以有31个字段
聚合'aggregate',处理数据并返回处理后的结果,如平均值,求和等   
  PS: 类似sql语句中的 count(*)
    将多个文档中的值组合起来,对成组数据执行各种操作,返回单一的结果 
  $ db.<ctName>.aggregate(options)  
    // 从集合中归纳出一个列表,以显示每个用户写的教程数量 
    db.mycol.aggregate([
      {$group: {_id: "$by_user",num_tutorial: {$sum : 1}}}
    ]) 
    // $match用于获取分数大于70小于或等于90记录,
    // 然后将符合条件的记录送到下一阶段$group管道操作符进行处理
    db.articles.aggregate([   
      {$match: {score: {$gt: 70,$lte : 90}}}
      ,{$group: {_id: null,count: {$sum: 1}}}      
    ]);  
  ★聚合表达式列表:    
  $sum,和   
    db.mycol.aggregate([{$group: {_id: "$by_user",num_tutorial: {$sum: "$likes"}}}])
  $avg,平均值  
    db.mycol.aggregate([{$group: {_id: "$by_user",num_tutorial: {$avg: "$likes"}}}])
  $min,最小值  
    db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])
  $max,最大值  
    db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])
  $push,在结果文档中插入值到一个数组中  
    db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])
  $addToSet,在结果文档中插入值到一个数组中,但不创建副本  
    db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])
  $first,根据成组方式,从源文档中获取第一个文档 
    但只有对之前应用过 $sort 管道操作符的结果才有意义  
    db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])
  $last,根据成组方式,从源文档中获取最后一个文档 
    但只有对之前进行过 $sort 管道操作符的结果才有意义  
    db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])
  ★聚合管道操作符: 
  $group,将集合中的文档分组,可用于统计结果 
  $project,用来选取集合中一些特定字段  
  $match,只输出符合条件的文档 
    使用MongoDB的标准查询操作 
  $limit,限制返回文档的数量 
  $skip,跳过指定数量的文档,并返回余下的文档  
  $sort,对文档进行排序 
  $unwind,解开使用数组的文档 
复制,在多个服务器上同步数据的过程 
  PS: 
  优点: 
    保障数据的安全性 
    数据高可用性 (24*7) 
    灾难恢复 
      允许从硬件故障和服务中断中恢复数据 
    无需停机维护,如备份,重建索引,压缩 
    分布式读取数据
  复制的运作方式 
    使用副本集'replica set'来实现复制操作 
    副本集是一组托管同一数据集的 mongod 对象 
    mongodb的复制至少需要两个节点: 
    在副本集中,主节点负责接收写入操作,
    所有其他的实例[从节点]则通过执行主节点的操作来拥有同样的数据集 
    副本集只有一个主节点,其他全是从节点,任何节点都可能成为主节点  
    所有数据都是从主节点复制到从节点上的 
    副本集具有 2 个或多个节点（但一般最少需要 3 个节点) 
    当发生自动故障转移或维护时,会重新推举一个新的主节点 
    当失败节点恢复后,该节点重新又连接到副本集中,重新作为从节点 
    副本集特征: 
      N 个节点的集群
      任何节点可作为主节点
      所有写入操作都在主节点上
      自动故障转移
      自动恢复
分片,通过在多台机器上分割数据,使得数据库系统能存储和处理更多的数据 
  为应对数据增长需求而采取的办法  
  当数据量增长时,单台机器有可能无法存储数据或可接受的读取写入吞吐量,
  通过横向扩展,分片技术解决该问题 
  利用分片技术,可以添加更多的机器来应对数据量增加以及读写操作的要求 
数据库备份与恢复 
  // 备份,导出所有数据到指定目录中 
  $ mongodump -h <dbhost> -d <dbname> -o <dbdir>    
    dbhost  可选,MongDB所在服务器地址 
      例如:127.0.0.1,当然也可以指定端口号:127.0.0.1:27017
    dbname  可选,需要备份的数据库实例,例如:test 
    dbdir   可选,备份的数据存放位置,默认:'./dump/' 
      例如:c:\data\dump,该目录需要提前建立,
      在备份完成后,系统自动在dump目录下建立一个test目录,
      这个目录里面存放该数据库实例的备份数据。
  // 恢复备份 
  $ mongorestore -h <dbhost> -d <dbname> --directoryperdb <dbdir> 
    dbhost   MongoDB所在服务器地址 
    dbname   需要恢复的数据库实例 
      例如:test,当然这个名称也可以和备份时候的不一样,比如test2
    dbdir    备份数据所在位置 
      例如:c:\data\dump\test 
    --drop: 恢复的时候,先删除当前数据,然后恢复备份的数据 
      即 恢复后,备份后添加修改的数据都会被删除,慎用 
MongoDB监控,了解MongoDB的运行情况,查看MongoDB的性能
  PS: 可在大流量的情况下应对并保证MongoDB正常运作 
    当发现数据库变慢或有其他问题的话,首先操作就采用mongostat来查看mongo的状态 
  $ mongostat  // 检查所有运行中的mongod实例的状态 
    mongodb自带的状态检测工具 
    固定间隔时间获取mongodb的当前运行状态,并输出 
  $ mongotop [<time>]  记录并报告MongoDB实例基于每个集合的读写活动
    默认每秒返回一次结果 
    Example: $ mongotop 30  // 每 30 秒返回 
    ★输出结果字段说明: 
    ns: 包含数据库命名空间,后者结合了数据库名称和集合 
    db: 包含数据库的名称,名为'.'的数据库针对全局锁定,而非特定数据库 
    total: mongod花费的时间工作在这个命名空间提供总额 
    read: 提供了大量的时间,这mongod花费在执行读操作,在此命名空间 
    write: 提供这个命名空间进行写操作,这mongod花了大量的时间 
◆其他 
MongoDB关系,多个文档间在逻辑上的相互联系  
  PS: 文档间可通过嵌入和引用来建立联系  
    MongoDB中的关系可以是任意关系,即:一对一、一对多、多对一、多对多 
  嵌入式关系: 直接在一文档中写入另一文档的内容 
  引用式关系: 两个文档分开,通过引用文档的id字段来建立关系 
MongoDB数据库引用 
  PS: 如 一个文档从多个集合引用文档 
  手动引用'Manual References'
  DBRefs: { $ref : , $id : , $db :  }  
    $ref  集合名称
    $id   引用的id
    $db   可选,数据库名称 
    Example: 
      {
        "_id":ObjectId("53402597d852426020000002"),
        "address": {
          "$ref": "address_home",
          "$id": ObjectId("534009e4d852427820000002"),
          "$db": "w3cschoolcc"
        },
        "contact": "987654321",
        "dob": "01-01-1991",
        "name": "Tom Benzamin"  
      }  
--------------------------------------------------------------------------------

