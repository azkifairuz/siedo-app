import type { BaseResponse } from "@/type/BaseResponse";
import type { Pagination } from "@/type/Pagination";
import type { Pkm, PkmRequest } from "@/type/Pkm";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { defineStore } from "pinia";

export const usePkm = defineStore("pkm", {
  state: () => ({
    pagination: {} as Pagination,
    pkm: [] as Pkm[],
    error: false,
    message: "",
    isLoading: false,
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
    async createPkm(request: PkmRequest, file: File) {
      this.isLoading = true;
      try {
        const token = getToken();
        const formData = new FormData();
        formData.append("judul", request.judul);
        formData.append("tahunPelaksanaan", request.tahunPelaksanaan);
        formData.append("lamaKegiatan", request.lamaKegiatan);
        formData.append("lokasiKegiatan", request.lokasiKegiatan);
        formData.append("nomorSkPengesahan", request.nomorSkPengesahan);
        formData.append("document", file);
        const response = await axios.post<BaseResponse<string>>(
          `${import.meta.env.VITE_BASE_API}/dosen/pkm`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.statusCode != 200) {
          this.message = response.data.message;
          this.error = true;
        }
        this.error = false;
        this.message = response.data.message;
      } catch (error) {
        this.error = true;
        this.message = `${error}`;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
