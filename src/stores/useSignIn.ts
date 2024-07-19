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

  actions: {
    async signIn(username: string, password: string) {
      const response = await axios.post<AuthResponse>(
        "http://localhost:3000/dosen/auth",
        {
          nidn: username,
          password: password,
        }
      );

      if (response.data.data) {
        this.isAuthenticated = true;
        this.user = response.data.data.uuid;
        this.token = response.data.data.token;
        this.message = response.data.message

      }else{
        this.message = response.data.message
      }
    },
  },
});
