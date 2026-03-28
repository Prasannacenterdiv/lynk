import { auth } from "./auth"
import { headers } from "next/headers";

export const checkAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session) {
        return true;
    }
    else {
        return false;
    }
}