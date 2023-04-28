const Layout = () => import("@/layout/index.vue");

export default {
  path: "/workHelp",
  name: "Host",
  component: Layout,
  redirect: "/workHelp/index",
  meta: {
    icon: "Monitor",
    title: "走查助手",
    rank: 10
  },
  children: [
    {
      path: "/workHelp/index",
      name: "WorkHelpIndex",
      component: () => import("@/views/workHelp/index.vue"),
      meta: {
        title: "走查助手"
      }
    }
  ]
} as RouteConfigsTable;