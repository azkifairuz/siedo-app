import type { BaseResponse } from "@/type/BaseResponse";
import type { Pagination } from "@/type/Pagination";
import type { Pkm } from "@/type/Pkm";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { defineStore } from "pinia";

export const usePkm = defineStore("pkm",{
    state: () => ({
        pagination: {} as Pagination,
        pkm: [] as Pkm[] ,
        error: false,
        message: "",
    }),

    actions: {
        async getAllPkm() {
          const token = getToken();
          const response = await axios.get<BaseResponse<Pkm[]>>(
            `${import.meta.env.VITE_BASE_API}/dosen/pkm`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = response.data;
          if (data.data) {
            if (data.paginationData) {
                this.pagination = data.paginationData;
                
            }
            this.pkm = data.data;
            this.message = data.message;
            this.error = false;
          } else {
            this.error = true;
            this.message = data.message;
          }
        },
      },
})