import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

/** 获取列表 */
export const getVersionList = (data?: object) => {
  return http.request<Result>("get", "/version", { data });
};

// 创建
export const postVersion = (data?: object) => {
  return http.request("post", "/version", { data });
};

// 修改
export const patchVersion = (id: number, data?: object) => {
  return http.request("put", `/version/${id}`, { data });
};

// 删除
export const deleteVersion = (id: number) => {
  return http.request("delete", `/version/${id}`);
};

// 查详情
export const queryVersion = (id: number) => {
  return http.request("get", `/version/${id}`);
};
