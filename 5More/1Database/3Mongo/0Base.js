◆MongoDB驱动 
mongodb,连接MongoDB的基础库 
安装&使用 
  PS: 操作默认返回Promise对象 
  $ npm i -S mongodb  // 安装 mongodb库 
  const { MongoClient } = require('mongodb')  // 引入数据库驱动,并得到到数据库客户端对象  
  MongoClient.connect(url, callback);         // 通过'MongoClient'连接数据库 
    Input: 
      url   str,Mongo数据库的地址 
        如: 'mongodb://localhost:27017/dbname' 
          localhost  主机:本机
          27017      端口:默认端口
          dbname     数据库的名称 
      function(err, dbObj) { }  // 回到函数 
        err     obj/null,错误对象 
        dbObj   obj,数据库对象 
    Output: 
  dbObj,数据库对象 
    dbObj.close()   关闭数据库 
    dbObj.collection(<ctName>)   ctObj,返回指定的集合对象 
  ctObj,集合对象   
    添加
    ctObj.insertOne(<dcObj>,callback)     // 添加一个文档 
    ctObj.insertMany(<dcList>,callback)   // 添加多个文档  
      Input: 
        dcList   多个文档组成的数组 
        function(err, result){ }
      Output:   
      Example: 
        ctObj.insertMany([
          { k1: 'a' ,k2: 'b' }
          ,{ k1: 'a' ,k3: 'b' }
          ,{ k2: 'a' ,k3: 'b' }
        ]
        ,function(err,result){
          console.log('insertMany-success',result);
        })
    ctObj.insert(<dcObj>,callback)        // 添加文档,已废弃  
      Example: 
        collection.insert({
          name:"myName"
          ,age:"myAge"
        }
        ,function(err,result){
          if(err){
            console.error(err);
          }
          else{
            console.log("insert result:",result);
          }
        })
    查询 
    ctObj.findOne(<condition?>,<fields?>).toArray(callback) // 查询符合条件的第一条文档 
    ctObj.find(<condition?>,<fields?>).toArray(callback)    // 查找符合条件的所有的文档 
      Input: 
        condition  obj,可选,查询的条件,默认: {},表示所有 
          {
            k1: <val>   // k1字段为val的所有文档 
            k2: {       // k1字段大于15的所有文档 
              $gt: 15 
            } 
            $or: [      // 以下条件满足一条的所有文档
              { 
                k1: <val> 
              }
              ,{ 
                k2: <val> 
              } 
              ,...
            ] 
          }
        fields     obj,可选,查询的字段,默认打印所有字段  
          格式: {
            k1: 0/1   // 0: 表示不显示该字段,1: 显示该字段   
            _id: 0    // _id字段是默认显示的,不需要则需明确指定为 0 
            ,..
          }
        function(err,docs){ }
          err   obj,错误对象 
          docs  arr,查询到的文档组成的数组 
      Output: 
      Example: 
        collection.find({
          k1: 'a'
        })
        .toArray(function(err, docs) {
          if(err){
            console.error(err);
          }
          else{
            console.log("find result:",result);
          }
        });
    更新
    ctObj.updateOne(<condition>,<handle>,callback)     // 更新符合条件的第一个文档 
      Input: 
        condition   更新的条件 
        handle      更新的操作 
        function(err,result){ }
      Output: 
      Example: 
        collection.updateOne({ 
          a : 2 
        }
        ,{ 
          $set: { 
            b : 1 
          } 
        }
        ,function(err, result) {
          if(err){
            console.error(err);
          }
          else{
            console.log("update result:",result);
          }
        } );
    ctObj.updateMany(<condition>,<handle>,callback)    // 更新符合条件的所有文档   
    ctObj.update()   // 已废弃 
    删除 
      通常不会直接进行物理删除,而是使用一个字段如'_deleted',默认设置为false,
      删除是设置为true,进行逻辑删除 
    ctObj.deleteOne(<condition>,callback)     // 删除符合条件的第一条文档 
      Input: 
        condition  
        function(err,result){ }
      Output: 
      Example: 
        ctObj.deleteOne({ 
          a : 3 
        }
        ,function(err, result) {
          if(err){
            console.error(err);
          }
          else{
            console.log("delete result:",result);
          }
        });
    ctObj.deleteMany(<condition>,callback)    // 删除查询到的所有文档 
  dcObj,文档对象 
  cursor,游标对象 
    Instance: 
      ctObj.find(<condition>)   // 返回cursor对象 
    .toArray(callback)        // 转换成数组并回调 
--------------------------------------------------------------------------------
Mongoose,对mongodb库的封装 
  $ npm i mongoose // 安装 
  var mongoose = require("mongoose")
  var url = 'mongodb://<username>:<password>@<hostname>:<port>/<databasename>' // 完整的资源定位符 
    username   可选 
    password   可选 
    port       可选 
  var db = mongoose.connect(url)  // 连接数据库
  var UserSchema = new mongoose.Schema({   // 定义集合的格式 
    uid: {
      type: Number
      ,unique: true  // 唯一 
    }
    ,username: {
      type: String
      ,default: 'aaa'
      ,trim: true            // 修饰符,去掉首尾空格 
      ,set: function(data){  // setter修饰符,设置值时触发
        return data;  // 返回值作为设置的值 
      }
      ,get: function(data){  // getter修饰符,读取值时触发 
        return data; // 返回值作为读取的值 
      }
      ,index: true   // 添加索引 
    }
    // ,username: String    // 简写形式
    ,createtime: {
      type: Date
      ,default: Date.now   // 使用函数
    } 
    // ,createtime: Date 
    ,firstName: String  // 姓
    ,lastName: String   // 名
    
    // 验证器 
    ,key1: {
      ...
      ,required: true   // 该字段是否必填 
      // Number 类型具有的验证器 
      ,max: <num>  // 允许的最大值 
      ,min: <num>  // 允许的最小值 
      // String 类型具有的验证器 
      ,enum: [ member1,.. ] // 值必须在枚举的列表中  
      ,match: /\d+/g        // 值需满足指定的正则 
      // 自定义验证器 
      ,validate: function(key){
        return <bol>;  // 验证成功则返回 true 
      }
    }
  }) 
  UserSchema.virtual('fullName').get(function(){   // 虚拟属性 
    return this.firstName+"."+this.lastName;
  })
  UserSchema.statics.fn1 = function(arg?,..){    // 定义静态方法,通过创建的模型来直接调用  
    // 
  }
  UserSchema.methods.fn2 = function(arg?,..){    // 定义实例方法,通过模型的实例来调用 
    // 
  }
  中间件: 在某些操作前/后,执行一些自定义的操作 
    文类中间件: init validate save remove 
    查询中间件: count find findOne update findOneAndRemove findOneAndUpdate 
  UserSchema.pre('save', true ,function(next, done){   // 定义前置中间件 
    next() 
    done() 
  })    
  UserSchema.post('save' ,function(next){    // 定义后置中间件 
    next() 
  })   
  var User = mongoose.model('User',UserSchema)   // 创建模型 
    mongoose.model('User',{    // 直接使用对象定义Schema 
      uid: Number
      // ,...
    })   
  DBRef: 集合间的交叉引用,如一个集合中的文档引用另一个集合中的文档 
  var News = mongoose.model('News',{
    title: String
    ,author: {
      type: mongoose.Schema.ObjectId 
      ,ref: 'User'
    }
  })
  var user = new User({                          // 添加数据,返回添加的文档 
    uid: 1
    ,username: 'aaa'
  })
  var news = new News({
    title: 'aaa'
    ,author: user 
  })
  user.save(function(err){
    if (err) {
      console.log(err);
      return ;
    }
    news.save(function(err1){
      if (err1) {
        console.log(err1);
        return ;
      }
      
      News.findOne().populate('author').exec(function(err ,doc){
        console.log(err, doc); // 
      })
    })
    // ...
  })
  User.find(<condition> ,function(err ,docs){
    if (err) {
      console.log(err);
      return ;
    }
    console.log(docs);
  })
  












