import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

/** 卡片列表 */
export const getCardList = (data?: object) => {
  return http.request<Result>("get", "/collection", { data });
};
