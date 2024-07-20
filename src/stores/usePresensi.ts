import type { BaseResponse } from "@/type/BaseResponse";
import axios from "axios";
import { defineStore } from "pinia";

export const usePresensi = defineStore("presensi", {
  state: () => ({
    isActive: false,
    message: "",
    error: false,
    isLoading: false,
  }),

  actions: {
    async checkInOffline(token: string, inLocation: boolean) {
      this.isLoading = true;
      try {
        const response = await axios.post<BaseResponse<string>>(
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
      }finally{
        this.isLoading = true
      }
    },

    async checkInOnline(token: string) {
        this.isLoading = true;
        try {
          const response = await axios.post<BaseResponse<string>>(
            `${import.meta.env.VITE_BASE_API}/dosen/presensi/online`,
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
        }finally{
          this.isLoading = true
        }
      },
      async checout(token: string) {
        this.isLoading = true;
        try {
          const response = await axios.post<BaseResponse<string>>(
            `${import.meta.env.VITE_BASE_API}/dosen/presensi/chekout`,
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
        }finally{
          this.isLoading = true
        }
      },
  },
});
