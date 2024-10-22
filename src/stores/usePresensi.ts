import type { BaseResponsePresensi } from "@/type/BaseResponsePresensi";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { defineStore } from "pinia";

export const usePresensi = defineStore("presensi", {
  state: () => ({
    message: "",
    error: false,
    isLoading: false,
    time: "",
  }),
  persist: true,

  actions: {
    async checkInOffline(inLocation: boolean) {
      this.isLoading = true;
      const token = getToken();

      try {
        const response = await axios.post<BaseResponsePresensi>(
          `${import.meta.env.VITE_BASE_API}/dosen/presensi/offline`,
          {
            inLocation,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        this.message = response.data.message;

        if (response.data.statusCode !== 200) {
          this.error = true;
        } else {
          this.error = false;
        }

        if (response.data.time) {
          const parseTime = response.data.time.split(".");
          this.time = `${parseTime[0]}.${parseTime[1]}`;
        }
      } catch (error) {
        this.error = true;
        this.message = `error: ${error}`;
      } finally {
        this.isLoading = false;
      }
    },

    async checkInOnline() {
      this.isLoading = true;
      const token = getToken();

      try {
        const response = await axios.post<BaseResponsePresensi>(
          `${import.meta.env.VITE_BASE_API}/dosen/presensi/online`,
          {}, // Empty request body
          {
            headers: {
              Authorization: token,
            },
          }
        );
        this.message = response.data.message;
        this.error = false;
        if (response.data.statusCode !== 200) {
          this.error = true;
        } else {
          this.error = false;
        }
        if (response.data.time) {
          const parseTime = response.data.time.split(".");
          this.time = `${parseTime[0]}.${parseTime[1]}`;
        }
      } catch (error) {
        this.error = true;
        this.message = `error: ${error}`;
      } finally {
        this.isLoading = false;
      }
    },

    async checkout() {
      this.isLoading = true;
      const token = getToken();
      try {
        const response = await axios.post<BaseResponsePresensi>(
          `${import.meta.env.VITE_BASE_API}/dosen/presensi/checkout`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        this.message = response.data.message;
        this.error = false;
        if (response.data.statusCode !== 200) {
          this.error = true;
        } else {
          this.error = false;
        }
        if (response.data.time) {
          this.time = "";
        }
      } catch (error) {
        this.error = true;
        this.message = `error: ${error}`;
      } finally {
        this.isLoading = false;
      }
    },

    async izin(reason: string, file: File) {
      this.isLoading = true;
      const token = getToken();
      const formData = new FormData();
      formData.append("reason", reason);
      formData.append("document", file);
      try {
        const response = await axios.post<BaseResponsePresensi>(
          `${import.meta.env.VITE_BASE_API}/dosen/presensi/izin`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.message = response.data.message;
        this.error = false;
        if (response.data.statusCode !== 200) {
          this.error = true;

        } else {
          this.error = false;
        }
        if (response.data.time) {
          this.time = "hari anda izin";
        }
      } catch (error) {
        this.error = true;
        this.message = `error: ${error}`;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
