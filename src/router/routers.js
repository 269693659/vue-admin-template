import routersList from './routers-list'
import commonRouters from './routers-common'
/**
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标
 * }
 *  hidden: (false) 设为true后在左侧菜单不会显示该页面选项
 */
export default [
  ...commonRouters,
  ...routersList,
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

