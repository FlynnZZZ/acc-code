插件类工具
ueditor 百度富文本编辑器 
  打开图片上传框反应缓慢 
    将以下文件中的'image/*'改为'image/jpg,image/jpeg,image/png'即可
    文件 : 'ueditor\dialogs\image\image.js'  'ueditor.all.min.js'
    修改内容
      mimeTypes: 'image/*' 
      改为  
      mimeTypes: 'image/jpg,image/jpeg,image/png'  
    或者全局搜索将所有 'image/* '  改为  'image/jpg,image/jpeg,image/png'
--------------------------------------------------------------------------------
网络收集 
接口
  百度分类图片 
    URL:'http://image.baidu.com/data/imgs' 
    method : "GET" 
    参数: 
      col  : '大类', // 如 美女
      tag  : '分类', // 小清新
      pn : num,      // 开始条数
      rn : num,      // 显示数量
      p : 'channel'
      from : 1 ,
      sort : 0 ,   // 可以为0和1,作用未知 
    Example: 
      'http://image.baidu.com/data/imgs?col=美女&tag=小清新&pn=10&rn=10&p=channel&from=1&sort=0'
--------------------------------------------------------------------------------
