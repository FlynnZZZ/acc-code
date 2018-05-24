ueditor,百度富文本编辑器 
  打开图片上传框反应缓慢 
    将以下文件中的'image/*'改为'image/jpg,image/jpeg,image/png'即可
    文件 : 'ueditor\dialogs\image\image.js'  'ueditor.all.min.js'
    修改内容
      mimeTypes: 'image/*' 
      改为  
      mimeTypes: 'image/jpg,image/jpeg,image/png'  
    或者全局搜索将所有 'image/* '  改为  'image/jpg,image/jpeg,image/png'
  需在appcache启动的服务中测试demo 
  'umeditor.config.js'配置文件 
    window.UMEDITOR_HOME_URL   用于指定该文件的路径,推荐使用绝对路径[如'/src/...']  
  视频网址插入 
    xssFilter 导致插入视频异常,编辑器在切换源码的过程中过滤掉img的'_url'属性[用来存储视频url] 
    ueditor.config.js 配置文件中,xss过滤白名单中设置  
      whitList:{ } 中
      对 img 增加 '_url' 属性
      在最后新增3给标签,使Ueditor分别能支持 embed 标签和 iframe 标签
      ,source: ['src', 'type']
      ,embed: [
        'type', 'class', 'pluginspage', 'src', 'width', 'height', 'align', 
        'style', 'wmode', 'play', 'autoplay','loop', 'menu', 'allowscriptaccess',
        'allowfullscreen', 'controls', 'preload'
      ]
      ,iframe: [
        'src', 'class', 'height', 'width', 'max-width', 
        'max-height', 'align', 'frameborder', 'allowfullscreen'
      ]
    ueditor.all.js 中,实现视频可插入且可实时预览 
      me.commands["insertvideo"] 方法中更改如下两处: 
      cl = (type == 'upload' ? 'edui-upload-video video-js vjs-default-skin':'edui-faked-video'); [可不用更改 ?]
      html.push(creatInsertStr( vi.url, vi.width || 420,  vi.height || 280, id + i, null, cl, 'image'));
      改为
      //此处将 edui-faked-video 改为 edui-faked,防止后面将此处替换为image标签
      cl = (type == 'upload' ? 'edui-upload-video video-js vjs-default-skin':'edui-faked');
      // 此处将image改为embed实现实时预览视频,且修复了第一次插入视频保存后,刷新后再保存会导致视频丢失的bug
      html.push(creatInsertStr( vi.url, vi.width || 420, vi.height || 280, id + i, null, cl, 'embed'));
      解决插入视频框无法自动关闭的问题: 
      注释接下来的for循环 
      for(var i= 0,len=videoObjs.length;i<len;i++){
        ...
      }
      将 'switch' 中 'embeb'项中的如下字符删除:  
      str = '<embed type="application/x-shockwave-flash" class="' + classname + '" pluginspage="http://www.macromedia.com/go/getflashplayer"' +
  视频上传 
  API 
    var ue = UE.getEditor(<id>) 
    ue.getContent()  获取编辑器的HTML 
    ue.setContent (htmlStr)  设置编辑器内容  
UMeditor,


