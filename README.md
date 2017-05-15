#usage
#### (一) 不安装环境如node.js情况下<br/>
    在本地server里运行index.html 直接查看效果，翻阅源码，添加后台交互，具体在assets/js/components/文件下
    
#### (二) 安装环境如node.js,进行二次开发
    1. 安装node.js,如果已经安装跳过这个步骤
    2. 通过命令行cmd下进入根目录下运行 npm install，安装程序所需的依赖
    3. 运行webpack -p [编译，压缩react组件]
    4. 运行npm start [启动webpack-dev-server]
    5. 运行webpack --watch[监听文件变化，自动刷新]
    
    以上步骤如果有错误，可能是webpack没有安装在全局环境中，通过分别执行npm i webpack -g <br/>
    npm i webpack-dev-server -g
