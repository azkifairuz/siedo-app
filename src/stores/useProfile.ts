import type { BaseResponse } from "@/type/BaseResponse";
import type { Profile } from "@/type/Profile";
import type { ProfileRequest } from "@/type/ProfileRequest";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { defineStore } from "pinia";

export const useUser = defineStore("profile", {
  state: () => ({
    profile: {} as Profile,
    error: false,
    massage: "",
    isLoading: false,
    isAlreadyPresensi: false,
  }),
  actions: {
    async getProfile() {
      this.isLoading = true;
      const token = getToken();

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
          this.isAlreadyPresensi = response.data.data.isAlreadyPresensi;
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
    async updateProfile(request: ProfileRequest) {
      try {
        const token = getToken();
        const response = await axios.post<BaseResponse<string>>(
          `${import.meta.env.VITE_BASE_API}/dosen/profile`,
          request,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data.statusCode);
        
        if (response.data.statusCode != 200) {
          this.massage = response.data.message;
          this.error = true
        }
        this.error = false
        this.massage = response.data.message;
      } catch (error) {
        this.error = false;
      } finally {
        this.isLoading = false;
      }
    },
  },
  persist: {
    key: 'profile',
    storage: localStorage,
    paths: ['profile', 'isAlreadyPresensi']
  },
});
