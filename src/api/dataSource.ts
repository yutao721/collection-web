import { http } from "@/utils/http";


/** 获取列表 */
export const getList = (data?: object) => {
  return http.request("get", "/find", { data }, {
    baseURL: 'http://10.225.20.14:5555',
  });
};

// 创建
export const add = (data?: object) => {
  return http.request("post", "/add", { data }, {
    baseURL: 'http://10.225.20.14:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};

// 修改
export const edit = (data?: object) => {
  return http.request("post", "/edit", { data }, {
    baseURL: 'http://10.225.20.14:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};

// 删除
export const del = (data?: object) => {
  return http.request("post", "/dell", { data }, {
    baseURL: 'http://10.225.20.14:5555',
    headers: { 'content-type': 'multipart/form-data' }
  });
};


