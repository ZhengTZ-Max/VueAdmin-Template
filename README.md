# imitation-ele

## 项目启动

1. 安装依赖 - yarn install
2. 启动服务 - yarn run serve
3. 项目打包 - yarn build
4. 非开发人员 需要安装 Node.js、Yarn

   [在您的计算机上安装 Node.js](https://nodejs.org/zh-cn/)
   <br/>
   [在您的计算机上安装 Yarn](https://yarn.bootcss.com/)

## 项目菜单添加示例

**[菜单管理地址](http://hxerp.appudid.cn/HRmanage/Menumanagement)**

> 路由：plan/test/index
>
> > 当前文件在项目的存放位置,只需写入 views 目录下的文件地址
>
> 文件名：index
>
> > 可以是当前文件的名字,也可以为空
>
> 地址：/plan/test/index
>
> > 当前页面的路由地址,尽量与项目的存放位置一致。注：需在开头添加 /

## Router 路由配置参数

```
    {
        title: '', // 路由名称
        path: '', // 路由地址
        /*
            路由组件地址
            用法：从views文件下写入路径,因是动态引入无需从views文件写入
            例：component:'system/menu-list'
        */
        component: '',
        icon: '', // 菜单图标
        redirect: '', // 路由重定向
        /*
            是否显示一级菜单
            (未配置 && showMenu = false) 菜单下只有一个路由时，默认不展示菜单。
            如showMenu为true,则反之
        */
        showMenu:'',
        noCache: '', // 路由缓存
        hidden: '', // 菜单是否显示
        jump: '', // 是否跳转外部链接
        children: '', // 子路由
    };
```

## Methods 接口请求

```
// 使用async await进行接口同步请求
async getList(){
    try {
        let params = {};
        const res = await fetchList(params);
        // 返回状态码处理
        if(res.code != 0){
            Msg.error(res.msg)
            return false;
        }
        console.log(res);
    } catch (e) {
        // 接口报错处理
        console.log(e);
    }
}
```
