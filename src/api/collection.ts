import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

/** 获取列表 */
export const getCollectionList = (data?: object) => {
  return http.request<Result>("get", "/collection", { params: data });
};

// 创建
export const postCollection = (data?: object) => {
  return http.request("post", "/collection", { data });
};

// 修改
export const patchCollection = (id: number, data?: object) => {
  return http.request("put", `/collection/${id}`, { data });
};

// 删除
export const deleteCollection = (id: number) => {
  return http.request("delete", `/collection/${id}`);
};

// 查详情
export const queryCollection = (id: number) => {
  return http.request("get", `/collection/${id}`);
};
