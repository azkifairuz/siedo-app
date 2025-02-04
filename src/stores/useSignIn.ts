import type { AuthResponse } from "@/type/AuthResponse";
import axios from "axios";
import { defineStore } from "pinia";

export const useSignIn = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: "",
    token: "",
    message: "",
  }),
  persist:true,

  actions: {
    async signIn(username: string, password: string) {
      this.isAuthenticated = false;

      const response = await axios.post<AuthResponse>(
        `${import.meta.env.VITE_BASE_API}/dosen/auth`,
        {
          nidn: username,
          password: password,
        }
      );

      if (response.data.data) {
        this.isAuthenticated = true;
        this.user = response.data.data.uuid;
        this.token = response.data.data.token;
        this.message = response.data.message;
      } else {
        this.message = response.data.message;
      }
    },
  },
});
