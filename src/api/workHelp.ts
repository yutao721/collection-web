import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

/** 创建项目 */
export const CreataProject = (data?: object) => {
  return http.request("post", "/CreataProject", { data }, {
    baseURL: 'http://10.225.21.61:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};

// 创建电子票
export const TicketProjectCreate = (data?: object) => {
  return http.request("post", "/TicketProjectCreate", { data }, {
    baseURL: 'http://10.225.21.61:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};

// 创建团购
export const GroupBuycreate = (data?: object) => {
  return http.request("post", "/GroupBuycreate", { data }, {
    baseURL: 'http://10.225.21.61:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};


// 创建新物赏
export const LotteryCreat = (data?: object) => {
  return http.request("post", "/LotteryCreat", { data }, {
    baseURL: 'http://10.225.21.61:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};


// 删除用户
export const deleteUser = (data?: object) => {
  return http.request("post", "/deleteUser", { data }, {
    baseURL: 'http://10.225.21.61:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};


// 生成压测数据
export const Testdata = (data?: object) => {
  return http.request("get", "/Testdata", { data }, {
    baseURL: 'http://10.225.21.61:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};

// 拉新活动
export const inviteActive = (data?: object) => {
  return http.request("post", "/inviteActive", { data }, {
    baseURL: 'http://10.225.21.61:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};

// 拉新活动
export const createPicture = (data?: object) => {
  return http.request("post", "/createPicture", { data }, {
    baseURL: 'http://10.225.21.61:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};