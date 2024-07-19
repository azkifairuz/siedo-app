import type { BaseResponse } from "@/type/BaseResponse";
import type { Pagination } from "@/type/Pagination";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { defineStore } from "pinia";
import type { Activity } from "@/type/Activity";

export const useActivity = defineStore("activity", {
  state: () => ({
    pagination: {} as Pagination,
    activity: [] as Activity[],
    error: false,
    message: "",
    isLoading: false,
  }),
  actions: {
    async getActivity(page: string, filter: string) {
        this.isLoading = true
        try {
            const token = getToken();
            const response = await axios.get<BaseResponse<Activity[]>>(
              `${import.meta.env.VITE_BASE_API}/dosen/presensi/activity/${filter}`,
              {
                headers: {
                  Authorization: token,
                },
                params: {
                  page: page,
                },
              }
            );
            const data = response.data;
            if (data.data) {
              if (data.paginationData) {
                this.pagination = data.paginationData;
              }
              this.activity = data.data;
              this.message = data.message;
              this.error = false;
            } else {
              this.error = true;
              this.message = data.message;
            }
        } catch (error) {
            this.error = true;
            this.message = `error ${error}`
        }finally{
            this.isLoading = false
        }
    },
  },
});
