const Layout = () => import("@/layout/index.vue");

export default {
  path: "/dataSource",
  name: "DataSource",
  component: Layout,
  redirect: "/dataSource/index",
  meta: {
    icon: "DataLine",
    title: "数据源",
    rank: 13
  },
  children: [
    {
      path: "/dataSource/index",
      name: "DataSourceIndex",
      component: () => import("@/views/dataSource/index.vue"),
      meta: {
        title: "数据源"
      }
    }
  ]
} as RouteConfigsTable;
