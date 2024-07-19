import type { BaseResponse } from "@/type/BaseResponse";
import type { Jurnal } from "@/type/Jurnal";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { defineStore } from "pinia";

export const useJurnal = defineStore("jurnal", {
  state: () => ({
    pagination: {} || undefined,
    jurnal: {},
    error: false,
    message: "",
  }),
  actions: {
    async getAllJurnal() {
      const token = getToken();
      const response = await axios.get<BaseResponse<Jurnal>>(
        `${import.meta.env.VITE_BASE_API}/dosen/jurnal`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      if (data.data) {
        this.pagination = data.paginationData;
        this.jurnal = data.data;
        this.message = data.message;
        this.error = false;
      } else {
        this.error = true;
        this.message = data.message;
      }
    },
  },
});
