NodeJS的ORM模块 
  ORM,'Object Relational Mapping'
    一种用于实现面向对象编程语言里不同类型系统的数据间转换的程序技术 
waterline 
  将文档数据库中的一个文档/关系数据库表中的一行,映射为JS的一个对象 
  通过操作对象来完成对数据库的操作 
特点 
  支持大部分主流数据库,
  脱离SQL 
  使用同样的代码操作不同的数据库 
流程 
  $ npm i waterline sails-mysql sails-mongo 
  var Waterline = require("waterline")
  适配器 
    将统一的操作代码,转换为某种数据库所支持的数据库操作 
    不同的数据库需使用不同的适配器 
  var mysqlAdapter = require("sails-mysql")  // MySql的适配器 
  var mongoAdapter = require("sails-mongo")  // mongo的适配器 
  var adapters = {     // 配置的适配器 
    default: 'mongo'       // 默认使用mongo适配器 
    ,mongo: mongoAdapter
    ,mysql: mysqlAdapter 
  }
  连接 
    通过适配器及对应的连接信息,与数据库进行连接 
  var connections = {  // 连接的配置 
    mongo: {
      adapter: mongo
      ,url: 'mongodb://localhost/<dbName>'
    }
    ,mysql: {
      adapter: mysql
      ,url: 'mysql://localhost/<dbName>'
    }
  }
  数据集合 
    定义具体的数据类型[关系数据库中的表,文档数据库中的集合]
  var User = Waterline.Collection.extend({
    identity: 'user'  // 设置数据集合的名称 
    ,connection: 'mongo'   // 指定使用的数据库连接 
    ,schema: true     // 是否强制模式 
    ,attributes: {    // 定义字段 
      username: {
        type: 'string'   // 定义数据类型 
        required: true   // 校验器: 是否必须 
      }    
      ,birthday: {
        type: 'date'   // 时间类型 
        ,after: new Date('1991-01-01') // 校验器: 时间需在1991年之后 
        ,before: function(){           // 校验器: 
        }
      }    
      ,createTime: {
        type: 'date'
      }
    }
    ,beforeCreate: function(val,fn){
      val.createTime = new Date()
      return fn();
    }
  })
  校验器 
    执行数据检查 
    需引入其他模块来实现 
    anchor 
      预定义的数据校验器,支持常规检查、时间检查、经纬度坐标检查、email地址检查等等 
      支持自定义的数据校验器 
  生命周期回调 
    在某些特定的操作中调用设定的方法 
    beforeCreate 
    beforeValidate 
    beforeUpdate 
    beforeDestroy 
    afterCreate  
    afterValidate 
    afterUpdate 
    afterDestroy 
  其他执行 
  var orm = new Waterline()  // 实例化 
  orm.loadCollection(User)   // 加载数据集合 
  orm.initialize({           // 初始化,需在项目的运行前  
    adapters: adapters
    ,connections: connections 
  }
  ,function(err ,models){
    // models   // 初始化后返回的实例 
    if (err) {
      console.error(err)
      return ;
    }
    dbHandle(models)
  });          

  function dbHandle(models){  // 定义的数据库操作 
    models.collections.user.create({   // 创建
      username: 'abc'
    }
    ,function(err ,user){
      if (err) {
        console.error(err)
        return ;
      }
      
      
    })
    
  } 



