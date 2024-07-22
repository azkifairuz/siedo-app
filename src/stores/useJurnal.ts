import type { BaseResponse } from "@/type/BaseResponse";
import type { Jurnal } from "@/type/Jurnal";
import type { JurnalRequest } from "@/type/Jurnal";
import type { Pagination } from "@/type/Pagination";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { defineStore } from "pinia";

export const useJurnal = defineStore("jurnal", {
  state: () => ({
    pagination: {} as Pagination,
    jurnal: [] as Jurnal[],
    error: false,
    message: "",
    isLoading: false,
  }),

  actions: {
    async getAllJurnal() {
      const token = getToken();
      const response = await axios.get<BaseResponse<Jurnal[]>>(
        `${import.meta.env.VITE_BASE_API}/dosen/jurnal`,
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
        this.jurnal = data.data;
        this.message = data.message;
        this.error = false;
      } else {
        this.error = true;
        this.message = data.message;
      }
    },
    async createJurnal(request: JurnalRequest, file: File) {
      const token = getToken();
      const formData = new FormData();
      formData.append("judulArtikel", request.judulArtikel);
      formData.append("namaJurnal", request.namaJurnal);
      formData.append("tautanLamanJurnal", request.tautanLamanJurnal);
      formData.append("tanggalTerbit", request.tanggalTerbit);
      formData.append("volume", request.volume);
      formData.append("nomor", request.nomor);
      formData.append("halaman", request.halaman);
      formData.append("penerbitPenyelanggara", "-");
      formData.append("issn", request.issn);
      formData.append("document", file);
      const response = await axios.post<BaseResponse<string>>(
        `${import.meta.env.VITE_BASE_API}/dosen/jurnal`,
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
    },
  },
});
