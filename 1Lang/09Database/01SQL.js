'Structural Query Language'结构化查询语言: 目前所有主流数据库的通用查询语言 
  ★描述: 
    是 ANSI['American National Standard Institute'美国国家标准协会]标准 
      但 SQL 语言有很多不同的版本存在  
    是 关系型数据库系统'Relation Database System'的标准语言 
      细微的差别: 用的都是不同的 SQL 方言 
        Oracle 使用 PL/SQL
        微软的 SQL Server 使用 T-SQL
        微软的 Access 中的 SQL 叫做 JET SQL 
  SQL 功能: 
    访问数据 
    描述数据   
    定义、操作数据  
    创建或删除数据库和表 
    创建视图、存储过程和函数 
    对表、过程和视图设进行权限设置 
    通过 SQL 模块、库或者预编译器的等方式,嵌入到其他语言中 
约束 
  PS: 约束有列级和表级之分,列级约束作用于单一的列,而表级约束作用于整张数据表  
  枚举: 
    NOT NULL: 保证列中数据不能有NULL值 
    DEFAULT: 提供该列数据未指定时所采用的默认值 
    UNIQUE: 保证列中的所有数据各不相同 
    主键: 唯一标识数据表中的行/记录
    外键: 唯一标识其他表中的一条行/记录
    CHECK: 此约束保证列中的所有值满足某一条件
    索引: 用于在数据库中快速创建或检索数据 
      索引是一种特殊的查询表,可被数据库搜索引擎用来加速数据的检索。
      简单说来,索引就是指向表中数据的指针。
      索引能够提高 SELECT 查询和 WHERE 子句的速度,
      但是却降低了包含 UPDATE 语句或 INSERT 语句的数据输入过程的速度。
      索引的创建与删除不会对表中的数据产生影响。
  约束可在 CREATE TABLE 创建表的时候指定,也可在表创建之后由 ALTER TABLE 设置  
  删除约束
    任何现有约束都可以通过在 ALTER TABLE 命令中指定 DROP CONSTRAINT 选项的方法删除掉。
    ALTER TABLE <tb_name> DROP CONSTRAINT <col>; // 删除表中的主键约束 
数据类型: 指定了任何SQL对象中数据的类型 
  数据类型        下限                          上限
  // 精确数值数据类型
  smallint        -32,768                      32,767
  int             -2,147,483,648               2,147,483,647
  bigint          -9,223,372,036,854,770,000   9,223,372,036,854,770,000
  smallmoney      -214,748.36                  214,748.36
  money           -922,337,203,685,477.00      922,337,203,685,477.00
  bit             0                            1
  tinyint         0                            255
  decimal         1E+38                        10^38 -1
  numeric         1E+38                        10^38 -1
  // 近似数值数据类型
  float           -1.79E + 308                 1.79E + 308
  real            -3.40E + 38                  3.40E + 38
  // 日期和时间数据类型
  smalldatetime   1-Jan-00                    6-Jun-79
  datetime        Jan 1, 1753                 31-Dec-99
  date      存储一个日期数据,例如 June 30, 1991
  time      存储一个时间数据,例如 12:30 P.M.
  注意: datetime 的时间和精度为 3.33 ms,而 smalldatetime 的时间精度为 1 min。
  // 字符串数据类型
  char            char             最大长度为 8,000 字符。（定长非 Unicode 字符）
  varchar         varchar          最大长度为 8,000 字符。（变长非 Unicode 数据）
  varchar(max)    varchar(max)     最大长度为 231 字符, 变长非 Unicode 数据 (仅限 SQL Server 2005).
  text text 变长非 Unicode 字符数据,最大长度 2,147,483,647 字符。
  // Unicode 字符串数据类型
  nchar         最大长度 4000 字符。（定长 Unicode 字符串）
  nvarchar      最大长度 4000 字符。（变长 Unicode 字符串）
  nvarchar(max) 最大长度 231 字符 。（仅限 SQL Server 2005）。（变长 Unicode 字符串）
  ntext         最大长度 1,073,741,823 字符。（变长 Unicode 字符串）
  // 二进制数据类型
  binary         最大长度 8000 字节。（定长二进制数据）
  varbinary      最大长度 8000 字节。（变长二进制数据）
  varbinary(max) 最大长度 231字节 （仅限 SQLServer 2005）。 （变长二进制数据）
  image          最大长度 2,147,483,647 字节。（变长二进制数据）
  // 其他数据类型 
  sql_variant      存储多种 SQL 支持的数据类型,text、ntext、timestamp 除外。
  timestamp        一个数据库级的唯一值,每当有行更新此数据就会更新。
  uniqueidentifier 全局唯一标识符（GUID）
  xml              存储 XML 数据。你可以在列或者变量中存储 XML 实例。（仅限 SQL Server 2005）
  cursor           指向 cursor 对象。
  table            存储结果,以备后用。
语句: 用于与关系型数据库交互 
  ★数据定义 
  CREATE 创建 
    CREATE DATABASE <db_name>  // 创建数据库 
    CREATE TABLE <tb_name>(    // 创建表 
      // 创建一个基本的表需要: 命名表、定义列和各列的数据类型 
      <col1>  <datatype> <limit?>,
      <col2>  <datatype>,
      ...
      PRIMARY KEY (<colx>)  // 设置主键 
      Example: 
        CREATE TABLE customers(
          ID       INT              NOT NULL,
          name     VARCHAR (20)     NOT NULL,
          age      INT              NOT NULL,
          address  CHAR (25) ,
          salary   DECIMAL (18, 2),       
          PRIMARY KEY (ID)
        );
    )     
    CREATE INDEX     //  创建索引
      对索引命名,指定要创建索引的表以及对哪些列进行索引,还可以指定索引按照升序或者降序排列。
      CREATE INDEX <index_name> ON <table_name>;
      单列索引: 单列索引基于单一的字段创建 
        CREATE INDEX index_name
        ON table_name (column_name);
      唯一索引: 
        唯一索引不止用于提升查询性能,还用于保证数据完整性。
        唯一索引不允许向表中插入任何重复值。
        CREATE UNIQUE INDEX index_name
        on table_name (column_name);
      聚簇索引: 
        聚簇索引在表中两个或更多的列的基础上建立
        CREATE INDEX index_name
        on table_name (column1, column2);
      隐式索引: 
        隐式索引由数据库服务器在创建某些对象的时候自动生成。
        例如,对于主键约束和唯一约束,数据库服务器就会自动创建索引。
  ALTER  修改 
    PS: 用于添加、删除或更改现有数据表中的列,也可以添加或删除现有数据表上的约束 
    // 添加新列 
    ALTER TABLE <table_name> ADD <column_name> <datatype>; 
    // 删除列 
    ALTER TABLE <table_name> DROP COLUMN <column_name>;    
    // 更改现有数据表中列的数据类型 
    ALTER TABLE <table_name> MODIFY COLUMN <column_name> <datatype>; 
    // 给某列添加 NOT NULL 约束 
    ALTER TABLE <table_name> MODIFY <column_name> <datatype> NOT NULL; 
    // 给数据表添加 唯一约束 
    ALTER TABLE <table_name> ADD CONSTRAINT MyUniqueConstraint UNIQUE(column1, column2...);
    // 给数据表添加 CHECK 约束 
    ALTER TABLE <table_name> ADD CONSTRAINT MyUniqueConstraint CHECK (CONDITION);
    // 给数据表添加 主键约束 
    ALTER TABLE table_name ADD CONSTRAINT MyPrimaryKey PRIMARY KEY (column1, column2...);
    // 从数据表中 删除约束 
    ALTER TABLE table_name DROP CONSTRAINT MyUniqueConstraint;
    ALTER TABLE table_name DROP INDEX MyUniqueConstraint; // MySQL代码 
    // 从数据表中 删除主键约束 
    ALTER TABLE table_name DROP CONSTRAINT MyPrimaryKey;
    ALTER TABLE table_name DROP PRIMARY KEY; // MySQL 
  DROP   删除 
    DROP DATABASE <db_name> // 删除数据库 
    DROP TABLE <tb_name>    // 删除表 
    DROP INDEX  // 删错索引 
      PS: 删除索引时应当特别小心,数据库的性能可能会因此而降低或者提高 
      DROP INDEX <index_name>;
      什么时候应当避免使用索引? 
        尽管创建索引的目的是提升数据库的性能,但是还是有一些情况应当避免使用索引。
        下面几条指导原则给出了何时应当重新考虑是否使用索引: 
        小的数据表不应当使用索引
        需要频繁进行大批量的更新或者插入操作的表
        如果列中包含大数或者 NULL 值,不宜创建索引
        频繁操作的列不宜创建索引。
  ★数据操纵 
  USE <db_name> // 选择数据库 
    若数据库架构中有多个数据库同时存在,则在开始操作前必须先选定其中一个 
  SELECT 检索,从数据库的表中取回所需的数据,并以表的形式返回,返回的表被称作结果集  
    SELECT <field> FROM <table>;    
      field    // 需查询的字段名 
        *          表示[表中的]所有字段
        逗号分隔    具体的多个字段,如: name,age,sex 
      table    // 查询的表名  
      Example: SELECT * FROM `user_tb`
  INSERT 插入记录 
    // col对应val添加数据
    INSERT INTO <tb_name> (<col_list>) VALUES (<val_list>);  
      INSERT INTO `user_tb` (`ID`,`username`,`password`) VALUES (0,'清风','111111');  
        ID 一般为自增,此处对应 0,即表示为自增  
    // 当省略字段列表时表示为所有字段添加值,但值必须按照表中的顺序   
    INSERT INTO <tb_name> VALUES (<val1>, <val2>, ...); 
  UPDATE 修改记录 
    UPDATE <tb-name>
    SET col1=val1,col2=val2,... 
    WHERE <condition>   // WHERE 可选,去掉后修改所有行 
    Example: 
      UPDATE news_tb SET view_num=view_num+1 WHERE ID=1  // 将id为1的记录的view_num加1 
  DELETE 删除记录 
    DELETE FROM <tb-name> 
    WHERE <condition>;    // WHERE 可选,去掉则删除所有行 
  TRUNCATE TABLE 删除现有数据表中的所有数据 
    PS: DROP TABLE 不但会删除表中所有数据,还会将整个表结构从数据库中移除。
      如果想要重新向表中存储数据的话,必须重建该数据表。
    TRUNCATE TABLE  <table_name>;
  ★数据控制 
  GRANT  赋予用户特权
  REVOKE 收回赋予用户的特权 
  ★子句 
    子句的书写顺序: WHERE GROUP ORDER LIMIT 
  WHERE     有条件地从单个表中取回数据或者将多个表进行合并 
    PS: 可用于 SELECT、UPDATE、DELETE 等语句 
    WHERE <condition> // 条件   
      Example: 
        SELECT name FROM group WHERE age=18  
  GROUP BY  聚类,将相同数据分成一组 
    PS: 通常需结合 函数 来使用 
    SELECT <col_list> 
    FROM <tb_name> 
    WHERE [<conditions>] 
    GROUP BY <col_list> 
    ORDER BY <col_list> 
  ORDER BY  根据一列或者多列的值,按照升序或者降序排列数据 
    PS: 某些数据库默认以升序排列查询结果 
    SELECT <col_list> 
    FROM <tb_name> 
    [WHERE <condition>] 
    [ORDER BY col1 [ASC|DESC],col2 [ASC|DESC], ...  ] ;
      ASC   升序,从小到大 
      DESC  降序,从大到小 
    Example: 
      价格升序,若价格相同,再按照销量降序排列 
      ORDER BY price ASC,sales DESC 
  TOP       从一张数据表中取回前 N 个或者 X% 的记录,所有的数据库系统都不支持 TOP 子句
  LIMIT     MySql中的 TOP 
    LIMIT <num>     // 前num条数据 
    LIMIT idx,num2  // 从第idx开始,共num2条数据 
      idx  从0开始计数  
  ROWNUM    Oracle中的 TOP 
  JOIN      用于将数据库中两个或者两个以上表中的记录组合起来,连接通过共有值将不同表中的字段组合在一起 
    INNER JOIN: 内连接,当两个表中都存在匹配时,才返回行 
      SELECT table1.column1, table2.column2... 
      FROM table1
      INNER JOIN table2
      ON table1.common_field = table2.common_field;
    LEFT JOIN: 左连接,返回左表中的所有行,即使右表中没有匹配的行 
      SELECT table1.column1, table2.column2...
      FROM table1
      LEFT JOIN table2
      ON table1.common_field = table2.common_field;
    RIGHT JOIN: 右连接,返回右表中的所有行,即使左表中没有匹配的行 
      SELECT table1.column1, table2.column2...
      FROM table1
      RIGHT JOIN table2
      ON table1.common_field = table2.common_field;
    FULL JOIN: 全连接,只要某一个表存在匹配,就返回行 
      SELECT table1.column1, table2.column2...
      FROM table1
      FULL JOIN table2
      ON table1.common_field = table2.common_field;
    CARTESIAN JOIN: 笛卡尔连接,返回两个或者更多的表中记录集的笛卡尔积 
      SELECT table1.column1, table2.column2...
      FROM  table1, table2 [, table3 ]
  UNION     将两个或者更多的 SELECT 语句的运算结果组合起来 
    在使用 UNION 时,每个 SELECT 语句必须有相同数量的选中列、相同数量的列表达式、相同的数据类型,
    并且它们出现的次序要一致,不过长度不一定要相同。
    SELECT column1 [, column2 ]
    FROM table1 [, table2 ]
    [WHERE condition]
    UNION
    SELECT column1 [, column2 ]
    FROM table1 [, table2 ]
    [WHERE condition]
  UNION ALL 将两个 SELECT 语句的结果组合在一起,重复行也包含在内 
    UNION ALL 运算符所遵从的规则与 UNION 一致。
    SELECT column1 [, column2 ]
    FROM table1 [, table2 ]
    [WHERE condition]
    UNION ALL
    SELECT column1 [, column2 ]
    FROM table1 [, table2 ]
    [WHERE condition]
  AS        使用别名来对数据表或者列进行临时命名 
    Example: 
      表重命名
      SELECT c.ID, c.name, c.age, o.amount 
      FROM customers AS c, orders AS o
      WHERE  c.ID = o.customer_id;
  HAVING    对 GROUP BY 子句所产生的组施加条件 
    PS: 在 SELECT 查询中,HAVING 子句必须紧随 GROUP BY 子句 
    Example: 
      该实例将会筛选出出现次数大于或等于 2 的所有记录 
      SELECT ID, name, age, address, salary
      FROM customers
      GROUP BY age
      HAVING COUNT(age) >= 2;
  ★关键字 
  DISTINCT  同 SELECT 语句一起使用,可去除所有重复记录,只返回其中一项 
    SELECT DISTINCT <col_list>
    FROM <tb_name>
    WHERE [<condition>] 
  ▼连接运算符
  // 待分类 
  SHOW 
  DESC 
操作符: 主要用于在SQL语句的 WHERE 子句中执行各种操作 
  PS: 每个操作符都是一个保留字 
  ★算术运算符
  +       相加 
  -       相减 
  *       相乘 
  /       相除 
  %       取余,返回余数 
  ★比较运算符
  =       返回两个操作数的值是否相等的布尔值 
  !=      返回两个操作数的值是否相等的布尔值 
  XX      检查两个操作数的值是否相等,如果不等则返回 true 
  >       返回左边的操作数是否大于右边的操作数的布尔值 
  >=      返回左边的操作数是否大于或等于右边操作数的布尔值 
  <       返回左边操作数是否小于右边操作数的布尔值 
  <=      返回左边的操作数是否小于或等于右边的操作数的布尔值 
  !<      返回左边的操作数是否不小于右边的操作数的布尔值 
  !>      返回左边的操作数是否不大于右边的操作数的布尔值 
  ★逻辑运算符 
  AND     返回连接的所有条件是否都为真的布尔值 
  OR      返回连接的条件中是否有真的布尔值 
  ALL     用于将一个值同另一个值集中所有的值进行比较 
  AND     运算符使得在 WHERE 子句中可以同时存在多个条件 
  ANY     运算符用于将一个值同条件所指定的列表中的任意值相比较 
  BETWEEN 给定最小值和最大值,BETWEEN 运算符可以用于搜索区间内的值。
  BETWEEN xx AND xx  处于某个范围之间 
  EXISTS  运算符用于在表中搜索符合特定条件的行。
  IN      运算符用于将某个值同指定的一列字面值相比较。
  LIKE    运算符用于使用通配符对某个值和与其相似的值做出比较 
  NOT     操作符反转它所作用的操作符的意义
    例如,NOT EXISTS、NOT BETWEEN、NOT IN 等。这是一个求反运算符。
  OR      运算符用于在 SQL 语句中连接多个条件。
  IS NULL 值是否为 NULL 
    SELECT  <col_list>
    FROM <tb_name>
    WHERE <col> IS NULL;
  IS NOT NULL 值是否不是 NULL
    SELECT  <col_list> 
    FROM <tb_name> 
    WHERE <col> IS NOT NULL; 
  UNIQUE  运算符检查指定表的所有行,以确定没有重复。
  用于否定条件的运算符
通配符: 
  %    零个、一个或者多个字符 
  _    单个数字或者字符 
函数 
  用于在表上或者表中的特定列上执行聚合数据运算
  COUNT(<col>)   记录数量 
  SUM(<col>)     总和 
  AVG(<col>)     平均值
  MAX(<col>)     最大值
  MIN(<col>)     最小值
  SQRT(<col>)
  RAND(<col>)
  CONCAT(<col>)
  日期函数 
    下面的列表中是 SQL 中所有与日期和时间相关的重要函数。
    你所用的 RDBMS 可能会支持更多其他的函数。
    下面的列表基于 MySQL 关系型数据库管理系统。
    名称                               描述
    ADDDATE()                 增加日期
    ADDTIME()                 增加时间
    CONVERT_TZ()              将当前时区更改为另一时区
    CURDATE()                 返回当前日期
    CURRENT_DATE(),CURRENT_DATE               CURDATE() 的别名
    CURRENT_TIME(), CURRENT_TIME              CURTIME() 的别名
    CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP    NOW() 的别名
    CURTIME()                  返回当前时间
    DATE_ADD()                 将两个日期相加
    DATE_FORMAT()              按照指定格式格式化日期
    DATE_SUB()                 将两个日期相减
    DATE()                     从 date 或者 datetime 表达式中提取出日期部分
    DATEDIFF()                 将两个日期相减
    DAY()                      DAYOFMONTH() 的别名
    DAYNAME()                  返回某天在用星期中的名称
    DAYOFMONTH()               返回某天是当月的第几天 （1-31）
    DAYOFWEEK()                返回某天是该星期的第几天
    DAYOFYEAR()                返回某天是一年中的第几天（1-366）
    EXTRACT                    提取日期中的某一部分
    FROM_DAYS()                将天数转换为日期
    FROM_UNIXTIME()            将某个日期格式化为 UNIX 时间戳
    HOUR()                     提取小时
    LAST_DAY                   返回参数日期所在月份的最后一天
    LOCALTIME(), LOCALTIME     NOW() 的别名
    LOCALTIMESTAMP, LOCALTIMESTAMP()          NOW() 的别名
    MAKEDATE()                 利用年份和某天在该年所处的天数来创建日期
    MAKETIME                   MAKETIME()
    MICROSECOND()              由参数返回微秒
    MINUTE()                   由参数返回分钟
    MONTH()                    返回日期参数的月份
    MONTHNAME()                返回月份的名字
    NOW()                      返回当前日期和时间
    PERIOD_ADD()               向年月格式的日期数据之间添加一段时间
    PERIOD_DIFF()              返回两个年月格式的日期数据之间的月份数
    QUARTER()                  返回日期参数所在的季度
    SEC_TO_TIME()              将秒数转换为 'HH:MM:SS' 格式
    SECOND()                   返回参数中的秒数 (0-59)
    STR_TO_DATE()              将字符串转换为日期数据
    SUBDATE()                  以三个参数调用的时候是 DATE_SUB() 的同义词
    SUBTIME()                  减去时间
    SYSDATE()                  返回函数执行的时的时刻
    TIME_FORMAT()              格式化时间
    TIME_TO_SEC()              将时间参数转换为秒数
    TIME()                     返回参数表达式中的时间部分
    TIMEDIFF()                 将两个时间相减
    TIMESTAMP()                只有一个参数时,该函数返回 date 或者 datetime 表达式。
      当有两个参数时,将两个参数相加。
    TIMESTAMPADD()             在 datetime 表达式上加上一段时间
    TIMESTAMPDIFF()            在 datetime 表达式上减去一段时间
    TO_DAYS()                  将日期参数转换为天数
    UNIX_TIMESTAMP()           返回 UNIX 时间戳
    UTC_DATE()                 返回当前 UTC 日期
    UTC_TIME()                 返回当前 UTC 时间
    UTC_TIMESTAMP()            返回当前 UTC 日期和时间
    WEEK()                     返回参数的星期数
    WEEKDAY()                  返回日期参数时一个星期中的第几天
    WEEKOFYEAR()               返回日期参数是日历上的第几周 (1-53)
    YEAR()                     返回日期参数中的年份
    YEARWEEK()                 返回年份和星期
视图 
  PS: 视图无非就是存储在数据库中并具有名字的 SQL 语句,
    或者说是以预定义的 SQL 查询的形式存在的数据表的成分。
    视图可以包含表中的所有列,或者仅包含选定的列。
    视图可以创建自一个或者多个表,这取决于创建该视图的 SQL 语句的写法。
  视图,一种虚拟的表,允许用户执行以下操作: 
    以用户或者某些类型的用户感觉自然或者直观的方式来组织数据
    限制对数据的访问,从而使得用户仅能够看到或者修改（某些情况下）他们需要的数据 
    从多个表中汇总数据,以产生报表 
  CREATE VIEW   // 创建视图 
    PS: 视图可以创建自单个表、多个表或者其他视图。
      要创建视图的话,用户必须有适当的系统权限。具体需要何种权限随数据库系统实现的不同而不同。
    CREATE VIEW <view_name> AS 
    SELECT <col_list> 
    FROM <table_name>
    WHERE [<condition>]
    [WITH CHECK OPTION] // 创建视图的一个可选项 
      WITH CHECK OPTION 用于保证所有的 UPDATE 和 INSERT 语句都满足视图定义中的条件 
      如果不能满足这些条件,UPDATE 或 INSERT 就会返回错误。
    视图可以在特定的情况下更新: 
      SELECT 子句不能包含 DISTINCT 关键字
      SELECT 子句不能包含任何汇总函数（summary functions）
      SELECT 子句不能包含任何集合函数（set functions）
      SELECT 子句不能包含任何集合运算符（set operators）
      SELECT 子句不能包含 ORDER BY 子句
      FROM 子句中不能有多个数据表
      WHERE 子句不能包含子查询（subquery）
      查询语句中不能有 GROUP BY 或者 HAVING
      计算得出的列不能更新
      视图必须包含原始数据表中所有的 NOT NULL 列,从而使 INSERT 查询生效。
      如果视图满足以上所有的条件,该视图就可以被更新
    向视图中插入新行: 
      像在数据表中插入新行一样,向视图中插入新行 
    删除视图中的行: 
      删除数据行与更新视图和向视图中插入新行遵循相同的规则 
    删除视图: DROP VIEW <view_name>;
事务 
  PS: 事务是在数据库上按照一定的逻辑顺序执行的任务序列,
    既可以由用户手动执行,也可以由某种数据库程序自动执行。
    事务实际上就是对数据库的一个或者多个更改,
    如在表上创建更新或者删除记录的时,就在使用事务了。
    控制事务以保证数据完整性,并对数据库错误做出处理,对数据库来说非常重要。
    实践中,通常会将很多 SQL 查询组合在一起,并将其作为某个事务一部分来执行。
  事务控制: 
    有四个命令用于控制事务: 
    COMMIT: 提交更改,用于保存事务对数据库所做的更改 
      Example:  
        将会删除表中 age=25 的记录,然后将更改提交（COMMIT）到数据库中。
        DELETE FROM customers
        WHERE age = 25;
        COMMIT;
    ROLLBACK: 回滚更改,用于撤销尚未保存到数据库中的事务 
      ROLLBACK 命令只能撤销自上次 COMMIT 命令或者 ROLLBACK 命令执行以来的事务。
    SAVEPOINT: 在事务内部创建一系列可以 ROLLBACK 的还原点 
      PS: SAVEPOINT 是事务中的一个状态点,使得我们可以将事务回滚至特定的点,而不是将整个事务都撤销。
      SAVEPOINT <savepoint_name>;         // 在事务语句间创建保存点
      RELEASE SAVEPOINT <savepoint_name>; // 删除先前创建的保存点
      // ROLLBACK 命令可以用于撤销一系列的事务
      ROLLBACK TO SAVEPOINT_NAME; // 回滚至某一保存点 
    SET TRANSACTION: 事务设置 
      初始化数据库事务,指定随后的事务的各种特征 
      Example: 
        将某个事务指定为只读或者读写。
        SET TRANSACTION 命令的语法如下所示：
        SET TRANSACTION [ READ WRITE | READ ONLY ];
临时表 
  某些关系型数据库管理系统支持临时表。
  临时表能够像操作普通的 SQL 数据表一样,使用 SELECT、UPDATE 和 JOIN 等功能来存储或者操作中间结果。
  临时表有时候对于保存临时数据非常有用。 
  临时表会在当前的终端会话结束后被删除。 
    如果你在 PHP 脚本中操作数据库,那么临时表将在脚本执行完毕时被自动销毁。
    如果你是通过 MySQL 的客户端程序连接到 MySQL 数据库服务器的,那么临时表将会存在到你关闭客户端或者手动将其删除。
  临时表自 MySQL 3.23 起受到支持。但之前可使用堆表'heap table'  
  可用 DROP TABLE 来删除临时表 
克隆数据表 
  CREATE TABEL 不能复制出和原表拥有一样的索引、默认值等等的表 
  MySQL 关系型数据库管理系统中的操作方法 
    使用 SHOW CREATE TABLE 命令来获取一条指定了原表的结构、索引等信息的 CREATE　TABLE 语句。
    将语句中的表名修改为克隆表的名字,然后执行该语句。
    这样你就可以得到一张与原表完全相同的克隆表了。
    如果你还想要复制表中的数据的话,请执行 INSERT INTO ... SELECT 语句。
子查询'Sub Query'/嵌套查询'Inner Query' 
  PS: 是一种嵌套在其他 SQL 查询的 WHERE 子句中的查询 
    子查询用于为主查询返回其所需数据,或者对检索数据进行进一步的限制。
    子查询可以在 SELECT、INSERT、UPDATE 和 DELETE 语句中,
    同 =、<、>、>=、<=、IN、BETWEEN 等运算符一起使用。
  使用子查询必须遵循的规则: 
    子查询必须括在圆括号中。
    子查询的 SELECT 子句中只能有一个列,除非主查询中有多个列,用于与子查询选中的列相比较。
    子查询不能使用 ORDER BY,不过主查询可以。在子查询中,GROUP BY 可以起到同 ORDER BY 相同的作用。
    返回多行数据的子查询只能同多值操作符一起使用,比如 IN 操作符。
    SELECT 列表中不能包含任何对 BLOB、ARRAY、CLOB 或者 NCLOB 类型值的引用。
    子查询不能直接用在集合函数中。
    BETWEEN 操作符不能同子查询一起使用,但是 BETWEEN 操作符可以用在子查询中。    
使用序列
  序列是根据需要产生的一组有序整数：1, 2, 3 ...
  MySQL中使用序列 
    AUTO_INCREMENT 列：
      把某列定义为 AUTO_INCREMENT,然后将剩下的事情交由 MySQL 处理 

    
  




 