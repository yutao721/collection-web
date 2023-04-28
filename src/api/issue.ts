import { http } from "@/utils/http";

export interface queryIssue {
  id: number;
  content?: string;
  status?: number;
  questionType?: number;
  platformType?: number;
  type?: number;
  overTime: number;
  createTime: number;
  updatedAt: number;
}

type Result = {
  success: boolean;
  data?: Array<queryIssue>;
};

/** 获取列表 */
export const getIssueList = (data?: object) => {
  return http.request<Result>("get", "/issue", { data });
};

// 创建
export const postIssue = (data?: object) => {
  return http.request("post", "/issue", { data });
};

// 修改
export const patchIssue = (id: number, data?: object) => {
  return http.request("put", `/issue/${id}`, { data });
};

// 删除
export const deleteIssue = (id: number) => {
  return http.request("delete", `/issue/${id}`);
};

// 查详情
export const queryIssue = (id: number) => {
  return http.request("get", `/issue/${id}`);
};
