import type { BaseResponsePresensi } from "@/type/BaseResponsePresensi";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { defineStore } from "pinia";

export const usePresensi = defineStore("presensi", {
  state: () => ({
    isActive: false,
    message: "",
    error: false,
    isLoading: false,
    time: ""
  }),

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
          this.isActive = true;
          this.message = response.data.message;
          if (response.data.statusCode !== 200) {
            this.error = true
          }
          if (response.data.time) {
            const parseTime = response.data.time.split('.')
            this.time = `${parseTime[0]}.${parseTime[1]}`
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
        if (response.data.statusCode) {
          this.isActive = true;
          this.message = response.data.message;
          this.error = false;
        } else {
          this.error = true;
          this.message = response.data.message;
        }
      } catch (error) {
        this.error = true;
        this.message = `error: ${error}`;
      } finally {
        this.isLoading = false;
      }
    },

    async checout() {
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
        if (response.data.statusCode) {
          this.isActive = false;
          this.message = response.data.message;
          this.error = false;
        } else {
          this.error = true;
          this.message = response.data.message;
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
