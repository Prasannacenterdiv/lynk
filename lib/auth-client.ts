import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "https://lynk-pink.vercel.app"
})