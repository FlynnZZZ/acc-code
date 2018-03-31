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
    注意：datetime 的时间和精度为 3.33 ms,而 smalldatetime 的时间精度为 1 min。
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
    CREATE INDEX     // 
  ALTER  修改 
    ALTER  TABLE 
  DROP   删除 
    DROP DATABASE <db_name> // 删除数据库 
    DROP TABLE <tb_name>    // 删除表 
    DROP INDEX  
  ★数据操纵 
  USE <db_name> // 选择数据库 
    若数据库架构中有多个数据库同时存在,则在开始操作前必须先选定其中一个 
  SELECT 检索,从数据库的表中取回所需的数据,并以表的形式返回,返回的表被称作结果集  
    SELECT <field>  // 需查询的字段名
      // *          表示[表中的]所有字段
      // 逗号分隔    具体的多个字段,如: name,age,sex 
    FROM <table>    // 查询的表名  
  INSERT 插入记录 
    // key对应val添加数据
    INSERT INTO <tb_name> (<col1>, <col2>, ...)   
    VALUES (<val1>, <val2>, ...);  
    // 当省略keys时表示为所有字段添加值,但值必须按照表中的顺序   
    INSERT INTO <tb_name> 
    VALUES (<val1>, <val2>, ...); 
  UPDATE 修改记录 
    UPDATE <tb-name>
    SET col1=val1,col2=val2,... 
    WHERE <condition>   // WHERE 可选,去掉后修改所有行 
  DELETE 删除记录 
    DELETE FROM <tb-name> 
    WHERE <condition>;    // WHERE 可选,去掉则删除所有行 
  ★数据控制 
  GRANT  赋予用户特权
  REVOKE 收回赋予用户的特权 
  ★子句 
  WHERE    有条件地从单个表中取回数据或者将多个表进行合并 
    PS: 可用于 SELECT、UPDATE、DELETE 等语句 
    WHERE <condition> // 条件   
      Example: 
        SELECT name FROM group WHERE age=18  
  TOP      从一张数据表中取回前 N 个或者 X% 的记录,所有的数据库系统都不支持 TOP 子句
  LIMIT    MySql中的 TOP
  ROWNUM   Oracle中的 TOP 
  ORDER BY 根据一列或者多列的值,按照升序或者降序排列数据 
    某些数据库默认以升序排列查询结果 
    SELECT <col_list> 
    FROM <tb_name> 
    [WHERE <condition>] 
    [ORDER BY <col_list>] [ASC | DESC];
  GROUP BY 与 SELECT 语句结合在一起使用,将相同数据分成一组 
    PS: 通常需结合 函数 来使用 
    SELECT <col_list> 
    FROM <tb_name> 
    WHERE [<conditions>] 
    GROUP BY <col_list> 
    ORDER BY <col_list> 
  ★关键字 
  DISTINCT  同 SELECT 语句一起使用,可去除所有重复记录,只返回其中一项 
    SELECT DISTINCT <col_list>
    FROM <tb_name>
    WHERE [<condition>] 
  ▼连接运算符
  // 待分类 
  SHOW 
  HAVING 
  DESC 
  TRUNCATE TABLE  
  COMMIT 
  ROLLBACK 
操作符: 主要用于在SQL语句的 WHERE 子句中执行各种操作 
  PS: 每个操作符都是一个保留字 
  ★算术运算符
  +	      相加 
  -	      相减 
  *	      相乘 
  /	      相除 
  %	      取余,返回余数 
  ★比较运算符
  =	      返回两个操作数的值是否相等的布尔值 
  !=	    返回两个操作数的值是否相等的布尔值 
  XX      检查两个操作数的值是否相等,如果不等则返回 true 
  >	      返回左边的操作数是否大于右边的操作数的布尔值 
  <       返回左边操作数是否小于右边操作数的布尔值 
  >=	    返回左边的操作数是否大于或等于右边操作数的布尔值 
  <=      返回左边的操作数是否小于或等于右边的操作数的布尔值 
  !<	    返回左边的操作数是否不小于右边的操作数的布尔值 
  !>	    返回左边的操作数是否不大于右边的操作数的布尔值 
  ★逻辑运算符 
  ALL	    用于将一个值同另一个值集中所有的值进行比较 
  AND     返回连接的所有条件是否都为真的布尔值 
  OR      返回连接的条件中是否有真的布尔值 
  AND	    运算符使得在 WHERE 子句中可以同时存在多个条件 
  ANY	    运算符用于将一个值同条件所指定的列表中的任意值相比较 
  BETWEEN	给定最小值和最大值,BETWEEN 运算符可以用于搜索区间内的值。
  BETWEEN xx AND xx  处于某个范围之间 
  EXISTS	运算符用于在表中搜索符合特定条件的行。
  IN	    运算符用于将某个值同指定的一列字面值相比较。
  LIKE	  运算符用于使用通配符对某个值和与其相似的值做出比较 
  NOT	    操作符反转它所作用的操作符的意义
    例如,NOT EXISTS、NOT BETWEEN、NOT IN 等。这是一个求反运算符。
  OR	    运算符用于在 SQL 语句中连接多个条件。
  IS NULL	用于将某个值同 NULL 作比较。
  UNIQUE	运算符检查指定表的所有行,以确定没有重复。
  用于否定条件的运算符
通配符: 
  %    零个、一个或者多个字符 
  _    单个数字或者字符 
函数 
  用于在表上或者表中的特定列上执行聚合数据运算
  COUNT()  
  MAX()  
  MIN()  
  AVG()
  SUM()
  SQRT()
  RAND()
  CONCAT()


 