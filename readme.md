GrowingIo 组件分为两类，一类为基础组件，一类为业务组件
本项目基于Ant Design封装复合公司自己风格的基础组件，来为业务组件提供服务

需要解决的问题
* 版本发布的问题，和主项目的协同问题
* 拆分力度的问题

目前目录结构
/src
  /components 用于存放所有的component
    /button
      /style
        button2.less  
        button1.less
        index.less
      index.js 加载less，整合component
      /demo    
      /data.js 可以存放假数据
      button1.js
      button2.js
      index.md // 文档
  /library    用户存放所有的库函数, 每个函数一个文件，需要写清楚参数，功能描述，和文档，以及作者名称，修改人名称和日期
    fn1.js
    fn2.js
    fn3.js
  /style      用户存放所有主题相关的css
    /core     公共样式，全局样式等
    /mixins   定义一些可复用的函数
    /themes   存放一些与主题有关的变量， 关于theme的制作，可以参考bootstrap
    /index.less


命名规范
_g- 开头的为全局css
_c- 开头的为component
gr_f- 开头的feature container

-l 结尾的为list


container 负责数据的获取，分发，于服务器进行 通信
