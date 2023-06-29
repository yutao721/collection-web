const Layout = () => import("@/layout/index.vue");

export default {
  path: "/workHelp",
  name: "Host",
  component: Layout,
  redirect: "/workHelp/index",
  meta: {
    icon: "lollipop",
    title: "测试助手",
    rank: 10
  },
  children: [
    {
      path: "/workHelp/index",
      name: "WorkHelpIndex",
      component: () => import("@/views/workHelp/index.vue"),
      meta: {
        title: "测试助手"
      }
    }
  ]
} as RouteConfigsTable;
