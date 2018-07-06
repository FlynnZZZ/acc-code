XML'eXtensible Markup Language'可扩展标记语言 [JS高程521,第18章]
  PS: 与HTML一样都属于SGML标准通用语言 
    在使用XML传输信息时,若数据本身为XML文件,则不需设置'Content-Type',
    若由后台程序动态生成,则需设置为'text/xml'  
  语法 
    任何起始标签都必须有一个结束标签,简化写法即自闭合标签 
    所有的属性都需要有值,使用双引号括起来 
    XML文档只能有一个顶层元素 
  解析XML 
    在jQuery中和解析DOM一样可使用操作DOM的方法来操作XML  
E4X'ECMAScript for XML'ECMAScript对XML的可选扩展 [JS高程564,第19章]
  PS: 以便在ECMAScript中添加原生的XML支持,以 ECMA-357 标准的形式发布 
    为处理XML定义了新的语法,也定义了特定于XML 的对象 