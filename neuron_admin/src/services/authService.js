import { api, post } from "./api";

export const login = (identifier, password) => post("/api/auth/login", { identifier, password });
export const fetchMe = () => api("/api/auth/me");
export const requestPasswordReset = () => post("/api/auth/forgot-password");
export const requestUsernameReminder = () => post("/api/auth/forgot-username");
export const verifyResetToken = (token) => post("/api/auth/reset/verify", { token });
export const completeReset = (payload) => post("/api/auth/reset", payload);
