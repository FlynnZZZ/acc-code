Atom 
  用户全局设置: 'C:/Users/f/.atom/config.cson' 
    悬挂缩进: 2
    字体设置: Consolas,楷体 
      PS: consolas为atom默认字体
        字体间使用逗号隔开,第一个定义英文字体,第二个定义中文字体.
    取消勾选: ctrl+滚轮,调整字体大小
    忽略的文件: 
      .git, .hg, *.svn, .dS_Store, ._*, thumbs.db,
      *.docx, *.doc, *.pdf,*.jpg,*.project,*.lnk,*.ini,*.exe
    非实体字符'Non Word Characters' 
      // @/\()"':,.;<>~!#$%^&*|+=[]{}`?…、◆★●■▲▼（）,。-[]【】〖〗『』《》
  用户键盘映射: 'C:/Users/f/.atom/keymap.cson' 
    枚举: 
      自定义 
        Now         Prev              功能   
        ★键盘键位更改  
        f1          backspace         删除  
        f5          enter             换行  
        ★显示/隐藏/打开/关闭 
        alt-n       ctrl-shift-N      新建窗口 
        alt-m       ctrl-shift-A      添加项目文件夹 
        alt-l       ctrl-shift-T      恢复关闭的页面  
        alt-\       ctrl-|            在文件目录中定位当前文档 
        alt-1       ctrl-alt-{        折叠所有 
        alt-2       ctrl-alt-}        展开所有 
        alt-3       ctrl-alt-[        折叠当前 
        alt-4       ctrl-alt-]        展开当前 
        alt-b       ctrl-alt-o        浏览器中打开文档 
        alt-p                         浏览器兼容写法 
        ★查询/选中  
        f4          shift-f3          查找时,到上一个 
        ctrl-e      ctrl-u            取消'ctrl-d'的选中 
        ctrl-p      alt-f3            选中所有匹配项   
        alt-q       ctrl-alt-,        选中括号内内容 
        alt-t       ctrl-alt-backspace  删除匹配括号 
        alt-f       ctrl-m            标签跳转 
        ★行操作 
        alt-c       ctrl-l            行选中 
        alt-v       ctrl-shift-D      行复制  
        ctrl-q      ctrl-/            行注释 
        alt-a       ctrl-[            行负缩进 
        alt-s       ctrl-]            行缩进 
        alt-z       ctrl-j            行合并  
        alt-enter   ctrl-shift-enter  行前插入 
        alt-x       ctrl-alt-f2       行标记 
        alt-d       ctrl-shift-K      行删除 
        ★不常用 
        alt-u       ctrl-k ctrl-u     字母大写 
        alt-i       ctrl-k ctrl-l     字母小写 
      默认  
        ★显示/隐藏/打开/关闭  
        ctrl-,         打开设置面板 
        ctrl-o         打开文件 
        ctrl-n         新建页面  
        ctrl-w         关闭当前标签 
        ctrl-\         开关目录树 
        ctrl-space     激活代码提示 
        ctrl-shift-o   打开文件夹 
        ctrl-home      移到文档开始
        ctrl-end       移到文档结束
        ctrl-shift-s   保存所有打开的文件
        ctrl-shift-u   调出切换编码选项
        ★查询相关 
        f2             跳到当前文件的下一条书签
        ctrl-d         选取和当前单词相同的下一处
        ctrl-f2        列出当前工程所有书签
        ctrl-g         跳转到指定的行
        ctrl-f         当前页查找
        ctrl-shift-f   在整个文件夹中查找  
        ctrl-shift-p   调出命令查询框 
          可查询并执行命令
        ★行操作 
        ctrl+↑/↓       行移动
        ctrl-enter     在当前行的末尾回车
        ★光标操作  
        ctrl-click     增加新光标 
        ctr-→/←        单词单位移动 
        alt-→/←        单词单位移动 
        ctrl-alt-↑/↓   光标多选
        ★文件目录树操作  
        a             新增文件 
        shift-a       新增文件夹 
        m             修改文件名  
        delet         删除文件 
        ★不常用 
    未占用键汇总: 
      ★左
      // alt-f1 f2
      // alt-`
      // alt-w e r 
      // alt-g
      // ctrl-3 4
      ★右
      // alt- f7 f8 f9 f10
      // alt-6 7 8 9 0 - =
      // alt-y [ ]
      // alt-h j k l ; '
      // alt-, . /
      // ctrl-`
      // ctrl-u i
      // ctrl-j k ; '
      // ctrl-n m , . /
    Question: 
      如何切换到下一个和当前词相同的词
  用户样式设置: 'C:/Users/f/.atom/styles.less' 
    // 设置技巧: ctrl-shift-i 打开调试面板,然后调试样式 
  用户代码片段: 'C:/Users/f/.atom/snippets.cson' 
  插件 
    自带插件 
      about                  关于Atom的信息查看 [help-about Atom]
        禁止后可能影响软件的自动升级
      autocomplete-atom-api  功能未知
      autocomplete-plus      完善自带 autocomplete,有二度设置
        勾选 allowed backspace to trigger autocomplete   当删除时也会激活可选列表选项
        'autocomplete-plus:activate' 将其快捷键 从 ctrl-space 改为 alt-e
          默认的ctrl-space 快捷键未生效
      autocomplete-Snippets  
      snippets               代码片段 
        通过关键词来扩展为代码块——tab/enter 
          使用alt+shift+s来查看所有的扩展 (?)
        Atom-自定义自动填充代码 Snippets(在这里我把 snippet 理解为代码块。)
          打开定义的文件
            打开 snippets.cson 文件,windows 平台的路径为 C:\users\用户名\.atom\snippets.cson。
          具体定义的方式
            输入snip,回车,就得到一个 snippet 模板。如下
              '.source.js':
              'Snippet Name':
              'prefix': 'Snippet trigger'
              'body': 'hello World!'
              解读
                '.source.js' 目标文件类型为 .js
                'Snippet Name' 要新建的 snippet 的名称
                'prefix' 触发当前 snippet 的代码
                'body' 要填充的代码
          Example: 例如给 C 语言的 if 写一个 snippet。
            '.source.c':
            'if':
              'prefix': 'if'
              'body': 'if($1){$2}'
            $1 表示光标的默认位置
            $2 按下 tab 键,光标跳到的第二个位置,以此类推
            另外,使用${1:'replaced'}替换$1即可转换光标到选定状态,选定内容为replaced

            在要填充的代码中使用回车并不能使代码填充以后自动换行,自动换行要使用\n,或者用"""将要填充的代码包起来。
            '.source.c':
            'if':
              'prefix': 'if'
              'body': """
                if($1)
                {
                    $2\n}
              """
            要给 C 语言文件定义多个 snippet ,只需在.source.c下从添加新的 snippet 名称写起。
            '.source.c':
            'if':
              'prefix': 'if'
              'body': """
                if($1)
                {
                    $2\n}
              """
            'while':
              'prefix': 'while'
              'body':"""
                while($1)
                {
                    $2
                }
              """
              //注:使用"""创建长模板
        自定义Snippets的扩展词时,定义的格式的确定
          在要定义的文档类型下,ctrl-shift-p   输入代码Editor: log Cursor Scope
          弹出字符如 txt格式的为 text.plain ,则.text.plain类似于.source.js表示一种文件格式
      autoflow               功能未知
      autosave               失焦或关闭时自动保存
      bookmarks              书签功能支持
      bracket-matcher        括号匹配功能 
        设置
          autocomplete characters [激活括号特性匹配的字符对]
            (), [], {}, "", '', ``, “”, ‘’, «», ‹›,<>,《》,（）,[],『』,【】,〖〗,><
          pairs with extra newline[在其中间换行时,自动多添加一行]
            (), [], {}
      find-and-replace       查找和替换 
        正则查找 
          将查找内容的部分进行替换 
            Example:
            查找 1122 将其替换为 11AA
            (11)22;
            $1AA;
            
            查找大写字符,在其前加上换行
            ([A-Z])
            \n$1
          清除空行:  \r\n\r\n   替换为 \r\n 
          在字符后换行:  a          替换为 a\n\t 
          查找词: \b<word>\b     
      go-to-line             跳转到指定行 
      command-palette        命令面板 
        快捷键  ctrl-shift-p
      settings-view          设置页面 
        快捷键
          ctrl-,    打开设置页
          ctrl-.    打开快捷键绑定页[self] 
            PS: '1.22.1' 不再支持该快捷键 
            '.platform-win32, .platform-linux':
              'ctrl-.': 'settings-view:show-keybindings'
      symbols-view          查看变量
        变量、函数 查找快捷键 ctrl-r
      tabs                  标签栏
        add new tabs at end  始终在最后打开文件
      timecop               统计加载时间
      tree-view             文件目录 
        设置
          focus on reveal  激活文件时,在文件目录定位
        快捷键
          ctrl-\         toggle,开关文件目录
          ctrl-shift-\   reveal active file,在目录中定位到当前文件
      wrap-guide            标尺线
      markdown-preview      在编辑器中以markdown展示 
        快捷键 ctrl-shift-m
      ★语言支持类插件 
      language-css           css语言支持 
        将'.'号从'非实体字符'中去除
      language-less          less语言支持 
        将'.'号从'非实体字符'中去除
      language-sass          sass语言支持 
        将'.'号从'非实体字符'中去除
      可禁用列表 
        about             关于Atom的介绍相关 
        archive-view       
        background-tips 
        delek 
        dev-live-reload 
        exception-reporting 
        fuzzy-finder 
        git-diff          对比差异
        github            
        image-view        图片预览 
        incompatible-packages 
        keybinding-resolver 
        link              显示连接 
        markdown-review 
        metrics           发送收集的信息 
        open-on-github    在github打开 
        package-generator 
        spell-check       拼写检查 
        symbols-view    
        update-package-dependencies 
        Welcome           欢迎页 
        whitespace   空白符设置 
          取消勾选
            Ensure Single trailing Newline      自动去掉文档最后的空行
            ignore Whitespace On Current line
            remove trailing Whitespace          自动删除行末空格
    社区扩展: 'C:/Users/f/.atom/packages'  
      aaa-snippets               自定义的代码片段   
      minimap                    缩略图 
        相关设置: 
        Absolute Mode   在缩略图下方显示代码  true 
        Char Width      缩略图代码宽度比例    0.7     
      minimap-highlight-selected 缩略图高亮
      color-picker               快捷颜色选择 
        颜色选取插件,点击颜色值弹出颜色选择板进行颜色选择,
        或直接使用快捷键ctrl+alt+c进行颜色值的选择插入.
      autocomplete-project-paths 路径补全 
        Question: 路径补全应为/而非\
      highlight-selected         高亮选中词 
      pigments                   根据颜色值显示颜色 
      regex-railroad-diagram     正则查看 
      remember-folds             记录折叠的状态
      open-in-browsers           在浏览器中快捷打开html 
        安装此插件会在编辑器下方添加浏览器的小图标,点击在浏览器中打开正在编辑的文档.
      atom-wx                    '.wxml','.wxss'语法高亮 
      language-vue               '.vue'语法高亮 
      选用插件 
        atom-beautify              代码格式美化
        autocomplete-cocos2d-js    cocos的补全插件
        autoprefixer               用来补充css前缀的,会自动生成多个浏览器的前缀 
          自定义快捷键 alt-m
        file-icons                 显示文件图标 
        simplified-chinese-menu    菜单汉化 
        atom-wrap-in-tag           在选中字符外增加标签 
          (该快捷键有bug,不起效,使用 'alt-w': 'unset!' 命令来解决)
          自定义默认开始的标签
            设置 open-config-folder 
            找到   atom-wrap-in-tag 下的 wrap-in-tag.coffee 文件
            修改 代码
              tag = 'div'

              start:
                from: [tagrangePos.start.row, tagrangePos.start.column+1]
                to: [tagrangePos.start.row, tagrangePos.start.column+4]
              end:
                from: [tagrangePos.end.row, tagrangePos.end.column+7],
                to: [tagrangePos.end.row, tagrangePos.end.column+10]
        restore-windows            启动时加载之前的多窗口 
          最早关的窗口加载时最后加载
          统一全部关闭,则该插件不能准确的记住窗口下次打开的先后顺序
            若无项目文件夹,则默认不加载
          记录状态 如 标签等
  总结 
    可在命令行中使用Atom打开当前文件: atom ./ 
    1.18.0 折叠正常,1.19.0 折叠非标准内容的文件存在bug,并且也不能记住折叠的状态  
    1.20.0 开启atom-beautify导致内存占用过高  
  Suggestion&Question 
    优点总结
      折叠功能优秀
      选中字符后直接增加括号,则选中的内容被包括在括号内
      可无限回退,上次编辑过的文档在关闭后,下次仍可以回退
    上下移动多行会改变缩进
      解决方法:使用剪切代替行移动操作.
      相对的,可以使用此特性用于格式化代码
    无 块注释 功能?
    折叠功能
      html格式文件 行内标签折叠不能达到块便签的效果
    snippets 插件的自定义提示词,激活的关键字不能有重复
Notepad2 
  PS:一个用来取代Notepad的免费程序,绿色软件,安装完毕后只有一个主程序;
    具有显示行号、内建各种程序语法的高亮度显示、改变背景颜色、支持Unicode与UTF-8的功能,
    具有[行列功能],可以进行区块模式选取的编辑。
  编辑器设置
    PS: 在更改设置后需要进行 设置-立即保存设置,
      软件会在其存放的位置生成一配置文件,后续设置才会生效。
    文件  
      编码
        默认编码: utf-8
        勾选 以UTF-8模式打开7-bit ASCII文件
        勾选 以DOS-437模式打开8-bit的nfo或diz文件
    查看 
      语法方案 :  使打开的文本默认有折叠功能
        选择 'Python Script'
        勾选 '设置选中的方案为默认'
      自定义方案: 可对不同类型的文档,如txt、html等进行字体、字体颜色、背景等设置
        点击所选类目进行展开进行各项设置.
        'current line background(color)'  当前行背景颜色
      默认字体 ---   '楷体' '常规' '13'
      自动换行        勾选 
      显示缩进栏线    勾选 
      显示空格        勾选 
      显示配对括号     勾选 
      高亮当前行      勾选 
      行号            勾选 
      代码折叠        勾选 
    设置 
      将制表符作为空格插入    勾选 
      自动换行设置--- '+1缩进' '无' '无' '任意符号换行'
      自动缩进文本            勾选 
      自动完成单词            勾选 
      '保存窗口位置': 开启文档时的默认窗口位置及窗口大小设置
      窗口标题显示--- 显示完整路径和名称
      显示工具栏         勾选  
      自定义工具栏
        保留: 重做 查找 替换 自动换行 自定义方案 切换所有折叠
        其他全部去除
      显示状态栏              勾选 
      退出时保存设置          勾选 
  快捷键 
    Ctrl+W                   开关自动换行
    Ctrl+↑↓                  上下滚动显示,在屏幕显示范围内光标位置不动
    Ctrl+left/right          单词跳转
    Shift+up/down/left/right 文本选择
    Ctrl+Shift+up/down       行移动
    Ctrl/Alt+D               复制当前行
    Ctrl+F2                  行标记
    Ctrl+Shift+D             删除行
    Tab                      行缩进
    Shift+Tab                取消行缩进
    Insert                   光标样式切换, _和∣            
    Alt+Q                    在选定文本的前后插入字符
    Alt+Z/U                  移除行首/尾字符
    Alt+M                    行首/尾 增加/删除字符
    Alt+leftmouse            多行单列操作
    Alt+r                    删除选中区域空行
    Alt+x                    插入html标签
      将所需包括的内容选中,Alt+X完成输入.
    Ctrl+Shift+s             将选中区域的制表符转换为空格
    Ctrl+Shift+t             将选中区域的空格转换为制表符
  总结 
    将光标移到行的最左端--显示行号的位置,点击或拖动进行行选择。
  Suggestion&Question:
    中文字体及非中文字体单独设置
    将打开的多个文件放在一个窗口中,通过标签切换.
    自定义快捷键
VSCode 
  设置 
    文件 首选项 用户设置

    文件 首选项 键盘快捷方式
  快捷键: 'C:/Users/f/AppData/Roaming/Code/User/keybindings.json' 
    PS: 参照Atom快捷键设置 
    枚举: 
      ★参照Atom修改 
      editor.action.commentLine              ctrl+q     行注释 
      editor.action.deleteLines              alt+d      行删除 
      editor.action.joinLines                alt+z      行合并 
      editor.action.outdentLines             alt+a      行减少缩进 
      editor.action.indentLines              alt+s      行增加缩进 
      editor.action.copyLinesDownAction      alt+v      行向下复制 
      editor.action.moveLinesDownAction      ctrl+down  行下移 
      editor.action.moveLinesUpAction        ctrl+up    行上移 
      editor.action.insertLineAfter          ctrl+enter 行下插入 
      editor.action.insertLineBefore         alt+enter  行上插入 
      editor.unfoldAll                       alt+2      展开所有 
      editor.foldAll                         alt+1      折叠所有 
      deleteLeft                             f1         删除 
      ★异于Atom 
      ★暂时设置
      workbench.action.showCommands          ctrl+f1    显示所有命令
      ★默认 
      f5                                                调试 
      ctrl-``                                           切换集成终端   
  用户代码片段: 'C:/Users/f/AppData/Roaming/Code/User/snippets/xxx.xx' 
  自定义样式: '安装目录/resources/app/out/vs/workbench/workbench.main.css' 
    PS: 该方式非正常渠道,编辑器会显示'文件被破环,是否重新安装' 
    /*自定义样式*/
    .mtki {  
      /*注释*/
      color: #1ca3a3 !important;
    }
  插件 
    ★外观
    vscode-icons  文件图标主题
    One Dark Theme  Atom的oneDark主题
    ★功能
    open in browser 在浏览器中打开文件 
      快捷键 alt-b
    Path Intellisense  路径提示 
    VS Color Picker  颜色选取 
      自定义快捷键 ctrl+alt+c 
    ★HTML
    Auto Rename Tag  同时修改HTML标签
    HTML Snippets HTML语言代码提示 
    ★JS
    JavaScript Snippet Pack  ES5及以下的代码提示
    JavaScript (ES6) code snippets  ES6代码提示 
    jQuery Code Snippets jQuery代码提示 
  Suggestion&Question 
    如何在折叠后的文字后新增新的文字
    折叠功能
      折叠后将后面所用的空行也折叠进去了,无法在折叠状态下,再在接着的后一行添加内容
WebStorm 
  设置 
  快捷键 
    Settings                      Atom           设置     
    Collapse all                  Atom           折叠所有   
    Expand all                    Atom           展开所有折叠  
    Duplicate line or Selection   Atom           复制行 
    Delete line                   Atom           删除行 
    Comment with line comment     Atom           行注释  
    Move line up                  Atom           上移行  
    Move line down                Atom           下移行  
    start new line                atom           在上一行插入 
    start new line before current atom           在下一行插入 
    join lines                    atom           合并行 
  插件 
  总结 
  Suggestion&Question:
Notepad++ 
  设置
  快捷键 [参照Atom快捷键设置] 
    设置-管理快捷键 进行修改
    快键键文件为 C:\Users\Fan\AppData\Roaming\Notepad++\shortcuts.xml
      <NotepadPlus>
          <InternalCommands>  <!-- 软件默认快捷键 对应 main menu --> 
              <Shortcut id="43034" Ctrl="no" Alt="no" Shift="no" Key="0" />
          </InternalCommands>
          <Macros>   <!-- 录制宏 对应 macros --> 
              <Macro name="copy-line" Ctrl="no" Alt="yes" Shift="no" Key="86">
                  <Action type="0" message="2469" wParam="0" lParam="0" sParam="" />
              </Macro>
          </Macros>
          <UserDefinedCommands> 
              <Command name="Send via Outlook" Ctrl="yes" Alt="yes" Shift="yes" Key="79">outlook /a &quot;$(FULL_CURRENT_PATH)&quot;</Command>
          </UserDefinedCommands>
          <PluginCommands />
          <ScintillaKeys>   <!-- 对应 scintilla commands -->
              <ScintKey ScintID="2469" menuCmdID="42010" Ctrl="no" Alt="yes" Shift="no" Key="86" />
          </ScintillaKeys>
      </NotepadPlus>
      注:其中 快捷键优先级依次为:InternalCommands > Macros > UserDefinedCommands >
        PluginCommands > ScintillaKeys
        故当InternalCommands和自定义的快捷键有冲突时,在InternalCommands中对应的删除.
    原始快捷键          修改为           功能
      ◆无修改
      ctrl-b                               括号间跳转
      alt-h                                隐藏行  
      alt-d                                打开的文件比较      
      alt-S                                跟上次保存的文件比较   
      alt-b                                跟SVN的文件比较    
      ctrl-u                               转为小写 
      ctrl-h                               查找/替换对话框
      ctrl-t                               当行向上移动一行
      ctrl-f2                              切换书签
      ctrl-f3                              选定并找下一个
      ctrl-delete                          删除结束词
      ctrl-backSpace                       删除开始词
      ctrl-PageuP                          上一个差异地方      
      ctrl-Pagedown                        下一个差异地方      
      ctrl-alt-S                           另存为
      ctrl-alt-d                           关闭文件比较       
      ctrl-shift-f                         在文件中搜索 
      ctrl-shift-u                         转为大写  
      ctrl-shift-f3                        查找（volatil）上一页
      ctrl-shift-i                         组合增量搜索
      ctrl-shift-s                         保存所有文件
      ctrl-shift-leftMouse                 选取多行
      ctrl-shift-Pageup                    第一个差异地方      
      ctrl-shift-Pagedown                  最后一个差异地方     
      ctrl-shift-delete                    删除至行尾
      ctrl-shift-backSpace                 删除至行
      shift-f3                             查找上一个 
      shift-f2                             上一书签
      ◆同Atom相同
      f2                                   下一书签 
      f3                                   查找下一个 
      ctrl-leftmouse                       多光标操作
      ctrl-g                               行定位 
      shift-tab                            删除缩进
      ◆参照Atom修改
      ctrl-shift-up      ctrl-up           上移行
      ctrl-shift-down    ctrl-down         下移行
      ctrl-l             alt-d             剪切行 [约等于删除行]
      ctrl-j             alt-z             合并行 [不同于Atom,需要选取多行才能操作]
      ctrl-b             alt-f             转到匹配的括号
      alt-0              alt-1             折叠所有层次  
      alt-shift-0        alt-2             展开所有层次  
      ctrl-alt-f         alt-3             折叠当前层次
      ctrl-alt-shift-f   alt-4             展开当前层次
      unknow             ctrl-q            设置单行注释
      ctrl-alt-b         alt-q             选中括号内的字符 [需要在括号边缘可用]
      alt-shift-up/down  ctrl-alt-up/down  光标多选
      alt-b              alt-u             转换大写
      alt-b              alt-i             转换小写
      ctrl-f2            alt-x             设置/取消书签 [alt-x 默认为关闭当前标签]
      ctrl-f3            ctrl-d            选取并寻找下一个
      dimness            ctrl-e            快速寻找上一个
      ◆录制宏 
      ctrl-d             alt-v             复制当前行  
      backspace          f1                删除   [原f1为查看Notepad++详情]
      未知               alt-s              缩进
      未知               alt-a              取消缩进
      未知               alt-c              选中行
      ◆其他更改
      alt-c              alt-r             列编辑     [和Atom定义冲突]
      ctrl-alt-space     alt-e             路径补全
      dimness            ctrl-shift-q      取消注释
      unknow             ctrl-/            区块注释 
      unknow             alt-/             清除区块注释 
      unknow             ctrl-,            设置-首选项 
      unknow             ctrl-.            管理快捷键 
      ◆未知
      选中当前行
  插件 
    autosave
  Suggestion&Question 
    如何设置将所有文件默认作为Python格式  [Notepad++ python格式文件可以折叠]
      设置-语言格式设置-选择python 
      在自定义扩展名中填入需要的格式后缀 如 txt rec
    取消代码折叠后的下划线
    自定义扩展词 [snippet?]
SublimeText3 
  ◆设置 
    缩进宽度         查看   缩进 标签宽度:2
    自动换行         查看   自动换行
    分屏             查看   窗口布局
    失焦自动保存     首选项 设置-用户  "save_on_focus_lost": true,
    字体设置                           "font_face": "consolas", (或楷体)
    一直显示折叠图标                    "fade_fold_buttons": false,
  ◆快捷键 [参照Atom快捷键设置] 
    首选项 按键绑定-用户 中设置
    默认快捷键
      ctrl+x         未选中文字的情况下,剪切光标所在行
      ctrl+shift+m   选择括号内的内容
      // ctrl+shift+`   选择文本的包裹标签   [需要Emmet插件]
      ctrl+shift+a   类似于ctrl+d,向上一层扩展选中 [需要Emmet插件]
      ctrl+shift+d   复制行或选中项,若已选中文本则复制,否则复制光标所在行
      ctrl+shift+v   粘贴并复制格式
      alt+shift+w    选中项外包裹的标签
      ctrl+shift+;   删除包裹的标签
      ctrl+J         选择标签内容
      ctrl+f         查找内容
      ctrl+shift+f   查找并替换
      ctrl+h         替换
      ctrl+r         前往 method
      ctrl+k+b       开关侧栏
      ctrl+m 光标移动至括号内结束或开始的位置。
      ctrl+shift+m   选中当前括号内容,重复可选着括号本身
      ctrl+f2 设置/删除标记
      ctrl+shift+/ 当前位置插入注释
      ctrl+alt+/:块注释,并focus到首行,写注释说明用的
      ctrl+shift+A:选择当前标签前后,修改标签用的
      alt+.:闭合标签
      alt+shift+数字:分屏显示
      alt+数字:切换打开第N个文件
      shift+右键拖动:光标多不,用来更改或插入列内容
      按ctrl,依次点击或选取,可需要编辑的多个位置
      按ctrl+shift+上下键,可替换行
      ctrl+shift+l 先选中多行,再按下快捷键,会在每行行尾插入光标
        即可同时编辑这些行。
      ctrl+← 向左单位性地移动光标
      ctrl+→ 向右单位性地移动光标
      shift+方向键  选中内容
      ctrl+shift+左右键  向单位性地选中文本。
      ctrl+shift+上下键  将光标所在行和上/下一行代码互换（
        将光标所在行插入到上一行之前
      ctrl+alt+上下键    向上/下添加多行光标,可同时编辑多行。
      ctrl+shift+d 复制光标所在整行,插入到下一行。
      ctrl+k+k 从光标处开始删除代码至行尾。
      ctrl+shift+k 删除整行。
      ctrl+k+u 转换大写。
      ctrl+k+l 转换小写。
      ctrl+t 左右字母互换。
      f6 单词检测拼写
      ctrl+P 打开搜索框。
        举个栗子:1、输入当前项目中的文件名,快速搜索文件,
        2、输入@和关键字,查找文件中函数名,
        3、输入:和数字,跳转到文件中该行代码,
        4、输入#和关键字,查找变量名。
      ctrl+g 打开搜索框,自动带:,输入数字跳转到该行代码。
        举个栗子:在页面代码比较长的文件中快速定位。
      ctrl+r 打开搜索框,自动带@,输入关键字,查找文件中的函数名。
        举个栗子:在函数较多的页面快速查找某个函数。
      ctrl+: 打开搜索框,自动带#,输入关键字,查找文件中的变量名、属性名等。
      ctrl+shift+P 打开命令框。
        场景栗子:打开命名框,输入关键字,调用sublime text或插件的功能,
        例如使用package安装插件。
  ◆插件 
    convertutf8 在保存后会自动重载 
      使用convertutf8之后,保存大文件时会乱码或卡顿
      当时对St还有点热情,所以去把convertutf8的代码改了,禁止保存后重载就行了。
    bufferScroll-st 
      保存折叠状态的插件
    Alignment:代码对齐插件,快捷键:Ctrl+Alt+A
    ConvertToUTF8:支持GBK查看与编辑插件
    Emmet:HTML/CSS代码快速编写插件
    JsFormat:JS格式化插件,快捷键:Ctrl+Alt+F
    KeymapManager:快捷键管理插件,快捷键:Ctrl+Alt+K
    Package Control:插件安装
    SideBarEnhancements:侧边栏插件
    Theme - Nil:SideBarEnhancements皮肤
  ◆Suggestion&Question 
    折叠功能
      文本状态下,全部折叠可能不会全部折叠起来
      全部折叠不会将所有可折叠的都折叠起来
      一行缩进的格式不会折叠如以下格式:
        1 
          2
    不可分别设置 中、英文字体
  ◆其他 
    注册密钥:
      LiuFengQingYin
      Unlimited User License
      EA7E-19762
      9916F04082CF9BE66CF22672F5E5003D
      473E7A66546048B6A68EE51BA52A13E2
      3DDE5CE64F1E3E389EEA012D40AE0B8D
      60FA83CD784771F5D0512FB346D10945
      D6338C5EA7A4D98B000E04C5FC0D9B0D
      53BD0E0957882DC55B87E77C4131B14F
      BD045138673EA9B3F3A28D84A8F9C3AE
      0312B06CB39656D268F6F81C9586DFDF
Hbuilder 
  设置
--------------------------------------------------------------------------------
键盘的键值码 
  ◆字母和数字键的键码值
    A 65
    B 66
    C 67
    D 68
    E 69
    F 70
    G 71
    H 72
    I 73
    J 74
    K 75
    L 76
    M 77
    N 78
    O 79
    P 80
    Q 81
    R 82
    S 83
    T 84
    U 85
    V 86
    W 87
    X 88
    Y 89
    Z 90
    0 48
    1 49
    2 50
    3 51
    4 52
    5 53
    6 54
    7 55
    8 56
    9 57
  ◆数字键盘上的键的键码值
    0 96 
    1 97 
    2 98 
    3 99 
    4 100 
    5 101 
    6 102 
    7 103 
    8 104 
    9 105 
    * 106 
    + 107 
    Enter 
    - 109 
    . 110        
    / 111        
  ◆功能键键码值(keyCode)
    F1 112 
    F2 113 
    F3 114 
    F4 115 
    108 F5 
    F6 117 
    F7 118
    F8 119
    F9 120
    F10 121
    116 F11 122
    F12 123 
  ◆控制键键码值(keyCode)
    BackSpace   8   
    Tab         9   
    Clear       12 
    Enter       13 
    Shift       16 
    Control     17 
    Alt         18 
    Cape Lock   20 
    Esc         27 
    Spacebar   32 
    Page Up     33 
    Page Down   34 
    End         35 
    Home       36 
    Left Arrow  37 
    Up A        38
    Right Arrow 39 
    Down Arrow 40 
    Insert     45 
    Delete     46 
    Num Lock   144 
    ;:         186 
    =+         187 
    -_         189
    .>         190
    /?         191
    // `~         192
    [{         219
    /|         220
    ]}         221
Question&Idea 
----------------------------------------------------------------------以下待整理











