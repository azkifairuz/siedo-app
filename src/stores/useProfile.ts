import type { BaseResponse } from "@/type/BaseResponse";
import type { Profile } from "@/type/Profile";
import axios from "axios";
import { defineStore } from "pinia";

export const useUser = defineStore("profile", {
  state: () => ({
    profile: {},
    error: false,
    massage: "",
    isLoading: false,
  }),

  actions: {
    async getProfile(token: string) {
      this.isLoading = true;
      try {
        const response = await axios.get<BaseResponse<Profile>>(
          `${import.meta.env.VITE_BASE_API}/dosen/profile`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.data) {
          this.profile = response.data.data;
          this.massage = response.data.message;
        } else {
          this.massage = response.data.message;
          this.error = true;
        }
      } catch (error) {
        this.massage = `error: ${error}`;
        this.error = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
