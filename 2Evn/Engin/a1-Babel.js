Babel转码器将ES6转换为ES5 
配置文件'.babelrc' : 位于项目的根目录 
  文件配置  用来设置转码规则和插件
    {
      "presets": [  // 设定转码规则 
        "latest",
        "react",
        "stage-2"
      ],
      "plugins": []
    }
    官方提供了以下的规则集,可以根据需要安装 
      # 最新转码规则
      $ npm install --save-dev babel-preset-latest
      # react 转码规则
      $ npm install --save-dev babel-preset-react
      # 不同阶段语法提案的转码规则[共有4个阶段],选装一个
      $ npm install --save-dev babel-preset-stage-0
      $ npm install --save-dev babel-preset-stage-1
      $ npm install --save-dev babel-preset-stage-2
      $ npm install --save-dev babel-preset-stage-3
'babel-cli'命令行编译 
  npm install --global babel-cli   #安装
  基本用法 
    babel example.js  # 转码结果输出到标准输出
    babel example.js --out-file compiled.js  # 转码结果写入一个文件
      # 或者
      babel example.js -o compiled.js
      # --out-file 或 -o 参数指定输出文件
    babel src --out-dir lib     # 整个目录转码
      # 或者
      babel src -d lib
      # --out-dir 或 -d 参数指定输出目录
    babel src -d lib -s   # -s 参数生成source map文件
'babel-cli'项目中安装 
  PS:全局环境下,进行 Babel 转码意味着,若项目要运行,全局环境必须有 Babel,
    也就是说项目产生了对环境的依赖。
    另一方面,这样做也无法支持不同项目使用不同版本的 Babel。
  npm install --save-dev babel-cli   #安装
  配置'package.json' 
    {
      // ...
      "devDependencies": {
        "babel-cli": "^6.0.0"
      },
      "scripts": {
        "build": "babel src -d lib"
      },
    }
  npm run build         #执行命令转码 
--------------------------------------------------------------------------------









