GrowingIo 组件分为两类，一类为基础组件，一类为业务组件
本项目基于Ant Design封装复合公司自己风格的基础组件，来为业务组件提供服务

目前目录结构
/src
  /components 用于存放所有的component
    /button
      /style
        button2.less
        button1.less
        index.less
      index.jsx
  /library    用户存放所有的库函数, 每个函数一个文件，需要写清楚参数，功能描述，和文档，以及作者名称，修改人名称和日期
  /style      用户存放所有主题相关的css
    /core
    /mixins
    /themes
    /index.less
